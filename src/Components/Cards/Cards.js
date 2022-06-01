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
          <Card
            name="Playstation"
            cost="$200"
            desc="full pack gaming consol"
            src="https://i.pinimg.com/originals/86/09/64/860964688d449da06d61c6cc4e9b931a.jpg"
          ></Card>
        </Col>
        <Col>
          {" "}
          <Card
            name="Iphone x"
            cost="$100"
            desc="full pack phone prduct"
            src="https://media.idownloadblog.com/wp-content/uploads/2017/10/iphone-8-mockup-downloadable.jpg"
          ></Card>
        </Col>
        <Col>
          <Card
            name="Bike"
            cost="$50"
            desc="high quality bike "
            src="https://static.vecteezy.com/system/resources/previews/000/268/319/non_2x/vector-bicycle-illustration.jpg"
          ></Card>
        </Col>
      </Row>
      <br></br>
    </Container>
  );
};

const Card = (props) => {
  return (
    <MDBCard
      alignment="center"
      style={{ maxWidth: "15rem", maxHeight: "22rem" }}
    >
      <MDBCardImage src={props.src} position="top" alt="..." />
      <MDBCardBody>
        <MDBCardTitle>
          {props.name + " "}
          {<span style={{ fontSize: 15, color: "green" }}>{props.cost}</span>}
        </MDBCardTitle>

        <MDBCardText>{props.desc}</MDBCardText>
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
