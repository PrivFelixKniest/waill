let authToken: null | string = null;

export const setAuthToken = (newAuthToken: string) => {
  authToken = newAuthToken;
};

export const getAuthToken = () => {
  return authToken;
};
