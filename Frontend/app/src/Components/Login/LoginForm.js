import React, { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormInput,
  FormGroup,
} from "shards-react";
import { LoginApiFunctions } from "../../functions/LoginApiFunctions";

export default function LoginForm({ displayForm }) {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });

  const [alertState, setAlertState] = useState({
    display: false,
    message: "",
  });

  function toggle() {
    displayForm.setLoginFormModal(!displayForm.loginFormModal);
  }

  function handleChange(event) {
    const target = event.target;
    setLoginCredentials({
      ...loginCredentials,
      [target.name]: target.value,
    });
  }

  async function handleSubmit() {
    const result = await new LoginApiFunctions().login(loginCredentials);
    if (result.isSuccess) {
      displayForm.AuthState.setAuth({
        UserLevel: "Admin",
        Authenticated: true,
        LoggedIn: true,
        Message: "User successfully logged in!",
      });
      toggle();
    } else {
      setAlertState({
        display: true,
        message: "Unsuccessful login, please try again!",
      });
    }
  }

  return (
    <Modal open={displayForm.loginFormModal} toggle={() => toggle()}>
      <ModalHeader>Login</ModalHeader>
      <ModalBody>
        <Form>
          <Alert fade theme="danger" open={alertState.display}>
            {alertState.message}
          </Alert>
          <FormGroup>
            <label>Username</label>
            <FormInput
              valid={loginCredentials.username !== ""}
              name="username"
              placeholder="Username"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <label>Password</label>
            <FormInput
              valid={loginCredentials.password !== ""}
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
        </Form>
        <Button
          id="loginBtn"
          disabled={
            loginCredentials.username === "" || loginCredentials.password === ""
          }
          block
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </ModalBody>
    </Modal>
  );
}
