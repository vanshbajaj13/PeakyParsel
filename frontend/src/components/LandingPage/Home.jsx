import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import CreateArea from "./LandingPageComponents/CreateArea";
import Card from "./LandingPageComponents/Card";
import UserCard from "./LandingPageComponents/UserCard";
import Division from "./LandingPageComponents/Division";
import Confirm from "./LandingPageComponents/Confirm";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Spinner } from "react-bootstrap";

const Home = () => {
  // var date = new Date.getUTCDate();
  // console.log(date.getUTCDate());
  const naviagate = useNavigate();
  const [userLogedIn, setUserLogedIn] = useState(false);
  const [cardInfo, setcardInfo] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({});
  const [searchPop, setSearchPop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requestedCard, setRequestedCard] = useState({
    userId: "",
    user: "",
    regNo: "",
    mobile: "",
    requestd: [
      {
        parsel: "",
        location: "",
        id: "",
        mobile: "",
        description: "",
        lastTime: "",
      },
    ],
  });

  const fetchRequests = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    setLoading(true);
    await axios
      .get("requests", config)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setcardInfo(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error) {
          window.localStorage.clear();
          naviagate("/sigin");
        }
      });
  };
  useEffect(() => {
    if (userLogedIn) {
      fetchRequests();
    }
    // eslint-disable-next-line
  }, [userLogedIn]);

  useEffect(() => {
    function isUserLogedIn() {
      if (window.localStorage.getItem("userInfo")) {
        setUserLogedIn(true);
        setUser(JSON.parse(window.localStorage.getItem("userInfo")));
      } else {
        naviagate("/signin");
        setUserLogedIn(false);
      }
    }
    isUserLogedIn();
  }, [userLogedIn, naviagate]);

  function addRequest(card) {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const email = JSON.parse(window.localStorage.getItem("userInfo")).email;
    card.requestId = uuidv4();
    card.email = email;
    card.time = Date.now();
    axios
      .post("requests", card, config)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setcardInfo((prevValues) => {
            return [...prevValues, card];
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error) {
          window.localStorage.clear();
          naviagate("/sigin");
        }
      });
  }

  function acceptRequest(id) {
    var tempCard = cardInfo.filter((card) => {
      return card.requestId === id;
    });
    setRequestedCard(tempCard[0]);
    setModalShow(true);
  }

  function deleteRequest(requestId) {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .delete(`requests/${requestId}`, config)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          setcardInfo((prevValues) => {
            return prevValues.filter((card) => {
              return card.requestId !== requestId;
            });
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error) {
          window.localStorage.clear();
          naviagate("/sigin");
        }
      });
  }

  function confirmRequest(requestId, mobile) {
    setLoading(true);
    const email = JSON.parse(window.localStorage.getItem("userInfo")).email;
    const userName = email.substr(0, email.indexOf("@"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .patch(
        `requests/${requestId}`,
        JSON.stringify({
          acceptedBy: userName,
        }),
        config
      )
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          console.log("successfully accepted");
          fetchRequests();
          window.open(
            `https://api.whatsapp.com/send/?phone=91${mobile}&text&type=phone_number`,
            "noreferrer"
          );
        } else {
          console.log("some errror");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (error) {
          window.localStorage.clear();
          naviagate("/sigin");
        }
      });
  }

  // event listners

  var oldScrollY = window.scrollY;
  window.addEventListener("scroll", (event) => {
    var scrollDiff = oldScrollY - window.scrollY;
    if (scrollDiff > 7) {
      console.log("scroll up");
      setSearchPop(true);
    } else if (scrollDiff < -7) {
      console.log("scroll down");
      setSearchPop(false);
    }
    oldScrollY = window.scrollY;
  });

  return (
    <>
      <CSSTransition
        in={searchPop}
        timeout={3000}
        classNames="createRequestBox"
      >
        <CreateArea addRequest={addRequest} />
      </CSSTransition>
      <div style={{ height: "55px" }}></div>
      {loading && (
        <div style={{ margin: "auto", width: "fit-content" }}>
          <Spinner />
        </div>
      )}
      {/* eslint-disable-next-line */}
      {cardInfo.map((item) => {
        if (item.email === user.email) {
          return (
            <UserCard
              owner={item.owner}
              parsel={item.parsel}
              key={item.requestId}
              requestId={item.requestId}
              location={item.location}
              description={item.description}
              lastTime={item.lastTime}
              status={item.status}
              deleteRequest={deleteRequest}
            />
          );
        }
      })}
      <Division />
      <Confirm
        confirmrequest={confirmRequest}
        requestedcard={requestedCard}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      {/* eslint-disable-next-line */}
      {cardInfo.map((item) => {
        if (item.email !== user.email) {
          return (
            <Card
              owner={item.owner}
              parsel={item.parsel}
              key={item.requestId}
              requestId={item.requestId}
              location={item.location}
              description={item.description}
              lastTime={item.lastTime}
              status={item.status}
              acceptRequest={acceptRequest}
            />
          );
        }
      })}
      <div style={{ height: "5vh" }}></div>
    </>
  );
};

export default Home;
