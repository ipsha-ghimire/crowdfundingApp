import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { search } from '../assets';
// import '../index.css';
const Search = () => {
const navigate = useNavigate();
const[keyword,setkeyword]= useState('');

    const searchHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/?keyword=${keyword}`);
                }else{
            navigate('/');   
        }
}
    return (
        <form onSubmit={searchHandler} className='inlinedis'>
        
          <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#DCD6D6`] rounded-[100px] flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6 bor">
            <input
                type="text"
                placeholder="Search for campaigns"
                className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-black bg-transparent outline-none form-control"
                id="search_feild"
                onChange={(e)=>setkeyword(e.target.value)}

            />
            <button
                id='search_btn'
                className="w-[72px] h-full rounded-[20px] bg-[#1dc071] flex justify-center items-center cursor-pointer">
                <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />
            </button>

            </div>

        </form>
    )
}

export default Search;