import { Card } from 'antd'
import { FormatAddress } from '../../lib'

let CardSchool = (props) => {
  const { school} = props

  return (
    <Card title={school.Name}>
      {school.From && school.To &&
        <div>
          <span className='mr-2'>
            <i className='mr-2'>From:</i> 
            <span className='mr-2'>{ school.From.Month }</span>
            { school.From.Year }
          </span>
          <span>
            <i className='mr-2'>To:</i>
            <span className='mr-2'>{ school.To.Month }</span>
            { school.To.Year }
          </span>
        </div>
      }
      {school.Address && FormatAddress(school.Address) &&
        <div>
          {FormatAddress(school.Address)}
        </div>
      }
      {school.Program &&
        <div>
          <i className='mr-2'>Program:</i>
          {school.Program}
        </div>
      }
      {school.Degree &&
        <div>
          <i className='mr-2'>Degree:</i>
          {school.Degree}
        </div>
      }
    </Card>
  )
}

export default CardSchool