// src/components/Attendance.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_EMPLOYEES = "http://localhost:8080/api/employees";
const API_ATTENDANCE = "http://localhost:8080/api/attendance";

const quoteList = [
  "“Success is the sum of small efforts, repeated.”",
  "“Discipline is choosing between what you want now and what you want most.”",
  "“Be stronger than your excuses.”",
  "“Don't watch the clock; do what it does. Keep going.”"
];

function Attendance() {
  const [allEmployees, setAllEmployees] = useState([]);
  const [availableEmployees, setAvailableEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    status: "",
    overtimeHours: 0,
  });

  useEffect(() => {
    axios.get(API_EMPLOYEES).then((res) => {
      setAllEmployees(res.data);
      setAvailableEmployees(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      employee: { id: Number(formData.employeeId) },
      date: formData.date,
      status: formData.status,
      overtimeHours: formData.overtimeHours,
    };

    try {
      await axios.post(API_ATTENDANCE, payload);
      alert("✅ Attendance submitted!");
      setAvailableEmployees((prev) =>
        prev.filter((emp) => emp.id !== Number(formData.employeeId))
      );
      setFormData({
        employeeId: "",
        date: "",
        status: "",
        overtimeHours: 0,
      });
    } catch (error) {
      console.error("❌ Error submitting attendance:", error);
      alert("❌ Failed to submit");
    }
  };

  const handleReAddEmployee = (emp) => {
    if (!availableEmployees.find((e) => e.id === emp.id)) {
      setAvailableEmployees((prev) => [...prev, emp]);
    }
  };

  const handleRemoveFromDropdown = (id) => {
    setAvailableEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleSelectAll = () => {
    setAvailableEmployees(allEmployees);
  };

  const handleClearAll = () => {
    setAvailableEmployees([]);
    setFormData({
      employeeId: "",
      date: "",
      status: "",
      overtimeHours: 0,
    });
  };

  const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-pink-100 flex flex-col md:flex-row items-center justify-center p-6 gap-6">
      {/* Left - Quotes or Illustration */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 flex flex-col items-center justify-center text-center p-6"
      >
        <h2 className="text-4xl font-bold text-purple-800 mb-6">
          Welcome 👋
        </h2>
        <p className="text-xl italic font-medium text-gray-700 max-w-md">
          {randomQuote}
        </p>
      </motion.div>

      {/* Right - Attendance Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl space-y-6 border border-white/30"
      >
        <h3 className="text-2xl font-extrabold text-indigo-700 text-center">
          📋 Mark Attendance
        </h3>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleSelectAll}
            className="px-4 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
          >
            Select All
          </button>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
          >
            Clear All
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={(e) => setFormData((prev) => ({ ...prev, employeeId: e.target.value }))}
            required
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">-- Select Employee --</option>
            {availableEmployees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
            required
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
          />

          <select
            name="status"
            value={formData.status}
            onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
            required
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">-- Select Status --</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>

          <input
            type="number"
            name="overtimeHours"
            value={formData.overtimeHours}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, overtimeHours: Number(e.target.value) }))
            }
            min="0"
            placeholder="Overtime Hours"
            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:scale-105"
          >
            🚀 Submit Attendance
          </button>
        </form>

        <div className="pt-4 border-t">
          <h4 className="text-center font-semibold text-indigo-700 mb-3">
            Manage Employees
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {allEmployees.map((emp) => (
              <div
                key={emp.id}
                className="flex items-center bg-white px-3 py-1 rounded-full shadow text-sm gap-2"
              >
                <span>{emp.name}</span>
                {!availableEmployees.find((e) => e.id === emp.id) ? (
                  <button
                    onClick={() => handleReAddEmployee(emp)}
                    className="text-green-600 hover:text-green-800"
                  >
                    ➕
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemoveFromDropdown(emp.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Attendance;
