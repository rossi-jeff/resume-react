import React, { useState, useEffect } from 'react'
import { contentUrl, ContentUUID } from '../../lib'
import ContentRender from '../ContentRender'
import { useQuery } from '@apollo/client'
import { GET_COMMENTS_QUERY } from '../../graphql/queries'
import CardTestimonial from '../cards/CardTestimonial'
import BreadCrumbs from '../BreadCrumbs'
import Loader from '../Loader'

let Testimonials = () => {
  const { loading, error, data } = useQuery(GET_COMMENTS_QUERY)
  const [isError, setIsError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);

  const trail = [
    { text: 'Home', href: '/' },
    { text: 'Testimonials' }
  ]

  useEffect(() => {
    fetch(`${contentUrl}/page/${ContentUUID.Testimonials}/row`)
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
        { data.getComments.map(comment => <CardTestimonial key={comment.Id} comment={comment} />) }
      </div>
    )
  }
}

export default Testimonials;