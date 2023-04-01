import React, { useEffect, useState } from "react";
import "./Main.css";
import Modal from "./Modal.jsx";
import AddFlat from "./AddFlat.jsx";
export default function Main({ accounts, contract, addFlat, setAddFlat }) {
  const [wait, setWait] = useState(false);
  const [flats, setFlats] = useState([]);
  const [flatModal, setFlatModal] = useState(null);

  function loadModal(_id) {
    setFlatModal(flats[_id])
    setWait(true);
  }

  useEffect(() => {
    contract.getFlats().then((res) => {
      setFlats(...flats, res);
    });
  }, []);

  return (
    <div className="Main">
      <h4>Homes For You</h4>
      <hr />

      <div className="Flats">
        {flats.map((flat, index) => (
          <div className="Wrap" key={index} onClick={() => loadModal(flat['id'].toNumber())}>
            <img
              src={flat['photos']}
              alt=""
            />
            <h3>{""+flat['price']} ETH</h3>
            <p>
              <strong>{""+flat['bedRooms']}</strong> bds | <strong>{""+flat['bathRooms']}</strong> ba |{" "}
              <strong>{""+flat['squareFeet']}</strong> sqft
            </p>
            <p>{flat['addr']}</p>
          </div>
        ))}
      </div>

      <Modal wait={wait} setWait={setWait} flatModal={flatModal} accounts={accounts} contract={contract}/>
      <AddFlat addFlat={addFlat} setAddFlat={setAddFlat} accounts={accounts} contract={contract}/>
    </div>
  );
}
