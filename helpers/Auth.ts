import { statusCodes } from "@react-native-google-signin/google-signin";

function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string) {
  return password.length >= 6;
}

export function validateAuthForm(values: { email: string; password: string }) {
  const errors: { [key: string]: string } = {};
  const i18nRoot = "auth:error";
  if (!validateEmail(values.email)) {
    errors.email = `${i18nRoot}.invalidEmail`;
  }
  if (!validatePassword(values.password)) {
    errors.password = `${i18nRoot}.smallPassword`;
  }
  return errors;
}

export function getFirebaseErrorMessage(error: string): {
  field: "email" | "password" | "all";
  message: string;
} {
  const i18nRoot = "auth:error";
  switch (error) {
    case "auth/invalid-credential":
      return { field: "all", message: `${i18nRoot}.invalidCredential` };

    case "auth/invalid-email":
      return { field: "email", message: `${i18nRoot}.invalidEmail` };

    case "auth/invalid-password":
      return { field: "password", message: `${i18nRoot}.invalidPassword` };

    case "auth/user-not-found":
      return { field: "all", message: `${i18nRoot}.userNotFound` };

    case "auth/wrong-password":
      return { field: "password", message: `${i18nRoot}.wrongPassword` };

    case "auth/email-already-in-use":
      return { field: "email", message: `${i18nRoot}.emailAlreadyInUse` };

    default:
      return { field: "all", message: `${i18nRoot}.error` };
  }
}

export function getGoogleApiErrorMessage(error: string) {
  const i18nRoot = "auth:error";
  const errorRecord = {
    [statusCodes.IN_PROGRESS]: `${i18nRoot}.inProgress`,
    [statusCodes.PLAY_SERVICES_NOT_AVAILABLE]: `${i18nRoot}.playServicesNotAvailable`,
    [statusCodes.SIGN_IN_CANCELLED]: `${i18nRoot}.signInCancelled`,
  };
  return errorRecord[error];
}
