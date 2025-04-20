"use client";
import MainLayout from "@/components/layouts/MainLayout";
import TableCustomer from "./componets/tableCusmtomer";
import { CustomergGroupApi } from "@/services/CustomerGroups/CustomergGroup";

export default async function Customer() {
  const api = await CustomergGroupApi.GetAll();
  return (
    <MainLayout>
      <TableCustomer data={api.data} loading={false}></TableCustomer>
    </MainLayout>
  );
}
