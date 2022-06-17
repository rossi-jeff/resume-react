import React, { useState, useEffect } from 'react'
import { contentUrl, ContentUUID } from '../../lib';
import ContentRender from '../ContentRender'
import BreadCrumbs from '../BreadCrumbs'
import Loader from '../Loader'

let Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);

  const trail = [
    { text: 'Home' }
  ]

  useEffect(() => {
    fetch(`${contentUrl}/page/${ContentUUID.Home}/row`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setRows(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <Loader />
  } else {
    return (
      <div>
        <BreadCrumbs trail={trail} />
        <ContentRender rows={rows} />
      </div>
    )
  }
}

export default Home;