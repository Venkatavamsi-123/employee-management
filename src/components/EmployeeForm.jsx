import React, { useState, useEffect } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline'; // Install @heroicons/react

const EmployeeForm = ({ onSubmit, editingEmployee }) => {
  const [form, setForm] = useState({ name: '', email: '', department: '' });

  useEffect(() => {
    if (editingEmployee) {
      setForm(editingEmployee);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: '', email: '', department: '' });
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-6">
      <div className="bg-white shadow-xl rounded-3xl border border-gray-200 p-8 space-y-6 transition-all duration-300">
        <div className="flex items-center justify-center gap-2">
          <UserPlusIcon className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-extrabold text-gray-800">
            {editingEmployee ? 'Update' : 'Add'} Employee
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="peer w-full border border-gray-300 px-4 pt-5 pb-2 rounded-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Full Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="peer w-full border border-gray-300 px-4 pt-5 pb-2 rounded-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email Address"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Email Address
            </label>
          </div>

          {/* Department */}
          <div className="relative">
            <input
              type="text"
              name="department"
              id="department"
              value={form.department}
              onChange={handleChange}
              required
              className="peer w-full border border-gray-300 px-4 pt-5 pb-2 rounded-xl placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Department"
            />
            <label
              htmlFor="department"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
            >
              Department
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition duration-300"
          >
            {editingEmployee ? 'Update' : 'Add'} Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
