import { Breadcrumb } from 'antd'

let BreadCrumbs = (props) => {
  const { trail } = props

  return (
    <Breadcrumb className='ml-2 my-1' separator=">">
      { trail.map((crumb,i) => {
        if (crumb.href) {
          return (
            <Breadcrumb.Item key={i}>
              <a href={crumb.href}>{crumb.text}</a>
            </Breadcrumb.Item>
          )
        } else {
          return <Breadcrumb.Item key={i}>{crumb.text}</Breadcrumb.Item>
        }
      })}
    </Breadcrumb>
  )
}

export default BreadCrumbs