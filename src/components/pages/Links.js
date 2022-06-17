import React, { useState, useEffect } from 'react'
import { contentUrl, ContentUUID } from '../../lib';
import ContentRender from '../ContentRender'
import { useQuery } from '@apollo/client'
import { GET_LINKS_QUERY } from '../../graphql/queries'
import BreadCrumbs from '../BreadCrumbs'
import { Table } from 'antd'
import Loader from '../Loader'

let Links = () => {
  const { loading, error, data } = useQuery(GET_LINKS_QUERY)
  const [isError, setIsError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);

  const trail = [
    { text: 'Home', href: '/' },
    { text: 'Links' }
  ]

  const columns = [
    { 
      title: 'Site', 
      dataIndex: 'Title', 
      key: 'site', 
      render: (_, record) => (
        <>
          <strong>{record.Title}</strong><br/>
          {record.Description}
        </>
      ) 
    },
    { title: 'Type', dataIndex: 'Type', key: 'type' },
    { 
      title: 'Visit', 
      dataIndex: 'Url', 
      key: 'visit', 
      render: (_, record) => (
        <a href={record.Url} rel="noreferrer" target="_blank">Visit {record.Title}</a>
      ),
      className: 'nowrap'
    }
  ]

  useEffect(() => {
    fetch(`${contentUrl}/page/${ContentUUID.Links}/row`)
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
        <Table columns={columns} dataSource={data.getLinks} />
      </div>
    )
  }
}

export default Links;