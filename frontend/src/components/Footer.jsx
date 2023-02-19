import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  const customStyle = {
    color: 'white',
    alignItems: "center",
    display: "flex",
    width: "100%",
    maxWidth: '100% ',
    backgroundColor: "black",
    position: "fixed",
    bottom: "0px",
    justifyContent: "space-around",
  };

const year = new Date().getFullYear();

  return (
    <footer>
      <Container style={ customStyle }>
        <Row>
          <Col className="text-center">
            <p>copyright © {year}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
