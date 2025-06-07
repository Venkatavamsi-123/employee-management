import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const PayrollList = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    calculatePayroll();
  }, []);

  const calculatePayroll = async () => {
    try {
      const [empRes, attRes] = await Promise.all([
        axios.get("http://localhost:8080/api/employees"),
        axios.get("http://localhost:8080/api/attendance"),
      ]);

      const employees = empRes.data;
      const attendance = attRes.data;
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const monthlyAttendance = attendance.filter((att) => {
        const attDate = new Date(att.date);
        return (
          attDate.getMonth() === currentMonth &&
          attDate.getFullYear() === currentYear
        );
      });

      const payroll = employees.map((emp) => {
        const empAttendance = monthlyAttendance.filter(
          (att) => att.employee_id === emp.id
        );
        const present = empAttendance.filter(
          (a) => a.status.toLowerCase() === "present"
        ).length;
        const absent = empAttendance.filter(
          (a) => a.status.toLowerCase() === "absent"
        ).length;
        const overtime = empAttendance.reduce(
          (sum, a) => sum + (a.overtime_hours || 0),
          0
        );

        const baseSalary = emp.salary;
        const deduction = absent * 1000;
        const bonus = overtime * 100;
        const finalSalary = baseSalary - deduction + bonus;

        return {
          id: emp.id,
          employeeName: emp.name,
          month: now.toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
          baseSalary: baseSalary.toFixed(2),
          presentDays: present,
          absentDays: absent,
          overtimeHours: overtime,
          deduction,
          bonus,
          finalPay: finalSalary.toFixed(2),
        };
      });

      setPayrollData(payroll);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter payroll based on search query (id or name)
  const filteredPayroll = payrollData.filter((pay) => {
    const query = searchQuery.toLowerCase();
    return (
      pay.employeeName.toLowerCase().includes(query) ||
      String(pay.id).includes(query)
    );
  });

  const generatePDF = (pay) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("🧾 Employee Payslip", 20, 20);
    doc.setFontSize(12);
    doc.text(`Employee: ${pay.employeeName}`, 20, 40);
    doc.text(`Month: ${pay.month}`, 20, 50);
    doc.text(`Base Salary: ₹${pay.baseSalary}`, 20, 60);
    doc.text(`Present Days: ${pay.presentDays}`, 20, 70);
    doc.text(`Absent Days: ${pay.absentDays}`, 20, 80);
    doc.text(`Overtime Hours: ${pay.overtimeHours}`, 20, 90);
    doc.text(`Deduction: ₹${pay.deduction}`, 20, 100);
    doc.text(`Bonus: ₹${pay.bonus}`, 20, 110);
    doc.text(`Final Pay: ₹${pay.finalPay}`, 20, 120);
    doc.text("Thank you for your service!", 20, 140);
    return doc;
  };

  const downloadZipOfPDFs = () => {
    const zip = new JSZip();
    filteredPayroll.forEach((pay) => {
      const pdf = generatePDF(pay);
      const blob = pdf.output("blob");
      zip.file(`${pay.employeeName.replace(/\s/g, "_")}_Payslip.pdf`, blob);
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "Payslips.zip");
    });
  };

  if (loading)
    return (
      <div className="p-6 text-lg text-center text-indigo-700">
        Calculating payroll...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-10 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h2 className="text-5xl font-extrabold text-indigo-800 tracking-wide animate-fade-in-down">
            📊 Monthly Payroll Summary
          </h2>

          <input
            type="text"
            placeholder="Search by Employee Name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-xl border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full max-w-xs"
          />

          <button
            onClick={downloadZipOfPDFs}
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl shadow-lg transition duration-300 font-semibold"
          >
            Download All Payslips (ZIP)
          </button>
        </div>

        {filteredPayroll.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No payroll records found.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPayroll.map((pay) => (
              <div
                key={pay.id}
                onClick={() => navigate(`/employee/${pay.id}`)}
                className="cursor-pointer bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-indigo-700 mb-1">
                  {pay.employeeName}
                </h3>
                <p className="text-indigo-400 font-semibold tracking-wide mb-4">
                  {pay.month}
                </p>

                <div className="space-y-1 text-gray-700 text-sm">
                  <p>Base Salary: ₹{pay.baseSalary}</p>
                  <p>Present Days: {pay.presentDays}</p>
                  <p>Absent Days: {pay.absentDays}</p>
                  <p>Overtime: {pay.overtimeHours} hrs</p>
                  <p className="text-red-600">Deduction: -₹{pay.deduction}</p>
                  <p className="text-green-600">Bonus: +₹{pay.bonus}</p>
                </div>

                <p className="mt-3 text-indigo-900 font-semibold text-lg">
                  Final Pay: ₹{pay.finalPay}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const pdf = generatePDF(pay);
                    pdf.save(`${pay.employeeName.replace(/\s/g, "_")}_Payslip.pdf`);
                  }}
                  className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl shadow-md transition"
                >
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollList;
