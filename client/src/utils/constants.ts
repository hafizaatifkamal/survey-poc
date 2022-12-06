export const questionTypeOptions = [
  { label: "Text", value: "text" },
  { label: "MCQs", value: "mcq" },
  // { label: "Radiogroup", value: "radiogroup" },
  // { label: "Number", value: "number" },
  { label: "Boolean", value: "boolean" },
  { label: "Check-Box", value: "Mmcq" },
];

export enum ROLES {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const USER_KEY_CONSTANT = "vb_survey_user";

export const STORAGE_KEY_CONSTANT = "vb_survey_token";

export const currentUser = {
  username: "admin",
  role: "ADMIN",
  // username: "user",
  // role: "USER",
};
