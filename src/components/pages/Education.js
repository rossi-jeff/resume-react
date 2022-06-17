import React, { useState, useEffect } from 'react'
import { contentUrl, ContentUUID } from '../../lib';
import ContentRender from '../ContentRender'
import { useQuery } from '@apollo/client'
import { GET_SCHOOLS_QUERY } from '../../graphql/queries';
import CardSchool from '../cards/CardSchool'
import BreadCrumbs from '../BreadCrumbs'
import Loader from '../Loader'

let Education = () => {
  const { loading, error, data } = useQuery(GET_SCHOOLS_QUERY)
  const [isError, setIsError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);

  const trail = [
    { text: 'Home', href: '/' },
    { text: 'Education' }
  ]

  useEffect(() => {
    fetch(`${contentUrl}/page/${ContentUUID.Education}/row`)
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
        { data.getSchools.map(school => <CardSchool key={school.Id} school={school} />) }
      </div>
    )
  }
}

export default Education;