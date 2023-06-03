import React,{useContext,createContext} from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
const StateContext = createContext();
export const StateContexProvider = (childeren)=>{
    const {contract} = useContract('0x3dcF89A5Ae1726376F8556C6C0A944f932DbccA4')

}
