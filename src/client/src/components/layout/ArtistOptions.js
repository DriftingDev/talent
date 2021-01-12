import React from 'react';
import { useHistory } from 'react-router'
import { Nav, Navbar } from 'react-bootstrap';
import { BsPersonLinesFill } from 'react-icons/bs'
import { IoMdMicrophone } from 'react-icons/io'
import { GiFamilyHouse } from 'react-icons/gi'
import 'bootstrap/dist/css/bootstrap.min.css';

const ArtistOptions = () => {

  const history = useHistory()

  const options = [
    [<IoMdMicrophone />,"Shows"], 
    [<GiFamilyHouse />,"Venues"],
    [<BsPersonLinesFill />,"Team"]]

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
      <Nav  variant="tabs" className='ml-auto'>
        {links}
      </Nav>
    </Navbar>
  );
}



export default ArtistOptions