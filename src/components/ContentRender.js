import React from 'react'

let ContentRender = (props) => {
  const { rows } = props

  return (
    <div style={{ padding: '1em' }}>
      {rows.map(row => {
        return (
          <div key={row.Id}>
          {row.Columns.map(column => <div key={column.Id} dangerouslySetInnerHTML={{__html: column.Content}} />)}
          </div>
        )
      })}
    </div>
  )
}

export default ContentRender