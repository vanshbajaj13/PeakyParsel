import React from "react";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

const Header = () => {
  const navigate = useNavigate();
  var userName;
  if (window.localStorage.getItem("userInfo")) {
    const email = JSON.parse(window.localStorage.getItem("userInfo")).email;
    userName = email.substr(0, email.indexOf("@"));
  } else {
    userName = "user name";
  }
  function logout() {
    window.localStorage.removeItem("userInfo");
    navigate("/signin");
  }

  return (
    <div style={{position:"sticky",width:"100%",zIndex:"5",top:"0"}}>
      <Navbar bg="black" variant="dark">
        <Container>
          <Navbar.Brand>
          <Typewriter 
        options={{loop:true}}
        onInit={(typewriter) => {
          typewriter

            .deleteAll()
            .typeString("Peaky Parcel")
            .pauseFor(1000)
            .typeString("...")
            .deleteAll()
            .typeString("Add your request")
            .deleteAll()
            .typeString("...")
            .deleteAll()
            .typeString("Request accepted")
            .deleteAll()
            .typeString("Contact through Whatsapp")
            .start();
        }}
      />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={userName}
                menuVariant="dark"
              >
                <NavDropdown.Item>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      widh: "100%",
                      color: "white",
                    }}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </NavDropdown.Item>
              </NavDropdown>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
