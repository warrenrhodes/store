/**
 * Returns a user-friendly error message based on the provided authentication error code.
 *
 * @param {string} errorCode - The authentication error code.
 * @return {string} A descriptive error message corresponding to the error code.
 * If the error code is not recognized a generic error message is returned.
 */
export function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: { [key: string]: string } = {
    "auth/invalid-email": "Invalid email address",
    "auth/email-already-in-use": "Email already in use",
    "auth/network-request-failed": "Network request failed",
    "auth/user-not-found": "User not found",
    "auth/wrong-password": "Wrong password",
    "auth/too-many-requests": "Too many requests",
    "auth/weak-password": "Weak password",
    "auth/popup-closed-by-user": "Popup closed by user",
    "auth/operation-not-allowed": "Operation not allowed",
    "auth/account-exists-with-different-credential":
      "Account exists with different credential",
    "auth/invalid-credential": "Invalid credential",
    "auth/user-disabled": "User disabled",
    "auth/requires-recent-login": "Requires recent login",
    "auth/provider-already-linked": "Provider already linked",
    "auth/invalid-verification-code": "Invalid verification code",
    "auth/invalid-verification-id": "Invalid verification ID",
    "auth/captcha-check-failed": "Captcha check failed",
    "auth/failed-to-add-user": "Failed to add user",
  };

  return (
    errorMessages[errorCode] || "An unexpected error occurred. Please try again"
  );
}
