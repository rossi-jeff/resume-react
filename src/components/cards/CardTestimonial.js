import { Card } from 'antd'
import { FormatName } from '../../lib'

let CardTestimonial = (props) => {
  const { comment } = props

  const author = (comment) => {
    let name = '';
		if (comment) {
			if (comment.Admins && comment.Admins.length && comment.Admins[0].Name) {
				name = FormatName(comment.Admins[0].Name);
			} else if (comment.References && comment.References.length && comment.References[0].Name) {
				name = FormatName(comment.References[0].Name);
			} else if (comment.Visitors && comment.Visitors.length && comment.Visitors[0].Name) {
				name = FormatName(comment.Visitors[0].Name);
			}
		}
		return name;
  }

  return (
    <Card>
      <div>{comment.Message}</div>
      {author(comment) &&
        <div className='text-end'> --- {author(comment)}</div>
      }
    </Card>
  )
}

export default CardTestimonial