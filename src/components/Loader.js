import { Space, Spin } from 'antd'

let Loader = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <Space size='large'>
        <Spin tip='Loading...' />
      </Space>
    </div>
  )
}

export default Loader