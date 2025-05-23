import axios from "axios";
import React, { Suspense, useEffect } from "react";
import { Await, defer, Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../apis";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
  await requireAuth(request);
  return defer({ vans: getHostVans() });
}

export default function HostVans() {
  // const [vans, setVans] = React.useState([]);
  const dataPromise = useLoaderData();
  // console.log(vans)

  // useEffect(() => {
  //   axios
  //     .get("/api/host/vans")
  //     .then((res) => setVans(res.data.vans))
  //     .catch((err) => console.log(err));
  // }, []);

  function hostVanElements(vans) {
    const hostVansEls = vans.map((van) => (
      <Link to={van.id} key={van.id} className="host-van-link-wrapper">
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ));

    return (
      <>
        <div className="host-vans-list">
          {vans.length > 0 ? (
            <section>{hostVansEls}</section>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </>
    );
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <Suspense fallback={<h2>Loading Host Vans...</h2>}>
        <Await resolve={dataPromise.vans}>{hostVanElements}</Await>
      </Suspense>
    </section>
  );
}
