import React, { useState, useEffect } from 'react'
import { contentUrl, ContentUUID } from '../../lib'
import ContentRender from '../ContentRender'
import { GET_JOBS_QUERY } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import CardJob from '../cards/CardJob'
import BreadCrumbs from '../BreadCrumbs'
import Loader from '../Loader'

let Employment = () => {
  const { loading, error, data } = useQuery(GET_JOBS_QUERY)
  const [isError, setIsError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);

  const trail = [
    { text: 'Home', href: '/' },
    { text: 'Employment' }
  ]

  useEffect(() => {
    fetch(`${contentUrl}/page/${ContentUUID.Employment}/row`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setRows(result)
        },
        (error) => {
          setIsLoaded(true)
          setIsError(error)
        }
      )
  }, []);

  if (isError || error) {
    return <div>Error:</div>
  } else if (!isLoaded || loading) {
    return <Loader />
  } else {
    return (
      <div>
        <BreadCrumbs trail={trail} />
        <ContentRender rows={rows} />
        { data.getJobs.map(job => <CardJob key={job.Id} job={job} />) }
      </div>
    )
  }
}

export default Employment;