"use client";
import { useState } from "react";
import CustomerToolbar from "./CustomerToolbar";
import StatusBadge from "./StatusBadge";

type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  status: "Active" | "Inactive";
};

type CustomerTableProps = {
  customers: Customer[];
  search: string;
};

export default function CustomerTable({
  customers,
  search,
}: CustomerTableProps) {
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.company.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="min-w-full">
          <thead className="bg-slate-800/50">
            <tr className="text-left text-sm text-slate-400">
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  No customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t border-slate-800 transition-colors hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{customer.name}</p>
                      <p className="text-sm text-slate-400">{customer.email}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {customer.company}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm text-slate-400 hover:text-white">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
