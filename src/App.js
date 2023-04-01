import Home from "./components/Home";
import {ethers} from 'ethers';
import { useEffect, useState } from "react";
import registry from "./contracts/registry.json";

function App() {

  const [accounts, setAccounts] = useState(null)
  const [contract, setContract] = useState(null);

  async function loadData(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    // for ganache
    // const contractAddress = registry.networks[5777].address;
    
    // for polygon
    const contractAddress = registry.networks[80001].address;

    const contract = new ethers.Contract(contractAddress, registry.abi, signer);

    setContract(contract);

    const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
    setAccounts(accounts);
  }

  window.ethereum.on("accountsChanged", (acc)=>{
    window.location.href = "/"
    window.location.reload()
  })

  useEffect(()=>{
    loadData();
  },[])

  return (
    <div className="App">
      {
        (!window.ethereum)? <></>:
        (!contract)? <></>:
        <Home accounts={accounts} contract={contract}/>
      }
    </div>
  );
}

export default App;
