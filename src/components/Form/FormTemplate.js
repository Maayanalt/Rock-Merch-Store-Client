import { Row, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import validate from "../../utilities/validations";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

function FormTemplate({ inputs, submit, postToServer }) {
  const [formData, setFormData] = useState(inputs);
  const [text, setText] = useState([]);
  const [select, setSelect] = useState([]);

  useEffect(() => checkTypes(), []);

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
    const newText = [];
    const newSelect = [];
    for (const input in formData) {
      if (
        formData[input].attr.type === "text" ||
        formData[input].attr.type === "password" ||
        formData[input].attr.type === "tel"
      )
        newText.push(formData[input]);
      else newSelect.push(formData[input]);
    }
    setText(newText);
    setSelect(newSelect);
  }

  function checkNoErrors() {
    for (const input in formData) {
      if (formData[input].errors.length !== 0) {
        return "";
      }
    }
    postToServer(formData);
  }

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center"
    >
      {select.map((input, idx) => (
        <Row className="w-75 mb-2" key={idx}>
          <SelectInput {...input} key={idx} func={validation}></SelectInput>
        </Row>
      ))}
      {text.map((input, idx) => (
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
        {submit ? submit : "submit"}
      </Button>
    </Form>
  );
}

export default FormTemplate;
