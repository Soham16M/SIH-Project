// components_student_signup_form.jsx
const StudentSignUpForm = ({ onFormSubmit = (data) => console.log("Submitted:", data) }) => {
  const { useState, useEffect } = React;

  const formInputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    enrollmentNo: "",
    gradYear: "",
    degree: "",
    department: "",
    skills: "",
    careerInterests: "",
    experience: "",
    linkedin: "",
    github: "",
    cvFile: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }, [formData.cvFile, isSubmitting]);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password.";
    if (formData.password && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.phone) newErrors.phone = "Phone Number is required.";
    if (!formData.enrollmentNo) newErrors.enrollmentNo = "Enrollment No. required.";
    if (!formData.gradYear) newErrors.gradYear = "Graduation Year required.";
    if (!formData.degree) newErrors.degree = "Degree is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    return newErrors;
  };

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (file) => {
    if (!file) return;
    if (
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFormData((prev) => ({ ...prev, cvFile: file }));
    } else {
      alert("Please upload a PDF or DOC/DOCX file.");
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, cvFile: null }));
    const input = document.getElementById("cvFileInput");
    if (input) input.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragEvents = (e, over) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(over);
  };

  // Submit: call onFormSubmit instead of redirecting
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // optionally scroll to first error
      return;
    }

    setIsSubmitting(true);

    // simulate network delay then call onFormSubmit
    setTimeout(() => {
      setIsSubmitting(false);
      // send data to parent App — App will show SuccessMessage
      onFormSubmit({ ...formData });
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow">
      <h2 className="text-xl font-semibold mb-4">Student Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* CV Upload */}
        <div
          className={`p-6 border-2 rounded-md cursor-pointer ${
            isDragging
              ? "border-indigo-400 bg-indigo-50"
              : "border-dashed border-gray-300 bg-white"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => handleDragEvents(e, true)}
          onDragLeave={(e) => handleDragEvents(e, false)}
          onClick={() => !formData.cvFile && document.getElementById("cvFileInput")?.click()}
        >
          <input
            id="cvFileInput"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
          {formData.cvFile ? (
            <div className="flex items-center justify-between">
              <p className="text-gray-700">{formData.cvFile.name}</p>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-600 font-medium hover:underline ml-4"
              >
                Delete
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Click to upload or drag and drop your CV (PDF/DOC/DOCX)
            </p>
          )}
        </div>

        {/* Manual Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Full Name *</label>
            <input
              name="fullName"
              placeholder="John Smith"
              value={formData.fullName}
              onChange={handleChange}
              className={formInputClass}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Email *</label>
            <input
              type="email"
              name="email"
              placeholder="abc@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className={formInputClass}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Password *</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className={formInputClass}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={formInputClass}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Phone *</label>
            <input
              name="phone"
              placeholder="8482931127"
              value={formData.phone}
              onChange={handleChange}
              className={formInputClass}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Roll No. / Enrollment No. *</label>
            <input
              name="enrollmentNo"
              placeholder="123456"
              value={formData.enrollmentNo}
              onChange={handleChange}
              className={formInputClass}
            />
            {errors.enrollmentNo && <p className="text-red-500 text-xs mt-1">{errors.enrollmentNo}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Graduation Year *</label>
            <input
              name="gradYear"
              placeholder="2025"
              value={formData.gradYear}
              onChange={handleChange}
              className={formInputClass}
            />
            {errors.gradYear && <p className="text-red-500 text-xs mt-1">{errors.gradYear}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Degree *</label>
            <input
              name="degree"
              placeholder="B.E. Computer Science"
              value={formData.degree}
              onChange={handleChange}
              className={formInputClass}
            />
            {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Department *</label>
            <input
              name="department"
              placeholder="Computer Engineering"
              value={formData.department}
              onChange={handleChange}
              className={formInputClass}
            />
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Skills</label>
            <input
              name="skills"
              placeholder="HTML, CSS, React, Python"
              value={formData.skills}
              onChange={handleChange}
              className={formInputClass}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Career Interests</label>
            <input
              name="careerInterests"
              placeholder="Web Development, AI"
              value={formData.careerInterests}
              onChange={handleChange}
              className={formInputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Experience</label>
          <textarea
            name="experience"
            placeholder="1 year internship at XYZ Company"
            value={formData.experience}
            onChange={handleChange}
            rows="3"
            className={formInputClass}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">LinkedIn</label>
            <input
              name="linkedin"
              placeholder="https://linkedin.com/in/yourname"
              value={formData.linkedin}
              onChange={handleChange}
              className={formInputClass}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">OtherLinks</label>
            <input
              name="github"
              placeholder="https://github.com/username"
              value={formData.github}
              onChange={handleChange}
              className={formInputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg"
        >
          {isSubmitting ? "Submitting..." : "Create Student Account"}
        </button>
      </form>
    </div>
  );
};

window.StudentSignUpForm = StudentSignUpForm;
