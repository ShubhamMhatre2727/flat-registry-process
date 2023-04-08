import React, { useState } from 'react'
import { Web3Storage } from "web3.storage"
import './AddFlat.css'
export default function AddFlat({ addFlat, setAddFlat, accounts, contract }) {
  const [name, setName] = useState("")
  const [bds, setBds] = useState(0)
  const [ba, setBa] = useState(0)
  const [area, setArea] = useState(0)
  const [addr, setAddr] = useState("")
  const [photos, setPhotos] = useState("")
  const [price, setPrice] = useState(0)
  const [builtYear, setBuiltYear] = useState(0)

  const [msg, setMsg] = useState("")

  async function uploadDoc(e) {
    setMsg("Wait till file uploading")
    const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA1YkU2MkJkNjQ0OGQzOTRDMDM5MDlBQjIxRTk4MDgwMzcwMDU2QzUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjQ1NjE0MDM5OTAsIm5hbWUiOiJyZXRhaWwifQ.tL7FAncUhsVd-W1P0u7Ko2OmUHqTZPwmVzEakpraDqs' });
    const obj = e.target.files;
    const name = obj[0].name.toString();
    const rootCid = await client.put(obj, { name: name });
    const url = `https://${rootCid}.ipfs.dweb.link/${name}`;
    setPhotos(url);
    console.log(url)
    alert('File uploaded !')
    setMsg("")
  }

  function submit(event) {
    event.preventDefault()
    contract.addFlat(name, addr, price, bds, ba, area, builtYear, photos)
      .then((res) => {
        res.wait().then((x) => {
          window.location.reload()
        })
      })
  }

  if (!addFlat) return null;

  return (
    <div className='formModal'>
      <div className="formPopup">
        <h1 onClick={() => { setAddFlat(false) }}>x</h1>
        <form onSubmit={submit}>
          <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" required placeholder='Number of Bedrooms' onChange={(e) => setBds(e.target.value)} />
          <input type="number" required placeholder='Number of Bathrooms' onChange={(e) => setBa(e.target.value)} />
          <input type="number" required placeholder='Area (sqft)' onChange={(e) => setArea(e.target.value)} />
          <input type="text" required placeholder='address' value={addr} onChange={(e) => setAddr(e.target.value)} />
          <input type="file" required onChange={(e) => uploadDoc(e)} /> <span>{msg}</span>
          <input type="number" required placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
          <input type="number" placeholder='Built Year' onChange={(e) => setBuiltYear(e.target.value)} />
          <input type="submit" />
        </form>
      </div>
    </div>
  )
}
