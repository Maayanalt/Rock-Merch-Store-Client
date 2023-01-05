import inputTypes from "../../DAL/formData";
import FormTemplate from "../Form/FormTemplate";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { postLogin } from "../../DAL/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  async function validateUserInServer(formData) {
    const valid = await postLogin(
      formData.email.value,
      formData.password.value
    );
    if (valid) navigate("/");
    else toast.warn("wrong password or email, try again !");
  }

  return (
    <Container className="px-4 mb-5">
      <Alert key="1" variant="secondary" className="w-50">
        <Alert.Heading as="h2">Login</Alert.Heading>
        <hr />
        <FormTemplate
          inputs={{
            email: { ...inputTypes.email },
            password: { ...inputTypes.password },
          }}
          submit="Sign In"
          postToServer={validateUserInServer}
        ></FormTemplate>
        <hr />
        <Row className="justify-content-between">
          <Col lg={4}>
            <Link to="/forgot-password" className="link-in-login">
              Forgot Password?
            </Link>
          </Col>
          <Col lg={3}>
            <Link to="/register" className="link-in-login">
              New Member
            </Link>
          </Col>
        </Row>
      </Alert>
    </Container>
  );
}

export default Login;
