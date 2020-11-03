import * as errors from "./const";

const errorMessages = (error) => {
  console.log("error", error);
  switch (error) {
    case errors.EMAIL_EXISTS:
      return "Email exists";
    case errors.EMAIL_NOT_FOUND:
      return "Email not found";
    case errors.INVALID_PASSWORD:
      return "Invalid password";
    case errors.OPERATION_NOT_ALLOWED:
      return "Operation not found";
    case errors.TOO_MANY_ATTEMPTS_TRY_LATER:
      return "Too many attempts. Try later";
    case errors.USER_DISABLED:
      return "User disabled";
    case errors.INVALID_EMAIL:
      return "Invalid email";
    default:
      break;
  }
};

export default errorMessages;
