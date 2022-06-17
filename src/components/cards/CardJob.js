import { Card } from 'antd'
import { FormatAddress } from '../../lib'

let CardJob = (props) => {
  const { job } = props

  return (
    <Card title={job.Company}>
      {job.From && job.To &&
        <div>
          <span className='mr-2'>
            <i className='mr-2'>From:</i> 
            <span className='mr-2'>{ job.From.Month }</span>
            { job.From.Year }
          </span>
          <span>
            <i className='mr-2'>To:</i>
            <span className='mr-2'>{ job.To.Month }</span>
            { job.To.Year }
          </span>
        </div>
      }
      {job.Address && FormatAddress(job.Address) &&
        <div>
          <i className='mr-2'>Address:</i>
          { FormatAddress(job.Address) }
        </div>
      }
      {job.Title &&
        <div>
          <i className='mr-2'>Title:</i>
          { job.Title }
        </div>
      }
      {job.Duties &&
        <div>
          <i className='mr-2'>Duties:</i>
          { job.Duties }
        </div>
      }
    </Card>
  )
}

export default CardJob