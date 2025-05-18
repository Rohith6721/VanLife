import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet, NavLink, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../apis";
import { requireAuth } from "../../utils";

export async function loader({ params,request }){
    await requireAuth(request)
    return getHostVans(params.id)
}

const HostVanDetail = () => {
  // const [currentVan, setCurrentVan] = useState(null);
  // const { id } = useParams();

  const currentVan = useLoaderData()



  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  // useEffect(() => {
  //   axios
  //     .get(`/api/host/vans/${id}`)
  //     .then((res) => {
  //       setCurrentVan(res.data.vans);
  //       console.log(res.data.vans);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  if (!currentVan) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${currentVan.type}`}>
              {currentVan.type}
            </i>
            <h3>{currentVan.name}</h3>
            <h4>${currentVan.price}/day</h4>
          </div>
        </div>

        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            style={({ isActive }) => (isActive ? activeStyles : null)}
            end
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            {" "}
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Photos
          </NavLink>
        </nav>

        <Outlet context={{ currentVan }} />
      </div>
    </section>
  );
};

export default HostVanDetail;
