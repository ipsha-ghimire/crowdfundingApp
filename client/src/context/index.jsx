import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

  // const { contract } = useContract('0x6a01e32E41C91B0C44A2ba91bB7B27ee5851161d');


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x6a01e32E41C91B0C44A2ba91bB7B27ee5851161d');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image
      ])

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      closed:campaign.closed,
      pId: i
    }));

    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }



  const donate = async (pId, amount) => {
    

    const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});
    return data;
  
   
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }

  const getActiveCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    const currentTime = Date.now()/1000; // Get the current time in seconds
  
    const activeCampaigns = [];
  
    for (const campaign of allCampaigns) {
      const donations = await getDonations(campaign.pId);
      const hasDonated = donations.some((donation) => donation.donator === address);
  
      if (
        parseFloat(campaign.deadline)>currentTime &&
        parseFloat(campaign.amountCollected) < parseFloat(campaign.target) &&
        hasDonated
      ) {

        activeCampaigns.push(campaign);
        console.log("Campaign Deadline:", campaign.deadline);
        console.log("Current Time:", currentTime);
        console.log("Total Collected Amount:", campaign.amountCollected);
        console.log("Campaign Target:", campaign.target);
        console.log("Campaign Title:", campaign.title);
    
      }


    }
  
    return activeCampaigns;
  };
  
  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        getActiveCampaigns
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);