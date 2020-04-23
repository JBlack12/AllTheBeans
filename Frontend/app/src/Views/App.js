import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { Container, Col, Row, Card, Alert } from "shards-react";
import "../style/styling.css";
import Navbar from "../Components/NavBar/NavBar";
import MainView from "./MainView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isAuth, setAuth] = useState({
    UserLevel: "",
    Authenticated: false,
    Logout: false,
    Message: "",
  });

  function dismiss() {
    setAuth({
      ...isAuth,
      LoggedIn: false,
      Logout: false,
      Message: "",
    });
  }

  return (
    <Router>
      <Container>
        <Row className="pd-nav-top">
          <Col>
            <Navbar AuthState={{ isAuth, setAuth }}></Navbar>
          </Col>
        </Row>
        <Row className="pd-nav-top">
          <Col>
            <Alert
              theme="success"
              dismissible={() => dismiss()}
              open={
                isAuth.LoggedIn ? true : false || isAuth.Logout ? true : false
              }
            >
              {isAuth.Message}
            </Alert>
          </Col>
        </Row>
        <Row className="pd-title-top">
          <Col>
            <Card className="background-white solid-border">
              <Switch>
                <Route exact path="/AddBean">
                  <ProtectedRoute UserLevel={isAuth.UserLevel}></ProtectedRoute>
                </Route>
                <Route path="/">
                  <MainView></MainView>
                </Route>
              </Switch>
            </Card>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
