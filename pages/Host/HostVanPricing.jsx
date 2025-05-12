import React from 'react'
import { useOutletContext } from 'react-router-dom'

const HostVanPricing = () => {
    const { currentVan } = useOutletContext()
  return (
    <section>
        <h4 className='host-van-price'>${currentVan.price} <span>/day</span> </h4>
    </section>
  )
}

export default HostVanPricing