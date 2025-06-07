import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // <-- search term state
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/employees");
      setEmployees(res.data);
      console.log("Employees fetched:", res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    setDeletingId(id);
    try {
      console.log("Sending delete request for id:", id);
      const response = await axios.delete(`http://localhost:8080/api/employees/${id}`);
      console.log("Delete response:", response);
      if (response.status === 204 || response.status === 200) {
        // Deletion successful, refresh employees list
        await fetchEmployees();
      } else {
        console.warn("Unexpected response status on delete:", response.status);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      if (error.response) {
        console.error("Delete failed status:", error.response.status);
        console.error("Delete failed data:", error.response.data);
        alert(`Failed to delete employee: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        console.error("Error setting up request:", error.message);
        alert(`Error deleting employee: ${error.message}`);
      }
    }
    setDeletingId(null);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleAdd = () => {
    navigate("/add");
  };

  const renderPerformance = (performanceHistory) => {
    if (!performanceHistory) return "-";
    if (Array.isArray(performanceHistory)) return performanceHistory.join(", ");
    if (typeof performanceHistory === "object") return JSON.stringify(performanceHistory);
    return performanceHistory;
  };

  const badgeColors = {
    Engineering: "bg-blue-100 text-blue-800",
    HR: "bg-green-100 text-green-800",
    Marketing: "bg-pink-100 text-pink-800",
    Manager: "bg-yellow-100 text-yellow-800",
    Developer: "bg-purple-100 text-purple-800",
  };

  // Filter employees based on searchTerm matching id or name (case-insensitive)
  const filteredEmployees = employees.filter((emp) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      emp.name.toLowerCase().includes(lowerSearch) ||
      String(emp.id).toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Employee Management
        </h1>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Search employees by ID or name"
        />

        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          aria-label="Add Employee"
        >
          <FiPlus className="w-5 h-5" />
          Add Employee
        </button>
      </div>

      {filteredEmployees.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">
          No employees found.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                  {emp.name}
                </h2>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> {emp.email}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      badgeColors[emp.department] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {emp.department || "N/A"}
                  </span>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      badgeColors[emp.role] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {emp.role || "N/A"}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800">Skills:</h3>
                  <p className="text-gray-700">{emp.skills || "None"}</p>
                </div>

                <div className="mt-3">
                  <h3 className="font-semibold text-gray-800">Certifications:</h3>
                  <p className="text-gray-700">{emp.certifications || "None"}</p>
                </div>

                <div className="mt-3">
                  <h3 className="font-semibold text-gray-800">Salary:</h3>
                  <p className="text-gray-700">
                    {emp.salary
                      ? `₹ ${parseFloat(emp.salary).toLocaleString()}`
                      : "Not Provided"}
                  </p>
                </div>

                <div className="mt-3">
                  <h3 className="font-semibold text-gray-800">Performance:</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {renderPerformance(emp.performanceHistory)}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => handleEdit(emp.id)}
                  className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded transition"
                  aria-label={`Edit ${emp.name}`}
                >
                  <FiEdit className="w-5 h-5" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(emp.id)}
                  disabled={deletingId === emp.id}
                  className={`flex items-center gap-1 ${
                    deletingId === emp.id
                      ? "text-red-400 cursor-not-allowed"
                      : "text-red-600 hover:text-red-700"
                  } focus:outline-none focus:ring-2 focus:ring-red-400 rounded transition`}
                  aria-label={`Delete ${emp.name}`}
                >
                  <FiTrash2 className="w-5 h-5" />
                  {deletingId === emp.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
