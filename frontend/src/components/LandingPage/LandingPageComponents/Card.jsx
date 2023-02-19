import React from "react";
// import { Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const card = (props) => {
  return (
    <div style={{ width: "75%", margin: "10px auto 19px auto " }}>
      <Card
        className="text-center"
        style={{ borderRadius: "1rem", backgroundColor: "transparent" }}
      >
        <Card.Header>
          {props.parsel} - {props.location}
        </Card.Header>
        <Card.Body>
          <Card.Title>{props.owner}</Card.Title>
          <Card.Text>{props.description.substr(0, 100)}</Card.Text>
          {props.status.isAccepted ? 
          <Button
            style={{ borderRadius: "8px" }}
            variant="success"
            size="sm"
            disabled
            onClick={() => {
              props.acceptRequest(props.requestId);
            }}
          >
            Accepted by someone
          </Button>
          :
          <Button
            style={{ borderRadius: "8px" }}
            variant="success"
            size="sm"
            onClick={() => {
              props.acceptRequest(props.requestId);
            }}
          >
            Accept
          </Button>

           }
        </Card.Body>
        <Card.Footer className="text-muted">{props.lastTime}</Card.Footer>
      </Card>
    </div>
  );
};

export default card;
