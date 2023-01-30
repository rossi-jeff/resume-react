import React, { useState, useEffect } from 'react'
import { contentUrl, ContentUUID, RemoveBlanks } from '../../lib'
import ContentRender from '../ContentRender'
import BreadCrumbs from '../BreadCrumbs'
import { Steps, Button } from 'antd'
import FormAddress from '../forms/FormAddress'
import FormContactMethod from '../forms/FormContactMethod'
import FormMessage from '../forms/FormMessage'
import FormName from '../forms/FormName'
import ContactConfirm from '../ContactConfirm'
import { useMutation } from '@apollo/client'
import { CREATE_CONTACT_MUTATION } from '../../graphql/mutations'
import Loader from '../Loader'

const { Step } = Steps

let Contact = () => {
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [rows, setRows] = useState([])
	const [createContact] = useMutation(CREATE_CONTACT_MUTATION)

	const trail = [{ text: 'Home', href: '/' }, { text: 'Contact' }]

	const blank = {
		Name: {
			Salutation: '',
			First: '',
			Middle: '',
			Last: '',
			Suffix: '',
		},
		Address: {
			Address: '',
			Suite: '',
			City: '',
			State: '',
			Zip: '',
		},
		Email: '',
		EmailType: 'Work',
		Phone: '',
		PhoneType: 'Work',
		Preferred: 'Email',
		Subject: '',
		Message: '',
	}
	const [contact, setContact] = useState(blank)
	const [current, setCurrent] = useState(0)

	const next = () => {
		setCurrent(current + 1)
	}

	const prev = () => {
		setCurrent(current - 1)
	}

	const selectChanged = (name, value) => {
		// ant selects just pass along the value, kludge
		fieldChanged({ target: { name, value } })
	}

	const fieldChanged = (event) => {
		// yet another reason why both Vue and Svelte are better than React
		if (event.target) {
			let { name, value } = event.target
			// console.log('fieldChanged', name, value);
			if (name.indexOf('.') > -1) {
				let newContact = {}
				for (let key in contact) {
					if (typeof contact[key] === 'object') {
						newContact[key] = { ...contact[key] }
					} else {
						newContact[key] = contact[key]
					}
				}
				let [parent, child] = name.split('.')
				newContact[parent][child] = value
				setContact(newContact)
			} else {
				setContact({
					...contact,
					[name]: value,
				})
			}
		}
	}

	const sendContact = () => {
		console.log('sendContact', contact)
		createContact({ variables: RemoveBlanks(contact) })
			.then((data) => {
				console.log(data.createContact)
				setContact(blank)
				setCurrent(0)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const steps = [
		{
			title: 'Name',
			content: (
				<FormName
					fieldChanged={fieldChanged}
					selectChanged={selectChanged}
					contact={contact}
				/>
			),
		},
		{
			title: 'Address',
			content: <FormAddress fieldChanged={fieldChanged} contact={contact} />,
		},
		{
			title: 'Contact Methods',
			content: (
				<FormContactMethod
					fieldChanged={fieldChanged}
					selectChanged={selectChanged}
					contact={contact}
				/>
			),
		},
		{
			title: 'Message',
			content: <FormMessage fieldChanged={fieldChanged} contact={contact} />,
		},
		{
			title: 'Confirm',
			content: <ContactConfirm contact={contact} sendContact={sendContact} />,
		},
	]

	useEffect(() => {
		fetch(`${contentUrl}/page/${ContentUUID.Contact}/row`)
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true)
					setRows(result)
				},
				(error) => {
					setIsLoaded(true)
					setError(error)
				}
			)
	}, [])

	if (error) {
		return <div>Error: {error.message}</div>
	} else if (!isLoaded) {
		return <Loader />
	} else {
		return (
			<div>
				<BreadCrumbs trail={trail} />
				<ContentRender rows={rows} />
				<div className="p-2">
					<Steps current={current}>
						{steps.map((step) => {
							return <Step key={step.title} title={step.title} />
						})}
					</Steps>
					<div className="my-3">{steps[current].content}</div>
					<div className="steps-action">
						{current > 0 && (
							<Button style={{ margin: '0 8px' }} onClick={() => prev()}>
								Previous
							</Button>
						)}
						{current < steps.length - 1 && (
							<Button type="primary" onClick={() => next()}>
								Next
							</Button>
						)}
					</div>
				</div>
			</div>
		)
	}
}

export default Contact
