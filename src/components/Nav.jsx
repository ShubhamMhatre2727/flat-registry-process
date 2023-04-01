import React from 'react'
import './Nav.css'
export default function Nav({accounts, contract, setAddFlat}) {

  function destroyContract(){
    // to delete contract on network
    contract.destroy().then((res)=>{
      if(res){
        res.wait().then((r)=>{
          alert("Contract Destroyed.")
          window.location.reload();
        })
      }
    })
  }  

  return (
    <div className='Nav'>
        <div className="content">
            <p>buy</p> &nbsp; | &nbsp;
            <p onClick={()=>setAddFlat(true)}>sell</p>
        </div>

        <div className="icon"><h1><i>&nbsp; F.R.P. &nbsp;</i></h1></div>

        {
          (!accounts)?
          <button>0x0000...000</button>:
          (accounts[0] == 0xa802beaE0c5C90E96241Fd0000c7c258de131080)?
          <button onClick={()=>destroyContract()}>destroy contract</button>
          :
          <button>{accounts[0].slice(0, 5)}...{accounts[0].slice(38, 42)}</button>
        }
    </div>
  )
}
