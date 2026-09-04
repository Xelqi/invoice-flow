"use client";

import { useState } from "react";

import CustomerToolbar from "./CustomerToolbar";
import CustomerTable from "./CustomerTable";
import AddCustomerModal from "./AddCustomerModal";

type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "Active" | "Inactive";
};

type CreateCustomerResult = {
  success: boolean;
  error?: string;
};

type CustomersClientProps = {
  customers: Customer[];
  createCustomer: (formData: FormData) => Promise<CreateCustomerResult>;
};

export default function CustomersClient({
  customers,
  createCustomer,
}: CustomersClientProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      <CustomerToolbar
        search={search}
        setSearch={setSearch}
        onNewCustomer={() => setOpen(true)}
      />
      <CustomerTable customers={customers} search={search} />
      <AddCustomerModal
        createCustomer={createCustomer}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
