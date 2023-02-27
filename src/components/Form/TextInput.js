import { InputGroup, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorMessages from "./ErrorMessages";

function TextInput({ label, icon, attr, func, errors, value }) {
  return (
    <Form.Group>
      <Form.Label className="m-1">{label}</Form.Label>
      <InputGroup>
        <InputGroup.Text id="inputGroupPrepend">
          <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        </InputGroup.Text>
        <Form.Control
          required
          {...attr}
          defaultValue={value}
          className="shadow-none"
          onBlur={func}
        />
      </InputGroup>
      <ErrorMessages errors={errors}></ErrorMessages>
    </Form.Group>
  );
}

export default TextInput;
