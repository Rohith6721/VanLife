import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";
import { getVans } from "../../apis";

export function loader(){
  return getVans();
}

export default function Vans() {
  const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null)
  const data = useLoaderData()
  console.log(data)

  const typeFilter = searchParams.get("type");
  console.log("TypeFilter", searchParams);

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  useEffect(() => {
    async function loadVans() {
      setLoading(true)
      try{
        const data = await getVans();
        setVans(data)
      }
      catch(err){
        // console.log("Error")
        // console.log(err)
        setError(err)
      }
      finally{
        setLoading(false)
      }
    }
    loadVans();
  }, []);

  // console.log(vans);

  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
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

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  if(loading){
    return <h1>Loading...</h1>
  }

  if(error){
    return <h1>There was an error: {error.message}</h1>
  }

  return (
    <>
      <div className="van-list-container">
        <h1>Explore our Van Options</h1>
        <div className="van-list-filter-buttons">
          {/* <Link className="van-type simple" to="?type=simple">Simple </Link>
            <Link className="van-type rugged" to="?type=rugged">Rugged </Link>
            <Link className="van-type luxury" to="?type=luxury">Luxury </Link>
            <Link className="van-type clear-filters" to='.'>Clear Filters</Link> */}

          {/* <button
            type="button"
            className={`van-type simple ${
              typeFilter === "simple" ? "selected" : ""
            }`}
            onClick={() => setSearchParams({ type: "simple" })}
          >
            Simple
          </button>
          <button
            type="button"
            className={`van-type rugged ${
              typeFilter === "rugged" ? "selected" : ""
            }`}
            onClick={() => setSearchParams({ type: "rugged" })}
          >
            Rugged
          </button>
          <button
            type="button"
            className={`van-type luxury ${
              typeFilter === "luxury" ? "selected" : ""
            }`}
            onClick={() => setSearchParams({ type: "luxury" })}
          >
            Luxury
          </button> */}

          <button
            onClick={() => handleFilterChange("type", "simple")}
            className={`van-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`}
          >
            Simple
          </button>
          <button
            onClick={() => handleFilterChange("type", "luxury")}
            className={`van-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`}
          >
            Luxury
          </button>
          <button
            onClick={() => handleFilterChange("type", "rugged")}
            className={`van-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`}
          >
            Rugged
          </button>

          {typeFilter ? (
            <button
              type="button"
              className="van-type clear-filters"
              onClick={() => setSearchParams({})}
            >
              Clear Filter
            </button>
          ) : null}
        </div>
        <div className="van-list">{vanElements}</div>
      </div>
    </>
  );
}
