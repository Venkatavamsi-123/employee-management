// EmployeeDashboard.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const EmployeeDashboard = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const [empRes, attRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/employees/${id}`),
          axios.get(`http://localhost:8080/api/attendance?employeeId=${id}`),
        ]);

        setEmployee(empRes.data);
        setAttendance(attRes.data);
      } catch (error) {
        console.error("Failed to fetch employee details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const generatePayslipPDF = () => {
    if (!employee) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`🧾 Payslip - ${employee.name}`, 20, 25);
    doc.setFontSize(14);
    doc.text(`Email: ${employee.email}`, 20, 40);
    doc.text(`Department: ${employee.department}`, 20, 50);
    doc.text(`Base Salary: ₹${employee.salary}`, 20, 60);

    // Attendance summary
    const presentDays = attendance.filter((a) => a.status.toLowerCase() === "present").length;
    const absentDays = attendance.filter((a) => a.status.toLowerCase() === "absent").length;
    const leaveDays = attendance.filter((a) => a.status.toLowerCase() === "leave").length;
    const overtimeHours = attendance.reduce((sum, a) => sum + (a.overtime_hours || 0), 0);

    doc.text(`Present Days: ${presentDays}`, 20, 75);
    doc.text(`Absent Days: ${absentDays}`, 20, 85);
    doc.text(`Leave Days: ${leaveDays}`, 20, 95);
    doc.text(`Overtime Hours: ${overtimeHours}`, 20, 105);

    // Salary calculation
    const deduction = absentDays * 1000;
    const bonus = overtimeHours * 100;
    const finalPay = employee.salary - deduction + bonus;

    doc.text(`Deduction: -₹${deduction}`, 20, 120);
    doc.text(`Bonus: +₹${bonus}`, 20, 130);
    doc.setFontSize(16);
    doc.text(`Final Pay: ₹${finalPay}`, 20, 145);

    doc.save(`${employee.name.replace(/\s/g, "_")}_Payslip.pdf`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-indigo-700 text-xl">
        Loading employee details...
      </div>
    );

  if (!employee)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-xl">
        Employee not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 to-white py-12 px-6 sm:px-12 max-w-5xl mx-auto">
      <Link
        to="/payroll"
        className="inline-block mb-10 text-indigo-700 hover:text-indigo-900 font-semibold underline"
      >
        ← Back to Payroll Summary
      </Link>

      <header className="mb-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-5xl font-extrabold text-indigo-800 tracking-tight">
            👤 {employee.name}
          </h1>
          <p className="text-indigo-500 text-lg mt-1">{employee.email}</p>
          <p className="text-indigo-600 mt-2 font-semibold">{employee.department}</p>
        </div>

        <div className="bg-indigo-100 rounded-3xl p-6 shadow-md w-full sm:w-72 text-center">
          <p className="text-indigo-700 font-bold text-lg mb-2">Base Salary</p>
          <p className="text-indigo-900 text-3xl font-extrabold">₹{employee.salary}</p>
        </div>
      </header>

      {/* Attendance History */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b border-indigo-300 pb-2">
          📅 Attendance History
        </h2>

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="text-left py-3 px-5 border-b border-gray-300">Date</th>
                <th className="text-left py-3 px-5 border-b border-gray-300">Status</th>
                <th className="text-left py-3 px-5 border-b border-gray-300">Overtime (hrs)</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((att, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-indigo-50 cursor-default"
                >
                  <td className="py-3 px-5 border-b border-gray-200">{new Date(att.date).toLocaleDateString()}</td>
                  <td
                    className={`py-3 px-5 border-b border-gray-200 font-semibold ${
                      att.status.toLowerCase() === "present"
                        ? "text-green-600"
                        : att.status.toLowerCase() === "absent"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {att.status.charAt(0).toUpperCase() + att.status.slice(1)}
                  </td>
                  <td className="py-3 px-5 border-b border-gray-200">{att.overtime_hours || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Analytics */}
      <section className="mb-12 bg-indigo-50 rounded-3xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b border-indigo-300 pb-2">
          📈 Attendance Analytics
        </h2>

        {(() => {
          const presentDays = attendance.filter((a) => a.status.toLowerCase() === "present").length;
          const absentDays = attendance.filter((a) => a.status.toLowerCase() === "absent").length;
          const leaveDays = attendance.filter((a) => a.status.toLowerCase() === "leave").length;
          const totalDays = attendance.length;
          const overtimeHours = attendance.reduce((sum, a) => sum + (a.overtime_hours || 0), 0);

          const presentPercent = ((presentDays / totalDays) * 100).toFixed(1);
          const absentPercent = ((absentDays / totalDays) * 100).toFixed(1);
          const leavePercent = ((leaveDays / totalDays) * 100).toFixed(1);

          return (
            <div className="grid sm:grid-cols-4 gap-6 text-center">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-indigo-600 font-semibold text-xl mb-1">Present Days</p>
                <p className="text-3xl font-extrabold text-green-600">{presentDays}</p>
                <p className="text-indigo-400">{presentPercent}%</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-indigo-600 font-semibold text-xl mb-1">Absent Days</p>
                <p className="text-3xl font-extrabold text-red-600">{absentDays}</p>
                <p className="text-indigo-400">{absentPercent}%</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-indigo-600 font-semibold text-xl mb-1">Leave Days</p>
                <p className="text-3xl font-extrabold text-yellow-600">{leaveDays}</p>
                <p className="text-indigo-400">{leavePercent}%</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <p className="text-indigo-600 font-semibold text-xl mb-1">Overtime Hours</p>
                <p className="text-3xl font-extrabold text-indigo-700">{overtimeHours}</p>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Payslip Download */}
      <section className="text-center">
        <button
          onClick={generatePayslipPDF}
          className="bg-indigo-700 hover:bg-indigo-900 text-white font-bold py-3 px-8 rounded-3xl shadow-lg transition duration-300"
        >
          Download Payslip PDF
        </button>
      </section>
    </div>
  );
};

export default EmployeeDashboard;
