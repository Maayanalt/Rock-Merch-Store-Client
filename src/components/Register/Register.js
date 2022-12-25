import { Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormTemplate from "../Form/FormTemplate";
import inputTypes from "../../DAL/formData";
import { createUser } from "../../DAL/api";

function Register() {
  const navigate = useNavigate();

  async function postToServer(formData) {
    const valid = await createUser(
      formData.firstName.value,
      formData.lastName.value,
      formData.email.value,
      formData.password.value
    );
    if (valid) navigate("/login");
  }

  return (
    <Container className="px-4 mb-5">
      <Alert key="1" variant="secondary" className="w-50">
        <Alert.Heading as="h2">Register</Alert.Heading>
        <hr />
        <FormTemplate
          inputs={{
            firstName: { ...inputTypes.firstName },
            lastName: { ...inputTypes.lastName },
            email: { ...inputTypes.email },
            password: { ...inputTypes.password },
            passwordConfirm: { ...inputTypes.passwordConfirm },
          }}
          submit="Sign Up"
          postToServer={postToServer}
        ></FormTemplate>
      </Alert>
    </Container>
  );
}

export default Register;
