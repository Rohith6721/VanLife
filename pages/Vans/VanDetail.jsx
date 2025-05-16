import React, { useEffect, useState } from 'react'
import { useParams , Link, useLocation, useLoaderData} from 'react-router-dom'
import axios from 'axios'
import { getVans } from '../../apis'

export function loader({ params }){
    console.log("params",params)
    return getVans(params.id)
}

const VanDetail = () => {

    // const [van,setVan] = useState(null)
    // const params = useParams()
    // console.log("Params goes here",params)
    const van = useLoaderData()
    const location = useLocation()
    // console.log(location)

    

    // useEffect(() => {
    //     axios.get(`/api/vans/${params.id}`)
    //         .then((res) => {
    //              console.log(res.data)
    //              setVan(res.data.vans) }) 
    //         .catch((err) => console.log(err))
    // },[params.id])

    const search = location.state?.search || ""
    const type = location.state?.type || "all"

  return (
    
    <div className="van-detail-container">
         <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} Vans</span></Link>
        {
            van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} alt="" />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"> <span>${van.price}</span>/day </p>
                    <p> {van.description} </p>
                    <button  className='link-button'>Rent this Van</button>
                </div>
            ) : <h2>Loading...</h2>
        }
    </div>
  )
}

export default VanDetail;