import inputTypes from "../../DAL/formData";
import FormTemplate from "../Form/FormTemplate";
import { Alert, Container } from "react-bootstrap";
import { postLogin } from "../../DAL/api";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  async function validateUserInServer(formData) {
    const valid = await postLogin(
      formData.email.value,
      formData.password.value
    );
    if (valid) navigate("/");
    else alert("wrong password or email, try again !");
  }

  return (
    <Container className="px-4 mb-5">
      <Alert key="1" variant="secondary" className="w-50">
        <Alert.Heading as="h2">Login</Alert.Heading>
        <hr />
        <FormTemplate
          inputs={{
            email: inputTypes.email,
            password: inputTypes.password,
          }}
          submit="sign in"
          postToServer={validateUserInServer}
        ></FormTemplate>
      </Alert>
    </Container>
  );
}

export default Login;
