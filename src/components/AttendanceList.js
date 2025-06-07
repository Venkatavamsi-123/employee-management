import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PencilIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const API_ATTENDANCE = "http://localhost:8080/api/attendance";

function AttendanceList() {
  const [groupedAttendance, setGroupedAttendance] = useState({});
  const [expandedEmployeeIds, setExpandedEmployeeIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(API_ATTENDANCE);
      const records = res.data || [];
      const grouped = {};
      for (const record of records) {
        const { employee_id } = record;
        if (!grouped[employee_id]) grouped[employee_id] = [];
        grouped[employee_id].push(record);
      }
      setGroupedAttendance(grouped);
    } catch (err) {
      console.error("Failed to fetch attendance records:", err);
    }
  };

  const toggleExpand = (employeeId) => {
    setExpandedEmployeeIds((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_ATTENDANCE}/${id}`);
      fetchAttendance();
    } catch (err) {
      console.error("Failed to delete attendance record:", err);
    }
  };

  const getStatusCount = (records, statusType) =>
    records.filter(
      (r) => r.status.toLowerCase() === statusType.toLowerCase()
    ).length;

  const handleEditClick = (record) => {
    navigate("/attendance", { state: { record } });
  };

  // Filter groupedAttendance by search term (id or name)
  const filteredEntries = Object.entries(groupedAttendance).filter(
    ([employeeId, records]) => {
      const employeeName = records[0]?.employee_name?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      return (
        employeeId.toLowerCase().includes(search) ||
        employeeName.includes(search)
      );
    }
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-indigo-900 mb-6 text-center">
        🧑‍💼 Employee Attendance Dashboard
      </h2>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by Employee ID or Name..."
          className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search attendance by employee ID or name"
        />
      </div>

      {filteredEntries.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No attendance records found.
        </p>
      ) : (
        <div className="space-y-6">
          {filteredEntries.map(([employeeId, records]) => {
            const employeeName = records[0].employee_name;
            const isExpanded = expandedEmployeeIds.includes(employeeId);
            const totalPresent = getStatusCount(records, "present");
            const totalAbsent = getStatusCount(records, "absent");
            const totalLeave = getStatusCount(records, "leave");

            return (
              <div
                key={employeeId}
                className="bg-white border border-indigo-100 rounded-2xl shadow-md transition hover:shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-indigo-800">
                      {employeeName}
                    </h3>
                    <p className="text-sm text-gray-500">ID: {employeeId}</p>
                    <div className="flex gap-4 text-sm mt-2">
                      <span className="text-green-700 font-medium">
                        ✔ Present: {totalPresent}
                      </span>
                      <span className="text-red-700 font-medium">
                        ❌ Absent: {totalAbsent}
                      </span>
                      <span className="text-yellow-600 font-medium">
                        🌿 Leave: {totalLeave}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand(employeeId)}
                    className="flex items-center gap-2 text-indigo-600 font-medium hover:underline"
                  >
                    {isExpanded ? (
                      <>
                        Hide Details <ChevronUpIcon className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        View Details <ChevronDownIcon className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full divide-y divide-indigo-100">
                      <thead>
                        <tr className="bg-indigo-50 text-indigo-600 text-sm font-semibold">
                          <th className="text-left px-4 py-2">Date</th>
                          <th className="text-left px-4 py-2">Status</th>
                          <th className="text-left px-4 py-2">Overtime</th>
                          <th className="text-left px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((r) => (
                          <tr
                            key={r.id}
                            className="border-t text-sm hover:bg-indigo-50 transition"
                          >
                            <td className="px-4 py-2">
                              {new Date(r.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2 capitalize">{r.status}</td>
                            <td className="px-4 py-2 text-center">
                              {r.overtime_hours}
                            </td>
                            <td className="px-4 py-2 flex gap-2">
                              <button
                                onClick={() => handleEditClick(r)}
                                className="flex items-center gap-1 text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded shadow transition"
                              >
                                <PencilIcon className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(r.id)}
                                className="flex items-center gap-1 text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded shadow transition"
                              >
                                <TrashIcon className="w-4 h-4" />
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AttendanceList;
