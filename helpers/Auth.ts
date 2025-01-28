function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string) {
  return password.length >= 6;
}

export function validateAuthForm(values: { email: string; password: string }) {
  const errors: { [key: string]: string } = {};
  if (!validateEmail(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!validatePassword(values.password)) {
    errors.password = "Password must be at least 6 characters long";
  }
  return errors;
}

export function getFirebaseErrorMessage(error: string): {
  field: "email" | "password" | "all";
  message: string;
} {
  console.log({ error });
  switch (error) {
    case "auth/invalid-credential":
      return { field: "all", message: "Invalid email or password" };

    case "auth/invalid-email":
      return { field: "email", message: "Invalid email address" };

    case "auth/invalid-password":
      return { field: "password", message: "Invalid password" };

    case "auth/user-not-found":
      return { field: "all", message: "User not found" };

    case "auth/wrong-password":
      return { field: "password", message: "Wrong password" };

    case "auth/email-already-in-use":
      return { field: "email", message: "Email already in use" };

    default:
      return { field: "all", message: error };
  }
}
