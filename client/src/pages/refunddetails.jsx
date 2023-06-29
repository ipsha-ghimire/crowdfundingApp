import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
const RefundDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address,refund } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  
  const [donators, setDonators] = useState([]);
  const [donatedAmount, setDonatedAmount] = useState('');



  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }
 

  // const fetchDonatedAmount = async () => {
  //   const donations = await getDonations(state.pId);
  //   console.log(donations); // array
  //   console.log(address);
  //   const filteredDonations = donations.filter((donation) => donation.donator === address);
  //   console.log(filteredDonations);

  //   const donatedAmount = filteredDonations.reduce((total, donation) => total +parseFloat(donation.donation), 0).toString();
  //   console.log(donatedAmount);
  //   // const donatedAmountInEther = ethers.utils.formatEther(donatedAmount);
  //   const donatedAmountInEther= donatedAmount;
  //  const finalethvalue= Number(donatedAmountInEther).toFixed(10);
  //  const trimmedValue = String(finalethvalue).replace(/\.?0+$/, '');
  //   // console.log("the donated amount in ether is ", donatedAmountInEther);
  //   setDonatedAmount(trimmedValue);
  // };



  const fetchDonatedAmount = async () => {
    const donations = await getDonations(state.pId);
    console.log(donations); // array
    console.log(address);
  
    const filteredDonations = donations.filter((donation) => donation.donator === address);
    console.log(filteredDonations);
  
    const donationTotals = {};
  
    filteredDonations.forEach((donation) => {
      const id = donation.id;
      const amount = parseFloat(donation.donation);

      if (donationTotals[id]) {
        donationTotals[id] += amount;
      } else {
        donationTotals[id] = amount;
      }
    });
    console.log(donationTotals);

    let donatedAmount = 0;

    Object.values(donationTotals).forEach((total) => {
      donatedAmount += total;
    });

    console.log(donatedAmount);

    const donatedAmountInEther = donatedAmount.toString();
    const finalethvalue = Number(donatedAmountInEther).toFixed(10);
    const trimmedValue = String(finalethvalue).replace(/.?0+$/, '');

    console.log(trimmedValue);

    setDonatedAmount(trimmedValue);
  };
  



  useEffect(() => {
    if(contract) {
      fetchDonators();
    fetchDonatedAmount();
    }
  }, [contract, address])

  const handlerefund= async () => {
    setIsLoading(true);
    await refund(state.pId);
     navigate('/withdraw');
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Creator</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-black break-all">{state.owner}</h4>
              
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Story</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-black leading-[26px] text-justify">{state.description}</p>
              </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>

              <div className="mt-[20px] flex flex-col gap-4">
                {donators.length > 0 ? donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                    <p className="font-epilogue font-normal text-[16px] text-black leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                    <p className="font-epilogue font-normal text-[16px] text-black leading-[26px] break-ll">{item.donation}</p>
                  </div>
                )) : (
                  <p className="font-epilogue font-normal text-[16px] text-black leading-[26px] text-justify">No donators yet. Be the first one!</p>
                )}
              </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>   

          <div className="mt-[20px] flex flex-col p-4 bg-[#F3F1F1] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input 
                type="text"
                readOnly
                // step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={donatedAmount}
                // onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#DCD6D6] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
               
              </div>

              <CustomButton 
                btnType="button"
                title="Ask Refund"
                styles="w-full bg-[#1dc071]"
                handleClick={handlerefund}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefundDetails;