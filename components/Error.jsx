import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError()
  return (
    <>
        <h1>Error : {error.message}</h1>
        <pre> {error.statusText} - {error.status}</pre>
    </>
  )
}

export default Error