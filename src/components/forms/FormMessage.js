import { Form, Input } from 'antd'
const { TextArea } = Input

let FormMessage = (props) => {
  const { Subject, Message } = props.contact

  return (
    <Form layout='vertical'>
      <div className='p-1'>
        <Form.Item label="Subject">
          <Input value={Subject} name="Subject" onChange={props.fieldChanged} />
        </Form.Item>
      </div>
      <div className='p-1'>
        <Form.Item label="Message">
          <TextArea value={Message} name="Message" onChange={props.fieldChanged} />
        </Form.Item>
      </div>
    </Form>
  )
}

export default FormMessage