import { InputGroup, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorMessages from "./ErrorMessages";

function SelectInput({
  label,
  icon,
  attr,
  func,
  errors,
  options,
  defaultOption,
}) {
  return (
    <Form.Group>
      <Form.Label className="m-1">{label}</Form.Label>
      <InputGroup>
        <InputGroup.Text id="inputGroupPrepend">
          <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        </InputGroup.Text>
        <Form.Select required className="shadow-none" onBlur={func} {...attr}>
          <option value="">{defaultOption}</option>
          {options.map((option, idx) => (
            <option value={option} key={idx}>
              {option}
            </option>
          ))}
        </Form.Select>
      </InputGroup>
      <ErrorMessages errors={errors}></ErrorMessages>
    </Form.Group>
  );
}

export default SelectInput;
