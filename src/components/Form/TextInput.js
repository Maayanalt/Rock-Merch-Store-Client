import { InputGroup, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorMessages from "./ErrorMessages";

function TextInput(props) {
  return (
    <Form.Group>
      <Form.Label className="m-1">{props.label}</Form.Label>
      <InputGroup>
        <InputGroup.Text id="inputGroupPrepend">
          <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
        </InputGroup.Text>
        <Form.Control
          required
          {...props.attr}
          defaultValue={props.value}
          className="shadow-none"
          onBlur={props.func}
        />
      </InputGroup>
      <ErrorMessages errors={props.errors}></ErrorMessages>
    </Form.Group>
  );
}

export default TextInput;
