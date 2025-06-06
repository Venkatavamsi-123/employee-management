const About = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-purple-50 py-24 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto rounded-3xl shadow-xl overflow-hidden">
      {/* Soft blurred circles as background decoration */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full opacity-30 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-400 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-5xl font-extrabold text-center text-purple-800 mb-12 tracking-tight leading-tight">
          About Us
        </h2>

        <p className="text-center text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
          Our Employee Management System is thoughtfully engineered to simplify and optimize your workforce management processes. Whether you're a small business or a large enterprise, our platform offers scalable solutions to meet your organizational needs.
        </p>

        <p className="text-center text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-14">
          With real-time attendance tracking, comprehensive employee profiles, and insightful productivity analytics, you get a clear overview of your team's performance and operational health. Our intuitive dashboard lets you manage tasks effortlessly, freeing up time to focus on strategic growth.
        </p>

        <h3 className="text-4xl font-semibold text-purple-700 text-center mb-10">
          Why Choose Our System?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="mb-6 p-4 bg-purple-100 rounded-full">
              {/* Emoji icon as placeholder */}
              <span className="text-5xl">⚡</span>
            </div>
            <h4 className="text-purple-700 font-semibold text-2xl mb-3">Efficiency</h4>
            <p className="text-gray-600 max-w-xs">
              Automate routine tasks and reduce manual errors with our intelligent workflow engine. From attendance to payroll preparation, everything runs smoothly and quickly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="mb-6 p-4 bg-purple-100 rounded-full">
              <span className="text-5xl">🔄</span>
            </div>
            <h4 className="text-purple-700 font-semibold text-2xl mb-3">Reliability</h4>
            <p className="text-gray-600 max-w-xs">
              Dependable, real-time data ensures you’re always making informed decisions. Cloud infrastructure guarantees data consistency and backup.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="mb-6 p-4 bg-purple-100 rounded-full">
              <span className="text-5xl">🔒</span>
            </div>
            <h4 className="text-purple-700 font-semibold text-2xl mb-3">Security</h4>
            <p className="text-gray-600 max-w-xs">
              Enterprise-grade encryption and role-based access control keep employee and organizational data safe and confidential.
            </p>
          </div>
        </div>

        <h3 className="text-4xl font-semibold text-purple-700 text-center mb-10">
          Core Features
        </h3>

        <ul className="max-w-4xl mx-auto text-gray-700 text-lg md:text-xl list-disc list-inside space-y-5 leading-relaxed mb-16">
          <li><strong>Comprehensive Employee Profiles:</strong> Maintain detailed records including contact info, roles, skills, certifications, and performance history.</li>
          <li><strong>Attendance Management:</strong> Track daily attendance, leaves, and overtime with automated reports.</li>
          <li><strong>Performance Analytics:</strong> Gain insights through customizable dashboards and reports to boost productivity.</li>
          <li><strong>Payroll Integration:</strong> Streamline salary processing with automated calculations based on attendance and leaves.</li>
          <li><strong>Role-Based Access:</strong> Assign permissions for managers, HR, and employees ensuring secure and controlled data access.</li>
        </ul>

        <p className="text-center text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          We continuously update our system with new features and improvements based on your feedback. Join thousands of organizations who trust us to empower their workforce management and drive operational excellence.
        </p>
      </div>
    </section>
  );
};

export default About;
