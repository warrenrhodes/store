/**
 * Generates a random guest token that is persisted in local storage.
 *
 * A guest token is used to identify a user who has not yet logged in. It is
 * used to associate the user's cart and wishlist with their account when they do
 * log in.
 *
 * @returns {string} the guest token
 */
export const getGuestToken = () => {
  let guestToken = localStorage.getItem("guest_token");

  if (!guestToken) {
    guestToken = `guest_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 11)}`;
    localStorage.setItem("guest_token", guestToken);
  }

  return guestToken;
};
