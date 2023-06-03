import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { CustomButton,FormField } from '../components';
import { money } from '../assets';

// import { useStateContext } from '../context';
import { checkIfImage } from '../utils';
const CreateCampaign = () => {
const navigate= useNavigate();
  const [isLoading,setIsLoading]= useState(false);
  const [form,setForm]= useState({
    name:'', //kasle campaign create gareko (create gareko manche ko nam)
    title:'',
    description:'',
    target:'',
    deadline:'',
    image:''
    });

    const handleSubmit=()=>{

    }
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
       {isLoading && 'loader...'}
    <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
      <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
    </div>
     {/* form feild from here  */}
<form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]" >
     <div className="flex flex-wrap gap-[40px]">
          <FormField 
           labelName="Name"
           placeholder="John Doe"
           inputType="text"
           value={form.name}
           handleChange={()=>{}}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"  
            inputType="text"
            value={form.title}
            handleChange={()=>{}}
          />
        </div>
         
        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            value={form.description}
            handleChange={()=>{}}
          />

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={()=>{}}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={()=>{}}
          />
        </div>

        <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={()=>{}}
          />

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
      </form>

  </div>
  )
}

export default CreateCampaign