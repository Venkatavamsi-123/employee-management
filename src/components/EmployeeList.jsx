import React from 'react';

const EmployeeList = ({ employees, onDelete, onEdit }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 py-12">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
        <h3 className="text-3xl font-extrabold text-indigo-900 mb-8 text-center tracking-wide">
          Employee List
        </h3>

        {employees.length === 0 ? (
          <p className="text-center text-gray-400 italic text-lg mt-12">
            No employees found.
          </p>
        ) : (
          <ul className="space-y-5">
            {employees.map((emp) => (
              <li
                key={emp.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-gradient-to-r from-white to-indigo-50 rounded-xl shadow-md border border-indigo-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-3 sm:mb-0">
                  <p className="text-lg font-semibold text-indigo-900">{emp.name}</p>
                  <p className="text-sm text-indigo-700">{emp.email}</p>
                  <p className="text-sm italic text-indigo-500">{emp.department}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => onEdit(emp.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(emp.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
