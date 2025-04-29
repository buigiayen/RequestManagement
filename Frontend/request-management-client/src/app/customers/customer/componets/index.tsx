"use client";
import TableCustomer from "./tableCusmtomer";
import { CustomergGroupApi } from "@/services/CustomerGroups/CustomergGroup";
import { useQuery } from "@tanstack/react-query";

export default function IndexComponets() {
  const api = {
    customerGroup: useQuery({
      queryKey: ["customerGroups"],
      queryFn: () => CustomergGroupApi.GetAll(),
      enabled: true,
    }),
  };

  return (
    <div>
      <TableCustomer
        loading={api.customerGroup.isLoading}
        data={api.customerGroup.data?.data}
      ></TableCustomer>
    </div>
  );
}
