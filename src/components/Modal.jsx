import './Modal.css'
const Modal = ({wait, setWait, accounts, contract, flatModal}) => {
  if(!wait) return null;
   
  function closePopup(){
    setWait(false)
  }

  function buyFlat(){
    contract.buy(flatModal['id']).then((res)=>{
      if(res){
        res.wait().then((x)=>{
          window.location.reload();
        })
      }
    })
  }

  function approve(){
    contract.sell(flatModal['id']).then((res)=>{
      if(res){
        res.wait().then((r)=>{
          window.location.reload();
        })
      }
    })
  }

  function makeSell(){
    contract.makeForSell(flatModal['id']).then((res)=>{
      if(res){
        res.wait().then((r)=>{
          window.location.reload();
        })
      }
    })
  }

  return (
    <div className='Modal'>
      <div className="popup">
        <h1 onClick={()=>closePopup()}>x</h1>
        <section>
        <div className="imgs"><img src={flatModal['photos']} alt="" /></div>
        <div className="info">
          <h3>{flatModal['name']}</h3>
          <p><strong>{""+flatModal['bedRooms']}</strong> bds | <strong>{""+flatModal['bathRooms']}</strong> ba | <strong>{""+flatModal['squareFeet']}</strong> sqft</p>
          <p>{flatModal['addr']}</p>
          <h3>{""+flatModal['price']} ETH</h3>
            {
              (flatModal['owner'].toLowerCase() === accounts[0])?
              (""+flatModal['status'] === "1")?
              <button className='buy' onClick={()=>approve()}>Aprove & Sell</button>
              :
              (""+flatModal['status'] === "2")?
              <button className='buy' onClick={()=>makeSell()}>Sell</button>
              :
              <button className='buy'>Owned by you</button>
              :
              (""+flatModal['status'] === "1")?
              <button className='buy'>under inspection</button>
              :
              (""+flatModal['status'] === "2")?
              <button className="buy">owned by {flatModal['owner'].slice(0,5)}...{flatModal['owner'].slice(38, 42)}</button>
              :
              <button className='buy' onClick={()=>buyFlat()}>Buy</button>

            }
          <hr />
          <h4>Overview</h4>
          <p className='overview'>{flatModal['name']} has {""+flatModal['bedRooms']} bedroom/s, {""+flatModal['bathRooms']} bathroom/s <br />and many more. It covers about {""+flatModal['squareFeet']} sqft of area <br /> and is located in, <br />{""+flatModal['addr']}.</p>
          <hr />
          <h4>Facts and Features</h4>
          <ul>
            <li><strong>Purchase Price </strong> : {""+flatModal['price']}</li>
            <li><strong>Bed Rooms</strong> : {""+flatModal['bedRooms']}</li>
            <li><strong>Bathrooms</strong> : {""+flatModal['bathRooms']}</li>
            <li><strong>Square Feet</strong> : {""+flatModal['squareFeet']}</li>
            <li><strong>Year Built</strong> : {""+flatModal['yearBuilt']}</li>
          </ul>
        </div>
        </section>
      </div>
    </div>
  )
}

export default Modal