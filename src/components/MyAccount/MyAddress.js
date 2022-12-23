import { useNavigate, useOutletContext } from "react-router-dom";
import { updateUserDetails } from "../../DAL/api";
import FormTemplate from "../Form/FormTemplate";
import inputTypes from "../../DAL/formData";
import { Card } from "react-bootstrap";

function MyAddress() {
  const user = useOutletContext();
  const navigate = useNavigate();
  const inputs = {
    address: { ...inputTypes.address },
    country: { ...inputTypes.country, selectedOption: user.country },
    city: { ...inputTypes.city },
    postalCode: { ...inputTypes.postalCode },
    phone: { ...inputTypes.phone },
  };

  for (const property in inputs) {
    inputs[property].value = user[property];
  }

  async function updateData(formData) {
    const changes = {};
    for (const property in formData) {
      user[property] = formData[property].value;
      changes[property] = formData[property].value;
    }
    if (await updateUserDetails(changes))
      navigate("/my-account/account-details");
  }

  return (
    <Card id="address">
      <Card.Header as="h5">My Address</Card.Header>
      <Card.Body className="py-3">
        <FormTemplate
          inputs={inputs}
          submit="Save Changes"
          postToServer={updateData}
        ></FormTemplate>
      </Card.Body>
    </Card>
  );
}

export default MyAddress;
