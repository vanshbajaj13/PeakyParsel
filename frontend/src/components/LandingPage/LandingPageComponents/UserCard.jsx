import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { CSSTransition } from "react-transition-group";

const UserCard = (props) => {
  const [hoverDel, setHoverDel] = useState(false);
  return (
    <div style={{ width: "75%", margin: "10px auto 19px auto " }}>
      <Card
        className="text-center"
        style={{ borderRadius: "1rem", backgroundColor: "transparent", }}
      >
        <Card.Header>
          {props.parsel} - {props.location}
            <button
              type="button"
              onClick={() => {
                props.deleteRequest(props.requestId);
              }}
              onMouseEnter={()=>{
                setHoverDel(true)
              }}
              onMouseLeave={()=>{
                setHoverDel(false)
              }}
              style={{
                // boxSizing: "border-box",
                height:"40px",
                position: "absolute",
                right: "0px",
                border:"0px",
                borderTopRightRadius:"1rem",
                backgroundColor:"red",
                width:"fit-content",
                top:"0px"
              }}
            >
            <CSSTransition
            in={hoverDel}
            timeout={3000}
            classNames="delete-btn"
          >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
                color="black"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
              </svg>
          </CSSTransition>
            </button>
        </Card.Header>
        <Card.Body>
          <Card.Title>{props.owner}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
        </Card.Body>
        {props.status.isAccepted ? (
          <div
            style={{
              width: "fit-content",
              backgroundColor: "rgb(75,191,115)",
              padding: "3px",
              margin: "5px auto",
              borderRadius: "10px",
            }}
          >
            {" "}
            Accepted by {props.status.acceptedBy}
          </div>
        ) : (
          <div
            style={{
              width: "fit-content",
              backgroundColor: "lightgray",
              padding: "3px",
              margin: "5px auto",
              borderRadius: "10px",
            }}
          >
            Status
          </div>
        )}

        <Card.Footer className="text-muted">{props.lastTime}</Card.Footer>
      </Card>
    </div>
  );
};

export default UserCard;
