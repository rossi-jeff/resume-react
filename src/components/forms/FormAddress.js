import { Row, Col, Form, Input } from 'antd'

let FormAddress = (props) => {
  const { Address } = props.contact

  return (
    <Form layout='vertical'>
      <div className='p-1'>
        <Form.Item label="Address">
          <Input value={Address.Address} name="Address.Address" onChange={props.fieldChanged} />
        </Form.Item>
      </div>
      <div className='p-1'>
        <Form.Item label="Suite">
          <Input value={Address.Suite} name="Address.Suite" onChange={props.fieldChanged} />
        </Form.Item>
      </div>
      <Row>
        <Col className='p-1' span={8}>
          <Form.Item label="City">
            <Input value={Address.City} name="Address.City" onChange={props.fieldChanged} />
          </Form.Item>
        </Col>
        <Col className='p-1' span={8}>
          <Form.Item label="State">
            <Input value={Address.State} name="Address.State" onChange={props.fieldChanged} />
          </Form.Item>
        </Col>
        <Col className='p-1' span={8}>
          <Form.Item label="Zip">
            <Input value={Address.Zip} name="Address.Zip" onChange={props.fieldChanged} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FormAddress