import {
  faUser,
  faKey,
  faBuilding,
  faEarthAmericas,
  faLocationDot,
  faMapLocationDot,
  faPhone,
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
      name: "code",
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
};

export default inputTypes;
