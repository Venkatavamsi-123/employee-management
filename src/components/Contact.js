import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
    alert("Message sent! We will get back to you shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 rounded-lg shadow-xl mt-12">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-6 border-b-4 border-indigo-500 inline-block pb-2">
        Contact Us
      </h2>
      <p className="text-gray-700 text-lg mb-10 max-w-3xl">
        We're here to help! Whether you have questions about the employee management system or need support, send us a message below or use the contact information provided.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8 text-gray-700">
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-indigo-600 w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold text-indigo-700">Email</h3>
              <p>
                <a href="mailto:support@ems.com" className="hover:underline text-indigo-600">
                  venkatavamsi448@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaPhone className="text-indigo-600 w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold text-indigo-700">Phone</h3>
              <p>+91 7569447729</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-indigo-600 w-8 h-8" />
            <div>
              <h3 className="text-xl font-semibold text-indigo-700">Office Location</h3>
              <p>Andhra pradesh,Prakasam district,chimakurthy mandal,chimakurthy,523226</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your full name"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Subject of your message"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
