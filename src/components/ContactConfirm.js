import { FormatName, FormatAddress } from '../lib';
import { Button } from 'antd'

let ContactConfirm = (props) => {
  const { contact } = props
  return (
    <div className='p-1'>
      <div>
        <strong className='mr-2'>Name</strong>
        {FormatName(contact.Name)}
      </div>
      <div>
        <strong className='mr-2'>Address</strong>
        {FormatAddress(contact.Address)}
      </div>
      <div>
        <strong className='mr-2'>Email</strong>
        {contact.Email}
      </div>
      <div>
        <strong className='mr-2'>Phone</strong>
        {contact.Phone}
      </div>
      <div>
        <strong className='mr-2'>Preferred</strong>
        {contact.Preferred}
      </div>
      <div>
        <strong className='mr-2'>Subject</strong>
        {contact.Subject}
      </div>
      <div>
        <strong className='mr-2'>Message</strong>
        {contact.Message}
      </div>
      <Button onClick={props.sendContact} className="mt-2">Send Contact Form</Button>
    </div>
  )
}

export default ContactConfirm