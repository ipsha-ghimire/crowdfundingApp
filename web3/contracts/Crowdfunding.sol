// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        bool closed;
        string image;
        address[] donators;
        uint256[] donations;
      
    }
    mapping(address => uint256) donatedAmount;

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
  
        Campaign storage campaign = campaigns[numberOfCampaigns];
        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
         campaign.deadline =   _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

   function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];
        require(!campaign.closed, "The campaign is disabled");
        require(campaign.deadline > block.timestamp, "The deadline has already passed.");

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);
        donatedAmount[msg.sender] += msg.value;
        campaign.amountCollected += msg.value;

        if (campaign.amountCollected >= campaign.target) {
            (bool sent, ) = payable(campaign.owner).call{value: campaign.amountCollected}("");
            require(sent, "Transfer to campaign owner failed.");
            campaign.closed = true;
    }
   }

    function claimRefund(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];

        require(campaign.deadline < block.timestamp, "The deadline has not passed yet.");
        require(campaign.amountCollected < campaign.target, "The campaign goal has been reached.");

        uint256 amount = donatedAmount[msg.sender];
        require(amount > 0, "No refund is available for this address.");

        donatedAmount[msg.sender] = 0;
        campaign.amountCollected -= amount;

        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Failed to send the refund.");
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        Campaign storage campaign = campaigns[_id];
        return (campaign.donators, campaign.donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }



}