import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { Pagination }  from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [currentpage,setcurrentpage]= useState(1);
  const[postperpage,setpostperpage]=useState(3);



  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

const lastPostIndex=currentpage * postperpage;
const firstpostindex=lastPostIndex-postperpage;
const currentposts=campaigns.slice(firstpostindex,lastPostIndex); //how many post to display eg(1 to 10 and so on )

  return (
    <div>
 <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={currentposts}/>
    <Pagination totalposts={campaigns.length} postperpage={postperpage} setcurrentpage={setcurrentpage} currentpage={currentpage}/>
    </div>
 
  )
}

export default Home