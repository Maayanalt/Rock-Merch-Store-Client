import { Alert, Container } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { postResetPass } from "../../DAL/api";
import inputTypes from "../../DAL/formData";
import FormTemplate from "../Form/FormTemplate";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  async function postToServer(formData) {
    const valid = await postResetPass(formData.newPassword.value, token);
    if (valid) {
      toast.success("Your password has been successfully changed");
      navigate("/login");
    } else {
      navigate("/forgot-password");
    }
  }

  return (
    <Container className="px-4 mb-5">
      <Alert key="1" variant="secondary" className="w-50">
        <Alert.Heading as="h2">Reset Your Password</Alert.Heading>
        <hr />
        <FormTemplate
          inputs={{
            newPassword: { ...inputTypes.newPassword },
            passwordConfirm: { ...inputTypes.passwordConfirm },
          }}
          submit="Reset password"
          postToServer={postToServer}
        ></FormTemplate>
      </Alert>
    </Container>
  );
}

export default ResetPassword;
