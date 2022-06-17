import { Row, Col, Form, Input, Select } from 'antd'
const { Option } = Select

let FormContactMethod = (props) => {
  const emailTypes = ['Work', 'Home']
	const phoneTypes = ['Work', 'Mobile', 'Home']
	const prefered = ['Email', 'Phone']
  const { contact } = props

  return (
    <Form layout='vertical'>
      <Row>
        <Col className='p-1' span={4}>
          <Form.Item label="Email Type">
            <Select value={contact.EmailType} onChange={(event) => props.selectChanged('EmailType',event)}>
              { emailTypes.map(e => <Option key={e} value={e}>{e}</Option>) }
            </Select>
          </Form.Item>
        </Col>
        <Col className='p-1' span={6}>
          <Form.Item label="Email">
            <Input value={contact.Email} name="Email" onChange={props.fieldChanged} />
          </Form.Item>
        </Col>
        <Col className='p-1' span={4}>
          <Form.Item label="Phone Type">
            <Select value={contact.PhoneType} onChange={(event) => props.selectChanged('PhoneType',event)}>
              { phoneTypes.map(p => <Option key={p} value={p}>{p}</Option>) }
            </Select>
          </Form.Item>
        </Col>
        <Col className='p-1' span={6}>
          <Form.Item label="Phone">
            <Input value={contact.Phone} name="Phone" onChange={props.fieldChanged} />
          </Form.Item>
        </Col>
        <Col className='p-1' span={4}>
          <Form.Item label="Preferred">
            <Select value={contact.Preferred} onChange={(event) => props.selectChanged('Preferred',event)}>
              { prefered.map(p => <Option key={p} value={p}>{p}</Option>) }
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FormContactMethod