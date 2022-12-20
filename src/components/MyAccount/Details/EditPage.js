import { Card } from "react-bootstrap";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { updateUserDetails } from "../../../DAL/api";
import inputTypes from "../../../DAL/formData";
import FormTemplate from "../../Form/FormTemplate";

function EditPage() {
  const user = useOutletContext();
  const { state } = useLocation();
  const navigate = useNavigate();
  const inputs = {};
  state.forEach((property) => {
    inputs[property] = { ...inputTypes[property] };
    if (
      property !== "password" ||
      property !== "passwordConfirm" ||
      property !== "newPassword"
    )
      inputs[property].value = user[property];
  });

  async function updateData(formData) {
    const changes = {};
    state.forEach((property) => {
      if (
        property !== "password" ||
        property !== "passwordConfirm" ||
        property !== "newPassword"
      ) {
        user[property] = formData[property].value;
      }
      changes[property] = formData[property].value;
    });
    if (await updateUserDetails(changes))
      navigate("/my-account/account-details");
  }

  return (
    <Card className="edit-form pt-3">
      <FormTemplate
        inputs={inputs}
        submit="Save Changes"
        postToServer={updateData}
      ></FormTemplate>
    </Card>
  );
}

export default EditPage;
