import React from 'react'

const Pagination = ({totalposts,postperpage,setcurrentpage,currentpage}) => {

let pages=[];
for( let i=1;i<=Math.ceil(totalposts/postperpage);i++)
{
    pages.push(i);
}

  return (
    <div className='centerplacement'>
    <div className='center'> 
    {
          pages.map((page,index)=>{
            return <button key={index} className= {page==currentpage?'active Fillcolor':'Fillcolor'}  onClick={()=>setcurrentpage(page)}>{page}</button>
          })
        }</div>
       
    </div>
  )
}

export default Pagination