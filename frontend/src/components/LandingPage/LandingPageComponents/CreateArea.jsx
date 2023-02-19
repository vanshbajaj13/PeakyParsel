import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const CreateArea = (props) => {
  const customStyle = {
    display: "flex",
    flexDirection: "column",
    width: "55%",
    margin: "auto",
    // border: "2px solid red",
  };

  const [cardDetail, setCardDetail] = useState({
    parsel: "",
    owner: "",
    location: "",
    mobile: "",
    description: "",
    lastTime: "",
  });
  const [extended, setExtended] = useState("none");
  const [error, setError] = useState({ status: false, message: "" });
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "parsel" && value.length === 0) {
      setExtended("none");
    } else {
      setExtended("block");
    }
    setCardDetail((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  // function handleMoblieChange(event) {
  //   const { name, value } = event.target;
  //   new RegExp("[0-9]");
  //   if (value.match(/^d{10}$/)) {
  //     showError();
  //   } else {
  //     setCardDetail((prevValues) => {
  //       return {
  //         ...prevValues,
  //         [name]: value,
  //       };
  //     });
  //   }
  // }

  function addRequest(event) {
    var ifNull = false;
    Object.values(cardDetail).forEach((value) => {
      console.log(value);
      if (value === "" || value === undefined) {
        ifNull = true;
      }
    });
    if (!cardDetail.mobile.match(/^[6789]\d{9}$/)) {
      showError("enetr valid mobile number");
      console.log("number not valis");
    } else {
      if (!ifNull) {
        props.addRequest({
          ...cardDetail,
          status: { isAccepted: false, acceptedBy: "" },
        });
        setCardDetail({
          parsel: "",
          owner: "",
          location: "",
          mobile: "",
          description: "",
          lastTime: "",
        });
        setExtended("none");
      } else {
        showError("filed can not be empty");
      }
    }
    event.preventDefault();
  }

  function showError(message) {
    setError({ status: true, message: message });
    setTimeout(() => {
      setError({ status: false, message: "" });
    }, 2000);
  }

  return (
    <div
      style={{
        backgroundColor: "lightgray",
        padding: "20px 0 5px 0",
        width: "100%",
        zIndex: "2",
      }}
    >
      <Container>
        <form style={customStyle}>
          {error.status && <Alert variant="danger">{error.message}</Alert>}
          <OverlayTrigger
            key="parsel"
            placement="bottom"
            overlay={
              <Tooltip id="tooltip-bottom">
                Example <strong>Flipkart</strong>
              </Tooltip>
            }
          >
            <input
              onChange={handleChange}
              name="parsel"
              placeholder="Parcel Name"
              value={cardDetail.parsel}
              required
            />
          </OverlayTrigger>

          <OverlayTrigger
            key="Owner"
            placement="bottom"
            overlay={
              <Tooltip id="tooltip-bottom">
                <strong>Your Name</strong>
              </Tooltip>
            }
          >
          <input
            style={{ display: extended }}
            onChange={handleChange}
            name="owner"
            placeholder="Owner Name"
            value={cardDetail.owner}
            required
          />
          </OverlayTrigger>
          <OverlayTrigger
            key="mobile"
            placement="bottom"
            overlay={
              <Tooltip id="tooltip-mobile">
                Example <strong>8921234567</strong>
              </Tooltip>
            }
          >
            <input
              style={{ display: extended }}
              onChange={handleChange}
              name="mobile"
              placeholder="Your Contact number"
              type="number"
              value={cardDetail.mobile}
              required
            />
          </OverlayTrigger>
          <OverlayTrigger
            key="location"
            placement="bottom"
            overlay={
              <Tooltip id="tooltip-bottom">
                Example <strong>Gate 1a</strong>
              </Tooltip>
            }
          >
          <input
            style={{ display: extended }}
            onChange={handleChange}
            name="location"
            placeholder="Location of parcel"
            value={cardDetail.location}
            required
          />
          </OverlayTrigger>
          <OverlayTrigger
            key="LastTime"
            placement="bottom"
            overlay={
              <Tooltip id="tooltip-bottom">
                Example <strong>5:00</strong>
              </Tooltip>
            }
          >
          <input
            style={{ display: extended }}
            onChange={handleChange}
            name="lastTime"
            type="time"
            min="09:00"
            max="19:00"
            placeholder="last time"
            value={cardDetail.lastTime}
            required
          />
          </OverlayTrigger>
          <input
            style={{ display: extended }}
            onChange={handleChange}
            name="description"
            placeholder="write description"
            value={cardDetail.description}
          />
          <button style={{ display: extended }} onClick={addRequest}>
            Add
          </button>
        </form>
      </Container>
    </div>
  );
};

export default CreateArea;
