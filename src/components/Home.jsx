import React, { useState } from 'react'
import Nav from './Nav.jsx'
import Header from './Header.jsx'
import Main from './Main.jsx'
import "./Home.css"

const Home = ({accounts, contract}) => {
  const [addFlat, setAddFlat] = useState(false)
  return (
    <div className='Home'>
        <Nav setAddFlat={setAddFlat} accounts={accounts} contract={contract}/>
        <Header/>
        <Main addFlat={addFlat} setAddFlat={setAddFlat} accounts={accounts} contract={contract}/>
    </div>
  )
}

export default Home