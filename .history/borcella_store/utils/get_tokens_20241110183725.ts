export const getGuestToken = () => {
  let guestToken = localStorage.getItem("guest_token");

  if (!guestToken) {
    guestToken = `guest_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    localStorage.setItem("guest_token", guestToken);
  }

  return guestToken;
};
