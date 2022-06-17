import { PageHeader, Menu } from 'antd'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

let TabBar = () => {

  const location = useLocation()

  const [current,setCurrent] = useState(location.pathname);

  const menuClick = (e) => {
    setCurrent(e.key)
  }

  const items = [
    {
      label: (
        <a href='/'>Home</a>
      ),
      key: '/'
    },
    {
      label: (
        <a href='/contact'>Contact</a>
      ),
      key: '/contact'
    },
    {
      label: (
        <a href='/employment'>Employment</a>
      ),
      key: '/employment'
    },
    {
      label: (
        <a href='/education'>Education</a>
      ),
      key: '/education'
    },
    {
      label: (
        <a href='/references'>References</a>
      ),
      key: '/references'
    },
    {
      label: (
        <a href='/testimonials'>Testimonials</a>
      ),
      key: '/testimonials'
    },
    {
      label: (
        <a href='/links'>Links</a>
      ),
      key: '/links'
    },
    {
      label: (
        <a href='/resume'>Resume</a>
      ),
      key: '/resume'
    }
  ]

  return (
    <Menu items={items} mode="horizontal" onClick={menuClick} selectedKeys={[current]} />
  )
}

let TopBar = () => {
  return (
    <PageHeader title="Jeff Rossi" subTitle="Software Developer" ghost={false} footer={<TabBar />} />
  )
}

export default TopBar