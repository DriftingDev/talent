import React from 'react';
import { useHistory } from 'react-router'
import { Nav, Navbar } from 'react-bootstrap';
import { BsCalendar, BsPersonLinesFill } from 'react-icons/bs'
import { IoMdMicrophone } from 'react-icons/io'
import { GiFamilyHouse } from 'react-icons/gi'
import 'bootstrap/dist/css/bootstrap.min.css';

const ProducerOptions = () => {

  const history = useHistory()

  const options = [
    [<BsCalendar />, "Calendar"], 
    [<IoMdMicrophone />,"Shows"], 
    [<BsPersonLinesFill />,"Artists"], 
    [<GiFamilyHouse />,"Venues"]]

  const links = options.map((opt) => {
    return (
    history.location.pathname.slice(1, opt[1].length + 1) === opt[1].toLowerCase() ?
    <Nav.Link active onClick={() => {history.push(`/{${opt[1].toLowerCase()}}`)}}>
      {opt[0]}{" "}{opt[1]}
    </Nav.Link>
    :
    <Nav.Link onClick={() => {history.push(`/${opt[1].toLowerCase()}`)}}>
      {opt[0]}{" "}{opt[1]}
    </Nav.Link>
    )
  })

  return (
    <Navbar fixed='bottom' bg='dark' variant='dark'>
      <Nav variant='tabs' className='ml-auto'>
        {links}
        {/* <Nav.Link onClick={() => {history.push('/calendar')}}>
          Calendar
        </Nav.Link>
        <Nav.Link onClick={() => {history.push('/shows')}}>
          Shows
        </Nav.Link>
        <Nav.Link onClick={() => {history.push('/artists')}}>
          Artists
        </Nav.Link>
        <Nav.Link onClick={() => {history.push('/venues')}}>
          Venues
        </Nav.Link> */}
      </Nav>
    </Navbar>
  );
}



export default ProducerOptions