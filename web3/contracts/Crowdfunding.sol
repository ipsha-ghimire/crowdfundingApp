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
uint public noOfContributors //kati jana 
}