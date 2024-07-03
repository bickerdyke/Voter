import * as yup from "yup";
import { setLocale } from "yup";

export const sessionValidationSchema = yup.object().shape({
  sessiontitle: yup.string().required().trim().max(50),
  sessionsubtitle: yup.string().trim().max(150),
  sessiondescription: yup.string().trim().max(2000),
  sessionimgurl: yup.string().trim().url(),
  sessionquorum: yup.number().truncate().min(0).max(100),
  sessionid: yup.string().required().trim().min(5).max(50),
});

export const votingValidationSchema = yup.object().shape({
  votingtitle: yup.string().required().trim().max(50),
  votingimgurl: yup.string().trim().url(),
  votingdescription: yup.string().trim().max(2000),
  votingid: yup.string().required().trim().min(5).max(50),
});

export const userValidationSchema = yup.object().shape({
  username: yup.string().required().trim().max(50),
  useremail: yup.string().trim().email(),
  userimgurl: yup.string().trim().url(),
  userid: yup.string().required().trim().min(4).max(30),
});

setLocale({
  // use constant translation keys for messages without values
  mixed: {
    required: "required_field",
    default: "field_invalid",
    url: "invalid_url",
    email: "invalid_email",
  },
  // use functions to generate an error object that includes the value from the schema
  string: {
    min: ({ min }) => ({ key: "field_too_short", values: { min } }),
    max: ({ max }) => ({ key: "field_too_large", values: { max } }),
  },
});
