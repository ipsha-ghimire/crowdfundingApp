import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';
import {  daysLeft } from '../utils';

  // const { contract } = useContract('0x6a01e32E41C91B0C44A2ba91bB7B27ee5851161d');
  // const { contract } = useContract('0x4d3CF77f26d15e89857757e32a7A899eF3258d06');


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x3Bc80E1F52a67245C4987227A77Fe7297F06307B');
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
        
     (new Date(form.deadline).getTime()/1000), // deadline,
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

  const refund = async(pId) =>{
   

    const data = await contract.call("claimRefund", [pId])
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

  
    const activeCampaigns = [];
  
    for (const campaign of allCampaigns) {
      const donations = await getDonations(campaign.pId);
      const hasDonated = donations.some((donation) => donation.donator === address);
      const remainingDays = daysLeft(campaign.deadline);
  
      if (
        (remainingDays<0) &&
        parseFloat(campaign.amountCollected) < parseFloat(campaign.target) &&
        hasDonated
      ) {

        activeCampaigns.push(campaign);
      }


    }
  
    return activeCampaigns;

  };

  const getRefundStatus = async (pId) => {
    const data = await contract.call("getStatus", [pId])
    return data;
   
  }



  
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
        getActiveCampaigns,refund,getRefundStatus
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);