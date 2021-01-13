import React from 'react';
import { useHistory } from 'react-router'
import { Nav, Navbar } from 'react-bootstrap';
import { BsCalendar, BsPersonLinesFill } from 'react-icons/bs'
import { IoMdMicrophone } from 'react-icons/io'
import { GiFamilyHouse } from 'react-icons/gi'

const ProducerOptions = () => {

  const history = useHistory()

  const options = [
    [<BsCalendar />, "Calendar"], 
    [<IoMdMicrophone />,"Shows"], 
    [<BsPersonLinesFill />,"Artists"], 
    [<GiFamilyHouse />,"Venues"]]

  const links = options.map((opt, i) => {
    return (
    history.location.pathname.slice(1, opt[1].length + 1) === opt[1].toLowerCase() ?
    <Nav.Link key={i} active onClick={() => {history.push(`/${opt[1].toLowerCase()}`)}}>
      {opt[0]}{" "}{opt[1]}
    </Nav.Link>
    :
    <Nav.Link key={i} onClick={() => {history.push(`/${opt[1].toLowerCase()}`)}}>
      {opt[0]}{" "}{opt[1]}
    </Nav.Link>
    )
  })

  return (
    <Navbar fixed='bottom' bg='dark' variant='dark'>
      <Nav variant='tabs' className='ml-auto'>
        {links}
      </Nav>
    </Navbar>
  );
}



export default ProducerOptions