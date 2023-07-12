const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  "Access-Control-Allow-Origin": "*",
};
export const responseInstance = (body = "", errorCode, message) => {
  const isLocal = process.env.AWS_SAM_LOCAL === "true";
  const response = {
    statusCode: errorCode,
    headers,
    body: isLocal ? JSON.stringify({ message, body }) : { message, ...body },
  };

  return response;
};
