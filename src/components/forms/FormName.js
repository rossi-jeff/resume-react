import { Row, Col, Form, Input, Select } from 'antd'
const { Option } = Select

let FormName = (props) => {
  const { Name } = props.contact
  const salutations = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr']

  return (
    <Form layout='vertical'>
      <Row>
        <Col span={3} className='p-1'>
          <Form.Item label="Salutation">
            <Select value={Name.Salutation} name="Name.Salutation" onChange={(event) => props.selectChanged('Name.Salutation',event)}>
              { salutations.map(s => <Option key={s} value={s}>{s}</Option>) }
            </Select>
          </Form.Item>
        </Col>
        <Col span={6} className='p-1'>
          <Form.Item label="First">
            <Input value={Name.First} name="Name.First" onChange={props.fieldChanged} />
          </Form.Item>
        </Col>
        <Col span={6} className='p-1'>
          <Form.Item label="Middle">
            <Input value={Name.Middle} name="Name.Middle" onChange={props.fieldChanged} />
          </Form.Item>
        </Col>
        <Col span={6} className='p-1'>
          <Form.Item label="Last">
            <Input value={Name.Last} name="Name.Last" onChange={props.fieldChanged} />
          </Form.Item>
        </Col>
        <Col span={3} className='p-1'>
          <Form.Item label="Suffix">
            <Input value={Name.Suffix} name="Name.Suffix" onChange={props.fieldChanged} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FormName