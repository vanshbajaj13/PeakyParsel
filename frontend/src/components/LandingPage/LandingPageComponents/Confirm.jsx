import React from "react";
import Modal from "react-bootstrap/Modal";

const Confirm = (props) => {
  var newProps = {
    show : props.show,
    onHide : ()=>{props.onHide()}
  }

  return (
    <div>
      <Modal
        {...newProps}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.requestedcard.parsel} - {props.requestedcard.location}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.requestedcard.owner}</h4>
          <p>{props.requestedcard.description}</p>
          <p>{props.requestedcard.lastTime}</p>
        </Modal.Body>
        <Modal.Footer>
        <button onClick={()=>{props.confirmrequest(props.requestedcard.requestId,props.requestedcard.mobile)}} style={{width:"fit-content",backgroundColor:"rgb(75,191,115)",padding:"3px",margin:"5px auto",borderRadius:"10px"}} >
            Confirm
        </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Confirm;
