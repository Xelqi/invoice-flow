"use client";

import { useEffect, useState } from "react";
import { type ChangeEvent } from "react";
import { type SubmitEvent } from "react";

type CustomerForm = {
  id: string;
  name: string;
  email: string;
  company: string;
};

type CreateCustomerResult = {
  success: boolean;
  error?: string;
};

type Status = "idle" | "saving" | "error" | "success";

type AddCustomerModalProps = {
  createCustomer: (formData: FormData) => Promise<CreateCustomerResult>;
  open: boolean;
  setOpen: (open: boolean) => void;
  customer?: CustomerForm;
};

export default function AddCustomerModal({
  createCustomer,
  open,
  setOpen,
  customer,
}: AddCustomerModalProps) {
  const [form, setForm] = useState({
    name: customer?.name ?? "", // ? if customer undefined dont crash then use ?? if null or undefined fallback to "" so we grab details if there for editing
    email: customer?.email ?? "",
    company: customer?.company ?? "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name,
        email: customer.email,
        company: customer.company,
      });
    } else {
      setForm({
        name: "",
        email: "",
        company: "",
      });
    }

    setStatus("idle");
    setErrorMessage("");
  }, [customer, open]); // when new customer selected or modal opened

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value, // use square brackets to evaluate expression and use its value so it becomes company: e.target.value
    });
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setStatus("saving");
    setErrorMessage("");
    // Development only - lets us see the spinner
    await new Promise((resolve) => setTimeout(resolve, 1500));
    e.preventDefault();

    const formData = new FormData();
    if (customer) {
      formData.append("id", customer.id);
    }
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("company", form.company);

    const result = await createCustomer(formData);

    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error ?? "Something went wrong.");
      return;
    }

    setForm({
      name: "",
      email: "",
      company: "",
    });

    setStatus("success"); // keep ui open
  }

  function resetModal() {
    setForm({
      name: "",
      email: "",
      company: "",
    });

    setStatus("idle");
    setErrorMessage("");
  }

  if (!open) return null;
  if (status === "saving") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60">
        <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-violet-500" />

          <h2 className="mt-4 text-xl font-bold text-white">
            Creating customer...
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Please wait while we save the customer.
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60">
        <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
            <svg
              className="h-8 w-8 text-green-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white">
            Customer Created!
          </h2>

          <p className="mt-2 text-slate-400">
            The customer has been successfully saved to the database.
          </p>

          <div className="mt-8 flex gap-3">
            <button
              onClick={resetModal}
              className="flex-1 rounded-lg bg-violet-600 py-2 font-medium text-white hover:bg-violet-500"
            >
              Add Another
            </button>

            <button
              onClick={() => {
                resetModal();
                setOpen(false);
              }}
              className="flex-1 rounded-lg bg-slate-700 py-2 font-medium text-white hover:bg-slate-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        resetModal();
        setOpen(false);
      }}
      className="fixed inset-0 flex items-center justify-center bg-black/60"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-white">
          {customer ? "Edit Customer" : "New Customer"}
        </h2>
        {status === "error" && (
          <div className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
            <p className="text-sm text-red-300">{errorMessage}</p>
          </div>
        )}

        <input
          name="name"
          type="text"
          required
          placeholder="Customer name"
          value={form.name}
          onChange={handleInputChange}
          className="mt-4 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          value={form.email}
          onChange={handleInputChange}
          className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400"
        />
        <input
          name="company"
          type="text"
          required
          placeholder="Company"
          value={form.company}
          onChange={handleInputChange}
          className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400"
        />
        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-violet-600 py-2 font-medium text-white hover:bg-violet-500"
          >
            {customer ? "Save Changes" : "Add Customer"}
          </button>
          <button
            type="button"
            onClick={() => {
              resetModal();
              setOpen(false);
            }}
            className="flex-1 rounded-lg bg-slate-700 py-2 font-medium text-white hover:bg-slate-600"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
