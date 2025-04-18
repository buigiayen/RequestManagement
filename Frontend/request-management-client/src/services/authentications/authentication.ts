import axiosInstance from "../connection";

export const authen = {
  login: ({ body }: { body: AUTHENTICATION.LOGIN_REQUEST }) =>
    axiosInstance.post<AUTHENTICATION.LOGIN_RESPONSE>("/api/Auth/login", body),
  register: ({ body }: { body: AUTHENTICATION.REGISTER_REQUEST }) =>
    axiosInstance.post<BASE_MESSAGE.SUCCESS>("/api/Auth/register", body),
};
