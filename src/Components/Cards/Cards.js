import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

export const BenefitCards = () => {
  return <Card></Card>;
};

const Card = () => {
  return (
    <MDBCard style={{ maxWidth: "15rem", maxHeight: "21rem" }}>
      <MDBCardImage
        src="https://i.pinimg.com/originals/86/09/64/860964688d449da06d61c6cc4e9b931a.jpg"
        position="top"
        alt="..."
      />
      <MDBCardBody>
        <MDBCardTitle>Playstation</MDBCardTitle>
        <MDBCardText>full pack gaming console</MDBCardText>
        <MDBBtn href="#">purchase</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
};
