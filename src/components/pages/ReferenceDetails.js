import { useParams } from 'react-router-dom'
import Loader from '../Loader'
import { useQuery } from '@apollo/client'
import { SHOW_REFERENCE_QUERY } from '../../graphql/queries'
import { FormatName, FormatAddress } from '../../lib'
import BreadCrumbs from '../BreadCrumbs'
import { Card } from 'antd'

let ReferenceDetail = (props) => {
  const { uuid } = useParams()
  const { loading, error, data: refData } = useQuery(SHOW_REFERENCE_QUERY, { variables: { UUID: uuid } })
  let reference = {}
  if (refData && refData.showReference) {
    reference = refData.showReference
  }

  const trail = [
    { text: 'Home', href: '/' },
    { text: 'References', href: '/references' }
  ]

  if (error) {
    return <div>Error</div>
  } else if (loading) {
    return <Loader />
  } else {
    if (trail.length === 2) {
      trail.push({ text: FormatName(reference.Name)})
    }
    return (
      <div>
        <BreadCrumbs trail={trail} />
        <Card title={FormatName(reference.Name)}>
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
        {reference.Phones && reference.Phones.length > 0 &&
          <Card title="Phone">
            {reference.Phones.map(phone => {
              return (
                <div key={phone.Id}>
                  <span className='mr-2'>{phone.Number}</span>
                  {phone.Extension &&
                    <span>ext: {phone.Extension}</span>
                  }
                </div>
              )
            })}
          </Card>
        }
        {reference.Emails && reference.Emails.length > 0 &&
          <Card title="Email">
            {reference.Emails.map(email => <div key={email.Id}>{email.Address}</div>)}
          </Card>
        }
        {reference.Comments && reference.Comments.length > 0 &&
          <Card title="Comment">
            {reference.Comments.map(comment => <div key={comment.Id}>{comment.Message}</div>)}
          </Card>
        }
      </div>
    )
  }
}

export default ReferenceDetail