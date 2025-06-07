import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const EmployeeForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    skills: "",
    certifications: "",
    performanceHistory: "",
    salary: "", // New salary field
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/employees/${id}`)
        .then((res) => setForm(res.data))
        .catch((err) => console.error("Error fetching employee:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/employees/${id}`, form);
      } else {
        await axios.post("http://localhost:8080/api/employees", form);
      }
      navigate("/list");
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  return (
    <>
      <style>
        {`
          input:not(:placeholder-shown)::-webkit-input-placeholder {
            color: transparent;
          }
          input:not(:placeholder-shown)::placeholder {
            color: transparent;
          }
        `}
      </style>

      <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center px-12 py-16 font-sans">
        <div className="max-w-6xl w-full rounded-3xl shadow-2xl flex overflow-hidden relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-1/2 p-12 flex flex-col justify-center text-white z-10"
          >
            <h1 className="text-5xl font-extrabold leading-tight mb-6 tracking-wide drop-shadow-lg">
              {id ? "Edit Employee" : "Add New Employee"}
            </h1>
            <p className="text-lg opacity-80 max-w-md leading-relaxed">
              Build your team with detailed employee profiles. Keep track of
              skills, roles, and performance history.
            </p>
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="mt-12 italic border-l-4 border-purple-400 pl-6 text-purple-300 max-w-sm"
            >
              “The strength of the team is each individual member. The strength of
              each member is the team.” – Phil Jackson
            </motion.blockquote>
          </motion.div>

          <div className="w-1/2 relative bg-gradient-to-tr from-purple-800 via-indigo-900 to-blue-900 p-12 rounded-r-3xl overflow-hidden flex flex-col justify-center">
            <svg className="absolute top-10 left-10 opacity-20 w-40 h-40 text-indigo-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
            <svg className="absolute bottom-20 right-20 opacity-30 w-64 h-64 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="4" />
            </svg>

            <motion.form
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              onSubmit={handleSubmit}
              className="relative z-20 grid grid-cols-2 gap-x-8 space-y-8 text-white"
              style={{ minWidth: "400px" }}
            >
              {[
                { label: "Name", name: "name", type: "text", required: true },
                { label: "Email", name: "email", type: "email", required: true },
                { label: "Department", name: "department" },
                { label: "Role", name: "role" },
                { label: "Salary", name: "salary", type: "number" }, // Salary Field
                { label: "Skills", name: "skills" },
                { label: "Certifications", name: "certifications" },
                { label: "Performance History", name: "performanceHistory" },
              ].map(({ label, name, type = "text", required = false }) => (
                <div
                  key={name}
                  className="relative col-span-1"
                  style={{
                    gridColumn:
                      name === "performanceHistory" ? "span 2 / span 2" : undefined,
                  }}
                >
                  <input
                    type={type}
                    name={name}
                    id={name}
                    value={form[name]}
                    onChange={handleChange}
                    required={required}
                    placeholder=" "
                    autoComplete="off"
                    className="peer w-full bg-transparent border-b-2 border-purple-500 focus:border-pink-400 text-white text-lg font-semibold outline-none py-3 pt-6"
                    style={{
                      resize: name === "performanceHistory" ? "vertical" : "none",
                      minHeight: name === "performanceHistory" ? "80px" : undefined,
                    }}
                  />
                  <label
                    htmlFor={name}
                    className="absolute left-0 top-3 text-purple-300 text-md transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-purple-400 peer-placeholder-shown:text-lg peer-focus:top-1 peer-focus:text-pink-400 peer-focus:text-md cursor-text select-none"
                  >
                    {label}
                  </label>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-400 transition-all peer-focus:w-full" />
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px #ec4899" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="col-span-2 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 py-4 rounded-full text-white text-xl font-extrabold shadow-lg hover:shadow-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition"
              >
                {id ? "Update" : "Add"} Employee
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeForm;
