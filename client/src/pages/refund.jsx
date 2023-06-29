import React, { useState, useEffect } from 'react'

import { DisplayRefund } from '../components';
import { useStateContext } from '../context';
import { Pagination }  from '../components';
const Refund = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [currentpage,setcurrentpage]= useState(1);
  const[postperpage,setpostperpage]=useState(3);

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

  const lastPostIndex=currentpage * postperpage;
const firstpostindex=lastPostIndex-postperpage;
const currentposts=campaigns.slice(firstpostindex,lastPostIndex); 
  return (
   <div>
 <DisplayRefund
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={currentposts}/>
    <Pagination totalposts={campaigns.length} postperpage={postperpage} setcurrentpage={setcurrentpage} currentpage={currentpage}/>
    </div>
  )
}

export default Refund;