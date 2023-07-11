import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { DisplayCampaigns } from '../components';
import { Pagination } from '../components';
import { useStateContext } from '../context';
import { Search } from '../components/';

const Home = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword');
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage, setpostperpage] = useState(3);
  const [searchResults, setSearchResults] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const 
    
    
    
    data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  const searchCampaigns = (keyword) => {
    const results = campaigns.filter((campaign) =>
      campaign.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResults(results);
    setcurrentpage(1);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  useEffect(() => {
    if (keyword) {
      searchCampaigns(keyword);
    } else {
      fetchCampaigns();
    }
  }, [keyword]);

  const handleSearch = (keyword) => {
    if (keyword.trim()) {
      searchCampaigns(keyword);
    } else {
      fetchCampaigns();
    }
  };

  const lastPostIndex = currentpage * postperpage;
  const firstpostindex = lastPostIndex - postperpage;
  const currentposts = keyword ? searchResults.slice(firstpostindex, lastPostIndex) : campaigns.slice(firstpostindex, lastPostIndex);

  return (
    <div>
      <Search handleSearch={handleSearch} />

      <DisplayCampaigns
        title={keyword ? `Search Results for "${keyword}"` : "All Campaigns"}
        isLoading={isLoading}
        campaigns={currentposts}
      />

      <Pagination
        totalposts={keyword ? searchResults.length : campaigns.length}
        postperpage={postperpage}
        setcurrentpage={setcurrentpage}
        currentpage={currentpage}
      />
    </div>
  );
};

export default Home;
