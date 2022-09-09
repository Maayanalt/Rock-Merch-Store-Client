import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

const inputTypes = {
  email: {
    value: "",
    validation: {
      required: true,
      pattern: /(.+)@(.+){2,}\.(.+){2,}/,
    },
    errors: [],
    label: "Email",
    icon: faUser,
    attr: {
      type: "text",
      placeholder: "Enter Email",
      name: "email",
    },
  },
  password: {
    value: "",
    validation: {
      required: true,
      pattern: "",
    },
    errors: [],
    label: "Password",
    icon: faKey,
    attr: {
      type: "password",
      placeholder: "Enter Password",
      name: "password",
    },
  },
};

export default inputTypes;
