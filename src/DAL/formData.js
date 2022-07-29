import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

const inputTypes = {
  username: {
    value: "",
    validation: {
      required: true,
      minLength: 2,
    },
    errors: [],
    label: "Username",
    icon: faUser,
    attr: {
      type: "text",
      placeholder: "Enter Username",
      name: "username",
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
