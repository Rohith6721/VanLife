import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



export default function Vans() {
  const [vans, setVans] = useState([]);

  useEffect(() => {
    axios
      .get("api/vans")
      .then((res) => setVans(res.data.vans))
      .catch((err) => console.log(err));
  }, []);

  console.log(vans);

  const vanElements = vans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to = {`/vans/${van.id}`}>
          <img src={van.imageUrl} alt="" />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price} <span>/day</span>{" "}
            </p>
            {/* <p>{van.description}</p> */}
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <>
      <div className="van-list-container">
        <h1>Explore our Van Options</h1>
        <div className="van-list">{vanElements}</div>
      </div>
    </>
  );
}
