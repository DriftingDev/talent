import { Container, Row, Col, Spinner } from "react-bootstrap"


const Loading = () => {
  return (
    <Container bg='dark' fluid style={{ paddingLeft: 0, paddingRight: 0, height: "100vh" }}>
      <Row className="justify-content-center">

      <Spinner animation="border" variant="light"/>
      </Row>
    </Container>
  )
}

export default Loading