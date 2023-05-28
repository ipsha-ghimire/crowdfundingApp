// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {

struct Request{
    string description;
    address payable recipient; //pay garna 
    uint value;
    bool completed;
    uint noOfVoters;
    mapping(address=>bool) voters; //voters pugyo ya pugena
}

mapping (address=>uint) public contributors;
mapping(uint=>Request) public requests;
uint public numRequests;
address public manager;
uint public minimunContributions; //min contribution amt
uint public deadline;
uint public target;
uint public raisedAmount;
uint public noOfContributors; //kati jana

constructor(uint _target,uint _deadline){
    target = _target;
    deadline = block.timestamp+_deadline;
    minimunContributions= 10 wei;
    manager = msg.sender; // address of the person who does transaction


}
modifier onlyManager(){
    require(msg.sender==manager,"you are not manager");
    _;
    
}
function createRequests(string calldata  _description,address payable  _recipient,uint _value) public onlyManager{
    Request storage newRequest = requests[numRequests];
    numRequests++;
    newRequest.description=_description;
    newRequest.recipient=_recipient;
    newRequest.value=_value;
    newRequest.completed=false;
    newRequest.noOfVoters=0;   
}
function contribution() public payable{
    require(block.timestamp>deadline,"Deadline has passed");
    require(msg.value>=minimunContributions,"Minimum contribution requied is 10 wei");
    if(contributors[msg.sender]==0){
        noOfContributors++;
    }
    contributors[msg.sender]+=msg.value;
    raisedAmount+=msg.value;
}



}
