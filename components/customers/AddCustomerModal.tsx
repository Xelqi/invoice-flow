"use client";

import { useState } from "react";
import { type ChangeEvent } from "react";
import { type SubmitEvent } from "react";

export default function AddCustomerModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value, // use square brackets to evaluate expression and use its value so it becomes company: e.target.value
    });
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    console.log(form);

    // Reset fields after submission
    setForm({
      name: "",
      email: "",
      company: "",
    });
    // Close form
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        + Add Customer
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-lg border border-slate-700 bg-slate-900 p-6"
        >
          <h2 className="text-xl font-bold text-white">New Customer</h2>

          <input
            name="name"
            type="text"
            placeholder="Customer name"
            value={form.name}
            onChange={handleInputChange}
            className="mt-4 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleInputChange}
            className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400"
          />
          <input
            name="company"
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={handleInputChange}
            className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400"
          />
          <button
            type="submit"
            className="mt-4 rounded bg-green-600 px-3 py-2 text-white"
          >
            Save Customer
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 rounded bg-slate-700 px-3 py-2 text-white"
          >
            Close
          </button>
        </form>
      )}
    </>
  );
}
