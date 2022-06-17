import React, { useState, useEffect } from 'react'
import { contentUrl, ContentUUID } from '../../lib'
import ContentRender from '../ContentRender'
import { useQuery } from '@apollo/client'
import { GET_REFERENCES_QUERY } from '../../graphql/queries'
import CardReference from '../cards/CardReference'
import BreadCrumbs from '../BreadCrumbs'
import Loader from '../Loader'

let References = () => {
  const { loading, error, data } = useQuery(GET_REFERENCES_QUERY)
  const [isError, setIsError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);

  const trail = [
    { text: 'Home', href: '/' },
    { text: 'References' }
  ]

  useEffect(() => {
    fetch(`${contentUrl}/page/${ContentUUID.References}/row`)
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
        { data.getReferences.map(reference => <CardReference key={reference.Id} reference={reference} />) }
      </div>
    )
  }
}

export default References;