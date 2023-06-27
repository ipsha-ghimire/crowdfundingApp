import React, { useState, useEffect } from 'react'

import { DisplayRefund } from '../components';
import { useStateContext } from '../context';
const Refund = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getActiveCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getActiveCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayRefund
      title="Refundable Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Refund;