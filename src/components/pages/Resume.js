import React, { useState, useEffect } from 'react'
import { contentUrl, ContentUUID, FormatName, FormatAddress } from '../../lib'
import ContentRender from '../ContentRender'
import BreadCrumbs from '../BreadCrumbs'
import { useQuery } from '@apollo/client'
import {
  GET_JOBS_QUERY,
  GET_SCHOOLS_QUERY,
  GET_REFERENCES_QUERY
} from '../../graphql/queries'
import { Button, Row, Col } from 'antd'
import Loader from '../Loader'

let Resume = () => {
  const [isError, setIsError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);
  const { loading: schoolLoading, error: schoolError, data: schoolData } = useQuery(GET_SCHOOLS_QUERY)
  const { loading: jobLoading, error: jobError, data: jobData } = useQuery(GET_JOBS_QUERY)
  const { loading: refLoading, error: refError, data: refData } = useQuery(GET_REFERENCES_QUERY)

  const trail = [
    { text: 'Home', href: '/' },
    { text: 'Resume' }
  ]

  const print = () => {
    const container = document.getElementById('print-container')
    if (container) {
      const content = container.innerHTML
      const printWindow = window.open('', '', 'height=500, width=500');
			if (printWindow) {
				printWindow.document.write('<html>');
				printWindow.document.write('<body>');
				printWindow.document.write(content);
				printWindow.document.write('</body>');
        printWindow.document.write('<style>');
        printWindow.document.write('body { margin:0; padding: 1.5em 2em 1.5em 2em; }');
        printWindow.document.write('hr { margin: 0.25em 0 1em 0; border-top: solid black 1px; }');
        printWindow.document.write('.new-page { page-break-after: always; }');
        printWindow.document.write('.mb-2 { margin-bottom: 1em; }');
        printWindow.document.write('.mr-2 { margin-right: 1em; }');
        printWindow.document.write('.mr-1 { margin-right: 0.5em; }');
        printWindow.document.write('.mx-1 { margin-right: 0.5em; margin-left: 0.5em; }');
        printWindow.document.write('</style>');
				printWindow.document.write('</html>');
				printWindow.document.close();
				printWindow.print();
			}
    }
  }

  useEffect(() => {
    fetch(`${contentUrl}/page/${ContentUUID.Resume}/row`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setRows(result)
        },
        (error) => {
          setIsLoaded(true)
          setIsError(error)
        }
      )
  }, []);

  if (isError || schoolError || jobError || refError) {
    return <div>Error:</div>
  } else if (!isLoaded || schoolLoading || jobLoading || refLoading) {
    return <Loader />
  } else {
    return (
      <div>
        <BreadCrumbs trail={trail} />
        <ContentRender rows={rows} />
        <Row className='my-1 ml-2'>
          <Col span={2}>
            <Button onClick={print}>Print</Button>
          </Col>
          <Col span={22}>
            Choose "Save as PDF" to download
          </Col>
        </Row>
        <div id='print-container'>
          <strong>Jeff Rossi</strong>
          <div>Software Developer</div>
          <hr/>

          <strong>Employment</strong>
          <hr/>
          { jobData.getJobs.map(job => {
            return (
              <div key={job.UUID} className='mb-2'>
                <div>{job.Company}</div>
                {job.From && job.To &&
                  <div>
                    <span className='mr-2'>
                      From:
                      <span className='mx-1'>{job.From.Month}</span>
                      {job.From.Year}
                    </span>
                    <span>
                      To:
                      <span className='mx-1'>{job.To.Month}</span>
                      {job.To.Year}
                    </span>
                  </div>
                }
                {job.Address && FormatAddress(job.Address) &&
                  <div>
                    <span className='mr-1'>Address:</span>
								    {FormatAddress(job.Address)}
                  </div>
                }
                {job.Title &&
                  <div>
                    <span className='mr-1'>Title:</span>
								    {job.Title}
                  </div>
                }
                {job.Duties &&
                  <div>
                    <span className='mr-1'>Duties:</span>
								    {job.Duties}
                  </div>
                }
              </div>
            )
          })}

          <strong>Education</strong>
          <hr/>
          { schoolData.getSchools.map(school => {
            return (
              <div key={school.UUID} className='mb-2'>
                <div>{school.Name}</div>
                {school.From && school.To &&
                  <div>
                    <span className='mr-2'>
                      From:
                      <span className='mx-1'>{school.From.Month}</span>
                      {school.From.Year}
                    </span>
                    <span>
                      To:
                      <span className='mx-1'>{school.To.Month}</span>
                      {school.To.Year}
                    </span>
                  </div>
                }
                {school.Address && FormatAddress(school.Address) &&
                  <div>
                    <span className='mr-1'>Address:</span>
								    {FormatAddress(school.Address)}
                  </div>
                }
                {school.Program &&
                  <div>
                    <span className='mr-1'>Program:</span>
                    {school.Program}
                  </div>
                }
                {school.Degree &&
                  <div>
                    <span className='mr-1'>Degree:</span>
                    {school.Degree}
                  </div>
                }
              </div>
            )
          })}

          <div className='new-page'></div>

          <strong>Jeff Rossi</strong>
          <div>Software Developer</div>
          <hr/>

          <strong>References</strong>
          <hr/>
          { refData.getReferences.map(reference => {
            return (
              <div key={reference.UUID} className='mb-2'>
                <div>{FormatName(reference.Name)}</div>
                {reference.Company &&
                  <div>
                    <span className='mr-1'>Company:</span>
                    {reference.Company}
                  </div>
                }
                {reference.Title &&
                  <div>
                    <span className='mr-1'>Title:</span>
                    {reference.Title}
                  </div>
                }
                {reference.Address && FormatAddress(reference.Address) &&
                  <div>
                    <span className='mr-1'>Address:</span>
                    {FormatAddress(reference.Address)}
                  </div>
                }
                {reference.Phones && reference.Phones.length > 0 &&
                  <div>
                    <span className='mr-1'>Phone:</span>
                    { reference.Phones.map(phone => {
                      return (
                        <span className='mr-2'>
                          {phone.Number}
                          {phone.Extension &&
                            <span className='ml-1'>ext: {phone.Extension}</span>
                          }
                        </span>
                      )
                    })}
                  </div>
                }
                {reference.Emails && reference.Emails.length > 0 &&
                  <div>
                    <span className='mr-1'>Email:</span>
                    { reference.Emails.map(email => <span className='mr-1'>{email.Address}</span>)}
                  </div>
                }
              </div>
            )
          })}

          <strong>Online</strong>
          <hr/>
          <div>React:</div>
          <div>Vue:</div>
          <div>Angular:</div>
          <div>Svelte:</div>
          <br/>

          <strong>Contact</strong>
          <hr/>
          <div>Address: 1506 Tuscaloosa Ave, Holly Hill Florida 32117</div>
          <div>Home: (386) 226-8913</div>
          <div>Cell: (386) 316-8485</div>
          <div>Email: rossi.jeff@gmail.com</div>
          <br/>
        
        </div>
        <div className='spacer'></div>
      </div>
    )
  }
}

export default Resume;