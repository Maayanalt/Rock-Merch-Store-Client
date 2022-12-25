import {
  faKey,
  faBuilding,
  faEarthAmericas,
  faLocationDot,
  faMapLocationDot,
  faPhone,
  faPerson,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import countries from "./countries.json";

const inputTypes = {
  email: {
    value: "",
    validation: {
      required: true,
      pattern: /(.+)@(.+){2,}\.(.+){2,}/,
    },
    errors: [],
    label: "Email",
    icon: faEnvelope,
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
      minLength: 8,
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
  newPassword: {
    value: "",
    validation: {
      required: true,
      minLength: 8,
    },
    errors: [],
    label: "New Password",
    icon: faKey,
    attr: {
      type: "password",
      placeholder: "New Password",
      name: "newPassword",
    },
  },
  passwordConfirm: {
    value: "",
    validation: {
      required: true,
      matchValue: {
        value: "",
        property: "password",
      },
    },
    errors: [],
    label: "Confirm Password",
    icon: faKey,
    attr: {
      type: "password",
      placeholder: "Confirm Password",
      name: "passwordConfirm",
    },
  },
  address: {
    value: "",
    validation: {
      required: true,
      minLength: 10,
    },
    errors: [],
    label: "Address",
    icon: faBuilding,
    attr: {
      type: "text",
      placeholder: "Street Address",
      name: "address",
    },
  },
  country: {
    value: "",
    validation: {
      required: true,
    },
    errors: [],
    label: "Country",
    icon: faEarthAmericas,
    attr: {
      name: "country",
    },
    defaultOption: "Select Country",
    options: countries.countryList,
    selectedOption: null,
  },
  city: {
    value: "",
    validation: {
      required: true,
      minLength: 2,
    },
    errors: [],
    label: "City",
    icon: faLocationDot,
    attr: {
      type: "text",
      placeholder: "City",
      name: "city",
    },
  },
  postalCode: {
    value: "",
    validation: {
      required: true,
      minLength: 5,
    },
    errors: [],
    label: "Postal Code",
    icon: faMapLocationDot,
    attr: {
      type: "text",
      placeholder: "Postal Code",
      name: "postalCode",
    },
  },
  phone: {
    value: "",
    validation: {
      required: true,
      pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    },
    errors: [],
    label: "Phone Number",
    icon: faPhone,
    attr: {
      type: "tel",
      placeholder: "Phone Number",
      name: "phone",
    },
  },
  firstName: {
    value: "",
    validation: {
      required: true,
      minLength: 2,
    },
    errors: [],
    label: "First Name",
    icon: faPerson,
    attr: {
      type: "text",
      placeholder: "First Name",
      name: "firstName",
    },
  },
  lastName: {
    value: "",
    validation: {
      required: true,
      minLength: 2,
    },
    errors: [],
    label: "Last Name",
    icon: faPerson,
    attr: {
      type: "text",
      placeholder: "Last Name",
      name: "lastName",
    },
  },
};

export default inputTypes;
