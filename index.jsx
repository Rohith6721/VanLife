import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/Vans/VanNum";
import VanDetail, { loader as vanDetailLoader } from "./pages/vans/VanDetail";
import Layout from "./components/Layout";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostLayout from "./components/HostLayout";
import HostVans, { loader as hostVansLoader } from "./pages/Host/HostVans";
import HostVanDetail, {
  loader as hostVanDetail,
} from "./pages/Host/HostVanDetail";
import HostVanInfo from "./pages/Host/HostVanInfo";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login";
import { requireAuth } from "./utils";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// localStorage.removeItem("loggedin")
import "./server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route path="vans" element={<Vans />} loader={vansLoader} />
      <Route path="vans/:id" element={<VanDetail />} loader={vanDetailLoader} />

      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={async ({ request }) => {
            await requireAuth(request);
          }}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => {
            await requireAuth(request);
          }}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => {
            await requireAuth(request);
          }}
        />
        <Route path="vans" element={<HostVans />} loader={hostVansLoader} />
        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          loader={hostVanDetail}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => {
              await requireAuth(request);
            }}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => {
              await requireAuth(request);
            }}
          />
          <Route
            path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => {
              await requireAuth(request);
            }}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route index element={<Home />} />
    //       <Route path="about" element={<About />} />
    //       <Route path="vans" element={<Vans />} />
    //       <Route path="vans/:id" element={<VanDetail />} />

    //       <Route path="host" element={<HostLayout />} >
    //           <Route index element={<Dashboard />} />
    //           <Route path="income" element={<Income />} />
    //           <Route path="reviews" element={<Reviews />} />
    //           <Route path="vans" element={<HostVans />} />
    //           <Route path="vans/:id" element={<HostVanDetail />} >
    //               <Route index element={<HostVanInfo />} />
    //               <Route path="pricing" element={<HostVanPricing />} />
    //               <Route path="photos" element={<HostVanPhotos />} />
    //           </Route>
    //       </Route>
    //       <Route path="*" element={ <NotFound /> } />
    //     </Route>
    //   </Routes>
    // </Router>

    <RouterProvider router={router} />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
