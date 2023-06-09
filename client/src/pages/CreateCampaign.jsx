import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { CustomButton, FormField } from '../components';
import { money } from '../assets';
import { useStateContext } from '../context';
import { checkIfImage } from '../utils';
const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '', //kasle campaign create gareko (create gareko manche ko nam)
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });



  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Provide valid image URL')
        setForm({ ...form, image: '' });
      }
    })
  }



  const handleFormFieldChange = (fieldName, e) => {
    let value = e.target.value;

    if (fieldName === "target") {
      value = parseFloat(value); // Convert the value to a floating-point number

      if (isNaN(value) || value < 0) {
        value = ""; // Reset the value to an empty string if it's not a positive number
      }
    }
    setForm({ ...form, [fieldName]: value })
  }

  return (
    <div className="bg-[#E8F3D6] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && 'loader...'}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#1dc071] rounded-[10px]">
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
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => { handleFormFieldChange('title', e) }}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => { handleFormFieldChange('description', e) }}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target}
            handleChange={(e) => { handleFormFieldChange('target', e) }}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => { handleFormFieldChange('deadline', e) }}
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => { handleFormFieldChange('image', e) }}
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