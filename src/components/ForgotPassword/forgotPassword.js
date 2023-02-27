import { Alert, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { postForgotPass } from "../../DAL/api";
import inputTypes from "../../DAL/formData";
import FormTemplate from "../Form/FormTemplate";

function ForgotPassword() {
  async function postToServer(formData) {
    await postForgotPass(formData.email.value);
    toast.success("Reset password link sent");
  }

  return (
    <Container className="px-lg-4 mb-lg-5">
      <Alert key="1" variant="secondary" className="w-lg-50">
        <Alert.Heading as="h2">Forgot Password</Alert.Heading>
        <hr />
        <p className="p-2">
          Type in your email address below and we'll send you an email with
          instructions on how to create a new password
        </p>
        <FormTemplate
          inputs={{
            email: { ...inputTypes.email },
          }}
          submit="Reset password"
          postToServer={postToServer}
        ></FormTemplate>
      </Alert>
    </Container>
  );
}

export default ForgotPassword;
