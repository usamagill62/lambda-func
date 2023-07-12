import { requiredFields } from "../constants/requiredPayloadFields.mjs";

export const parseBody = (payload) => {
  const requestBody =
    process.env.AWS_SAM_LOCAL === "true" ? JSON.parse(payload.body) : payload;

  if (!requestBody) {
    return requiredFields;
  }

  const filteredArray = requiredFields.filter(
    (key) =>
      !Object.prototype.hasOwnProperty.call(requestBody, key) &&
      !requestBody[key]
  );

  if (filteredArray.length > 0) {
    return filteredArray;
  }

  return requestBody;
};
