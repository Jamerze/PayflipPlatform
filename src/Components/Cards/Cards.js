import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Container, Row, Col } from "reactstrap";
export const BenefitCards = () => {
  return (
    <Container>
      <Row md={3}>
        <Col>
          <Card></Card>
        </Col>
        <Col>
          {" "}
          <Card></Card>
        </Col>
        <Col>
          <Card></Card>
        </Col>
      </Row>
      <br></br>
    </Container>
  );
};

const Card = () => {
  return (
    <MDBCard
      alignment="center"
      style={{ maxWidth: "15rem", maxHeight: "21rem" }}
    >
      <MDBCardImage
        src="https://i.pinimg.com/originals/86/09/64/860964688d449da06d61c6cc4e9b931a.jpg"
        position="top"
        alt="..."
      />
      <MDBCardBody>
        <MDBCardTitle>
          Playstation{" "}
          {<span style={{ fontSize: 15, color: "green" }}>$200</span>}
        </MDBCardTitle>

        <MDBCardText>full pack gaming console</MDBCardText>
        <button
          type="submit"
          className="btn bg-redpayflip text-white w-80 mt-1 mb-0"
          disabled={false}
        >
          Purchase
        </button>
      </MDBCardBody>
    </MDBCard>
  );
};
