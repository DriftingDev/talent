import { Container, Spinner } from "react-bootstrap"


const Loading = () => {
  return (
    <Container bg='dark' fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Spinner animation="border" variant="light"/>
    </Container>
  )
}

export default Loading