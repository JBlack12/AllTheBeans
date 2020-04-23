import React, { useState, useEffect } from "react";
import { Nav, Card } from "shards-react";
import LoginForm from "../Login/LoginForm";
import { useHistory } from "react-router-dom";
import NavItemLink from "./NavItemLink";

export default function Navbar({ AuthState }) {
  const [loginFormModal, setLoginFormModal] = useState(false);
  const [AvailableNavLinks, setNavLinks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const MapNavForUser = () => {
      const NavLinkObj = [
        { linkTxt: "Home", defaultFunc: () => handleClick("/") },
      ];
      switch (AuthState.isAuth.UserLevel) {
        case "Admin":
          return [
            ...NavLinkObj,
            { linkTxt: "Add Bean", defaultFunc: () => handleClick("/AddBean") },
            { linkTxt: "Logout", defaultFunc: () => logoutUser() },
          ];
        default:
          return [
            ...NavLinkObj,
            { linkTxt: "Login", defaultFunc: () => toggleLoginModal() },
          ];
      }
    };

    const toggleLoginModal = () => {
      setLoginFormModal(!loginFormModal);
    };

    const handleClick = (path) => {
      history.push(path);
    };

    const logoutUser = () => {
      AuthState.setAuth({
        UserLevel: "",
        Authenticated: false,
        Logout: true,
        Message: "User successfully logged out!",
      });
    };
    setNavLinks(MapNavForUser());
  }, [AuthState, loginFormModal, history]);

  return (
    <Card>
      <Nav className="navbar" justified>
        {AvailableNavLinks.map((objVal, index) => {
          return <NavItemLink key={index} linkValues={objVal}></NavItemLink>;
        })}
      </Nav>
      <LoginForm
        displayForm={{ loginFormModal, setLoginFormModal, AuthState }}
      ></LoginForm>
    </Card>
  );
}
