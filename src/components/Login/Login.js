import inputTypes from "../../DAL/formData";
import FormTemplate from "../Form/FormTemplate";
import { Alert, Container } from "react-bootstrap";
import "./Login.css";

function Login() {
  return (
    <Container className="px-4 mb-5">
      <Alert key="1" variant="secondary" className="w-50">
        <Alert.Heading as="h2">Login</Alert.Heading>
        <hr />
        <FormTemplate
          inputs={{
            username: inputTypes.username,
            password: inputTypes.password,
          }}
          submit="sign in"
        ></FormTemplate>
      </Alert>
    </Container>
  );
}

export default Login;
