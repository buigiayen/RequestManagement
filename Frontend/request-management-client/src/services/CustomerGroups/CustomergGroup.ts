import axiosInstance from "../connection";

export const CustomergGroupApi = {
  GetAll: () => axiosInstance.get<CUSTOMERGROUPS.GROUPS[]>("/api/CustomerGroups"),
  GetByID: (id: number) =>
    axiosInstance.get<CUSTOMERGROUPS.GROUPS>(`/api/CustomerGroups/${id}`),
  PostCustomerGroup: (body: CUSTOMERGROUPS.CreateGroup) =>
    axiosInstance.post<CUSTOMERGROUPS.GROUPS>("/api/CustomerGroups", body),
};
