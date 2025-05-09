import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const VanDetail = () => {

    const [van,setVan] = useState(null)
    const params = useParams()
    // console.log(params)

    useEffect(() => {
        axios.get(`/api/vans/${params.id}`)
            .then((res) => {
                 console.log(res.data)
                 setVan(res.data.vans) }) 
            .catch((err) => console.log(err))
    },[params.id])

  return (
    
    <div className="van-detail-container">
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