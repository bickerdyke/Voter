import * as yup from "yup";
import { setLocale } from "yup";

setLocale({
  // use constant translation keys for messages without values
  // use functions to generate an error object that includes the value from the schema
  mixed: {
    required: ({ path }) => ({
      key: "CreateSession.errors.required_field",
      values: { path: path },
    }),
    default: "CreateSession.errors.field_invalid",
  },

  string: {
    url: "CreateSession.errors.invalid_url",
    email: "CreateSession.errors.invalid_email",
    max: ({ max, path }) => ({
      key: "CreateSession.errors.field_too_large",
      values: { path: path, maximum: max },
    }),
    min: ({ min, path }) => ({
      key: "CreateSession.errors.field_too_small",
      values: { path: path, minimum: min },
    }),
    uuid: "invalid_GUID",
  },
  number: {
    max: ({ max, path }) => ({
      key: "CreateSession.errors.value_too_large",
      values: { path: path, maximum: max },
    }),
    min: ({ min, path }) => ({
      key: "CreateSession.errors.value_too_small",
      values: { path: path, minimum: min },
    }),
  },
});

export const sessionValidationSchema = yup.object().shape({
  sessiontitle: yup.string().required().trim().max(100),
  sessionsubtitle: yup.string().trim().max(150),
  sessiondescription: yup.string().trim().max(2000),
  sessionimgurl: yup.string().trim().url().max(2000),
  sessionquorum: yup.number().truncate().min(0).max(100),
  sessionvotingmode: yup.string().required().trim().max(30),
  sessionid: yup
    .string()
    .required()
    .trim()
    .min(5)
    .max(50)
    .matches("^[A-Za-z0-9+_!-]+$"), //#9 for firebase restrictions
});

export const votingValidationSchema = yup.object().shape({
  votingtitle: yup.string().required().trim().max(50),
  votingimgurl: yup.string().trim().url().max(2000),
  votingdescription: yup.string().trim().max(2000),
  votingid: yup.string().required().trim().min(5).max(50),
});

export const userValidationSchema = yup.object().shape({
  username: yup.string().required().trim().max(50),
  useremail: yup.string().trim().email().max(100),
  userimgurl: yup.string().trim().url().max(2000),
  userid: yup.string().required().trim().min(4).max(30),
});
