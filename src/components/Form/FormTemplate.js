import { Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import validate from "../../utilities/validations";
import TextInput from "./TextInput";

function FormTemplate(props) {
  const [formData, setFormData] = useState(props.inputs);
  const texts = [];
  const select = [];

  checkTypes();

  function validation({ target: { name, value } }) {
    const targetObj = formData[name];
    const form = { ...formData };

    form[name].errors = validate(name, value, targetObj.validation);
    form[name].value = value;
    setFormData(form);
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (const input in formData) {
      validation({ target: { name: input, value: formData[input].value } });
    }
    checkNoErrors();
  }

  function checkTypes() {
    for (const input in formData) {
      if (
        formData[input].attr.type === "text" ||
        formData[input].attr.type === "password"
      )
        texts.push(formData[input]);
      else select.push(formData[input]);
    }
  }

  function checkNoErrors() {
    for (const input in formData) {
      if (formData[input].errors.length !== 0) {
        return "";
      }
    }
    props.func(formData);
  }

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center"
    >
      {texts.map((input, idx) => (
        <Row className="w-75 mb-2" key={idx}>
          <TextInput {...input} key={idx} func={validation}></TextInput>
        </Row>
      ))}
      <Button
        type="submit"
        className="col-12 w-75 m-4"
        variant="dark"
        id="submit"
      >
        {props.submit ? props.submit : "submit"}
      </Button>
    </Form>
  );
}

export default FormTemplate;
