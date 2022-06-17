import { Card } from 'antd'
import { FormatName, FormatAddress } from '../../lib'

let CardReference = (props) => {
  const { reference } = props
  const url = `/references/${reference.UUID}`

  return (
    <Card title={FormatName(reference.Name)} extra={<a href={url}>Details</a>}>
      {reference.Company &&
        <div>
          <i className='mr-2'>Company:</i>
          {reference.Company}
        </div>
      }
      {reference.Title &&
        <div>
          <i className='mr-2'>Title:</i>
          {reference.Title}
        </div>
      }
      {reference.Address && FormatAddress(reference.Address) &&
        <div>
          <i className='mr-2'>Address:</i>
          {FormatAddress(reference.Address)}
        </div>
      }
    </Card>
  )
}

export default CardReference