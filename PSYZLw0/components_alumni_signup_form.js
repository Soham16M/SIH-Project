// components_alumni_signup_form.js
const AlumniSignUpForm = ({ onFormSubmit = (data) => console.log("Submitted:", data) }) => {
  const { useState, useEffect } = React;

  const formInputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gradYear: "",
    degree: "",
    department: "",
    organization: "",
    industry: "",
    experience: "",
    skills: "",
    location: "",
    linkedin: "",
    mentorship: "Yes",
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
    if (!formData.gradYear) newErrors.gradYear = "Graduation Year required.";
    if (!formData.degree) newErrors.degree = "Degree is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.organization) newErrors.organization = "Organization is required.";
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
    const input = document.getElementById("alumniCvFileInput");
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

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onFormSubmit({ ...formData });
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow">
      <h2 className="text-xl font-semibold mb-4">Alumni Application</h2>
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
          onClick={() =>
            !formData.cvFile &&
            document.getElementById("alumniCvFileInput")?.click()
          }
        >
          <input
            id="alumniCvFileInput"
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
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
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
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
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
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Phone *</label>
          <input
            name="phone"
            placeholder="9876543210"
            value={formData.phone}
            onChange={handleChange}
            className={formInputClass}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">Graduation Year *</label>
            <input
              name="gradYear"
              placeholder="2020"
              value={formData.gradYear}
              onChange={handleChange}
              className={formInputClass}
            />
            {errors.gradYear && (
              <p className="text-red-500 text-xs mt-1">{errors.gradYear}</p>
            )}
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
            {errors.degree && (
              <p className="text-red-500 text-xs mt-1">{errors.degree}</p>
            )}
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
            {errors.department && (
              <p className="text-red-500 text-xs mt-1">{errors.department}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Current Organization *</label>
          <input
            name="organization"
            placeholder="Infosys, TCS"
            value={formData.organization}
            onChange={handleChange}
            className={formInputClass}
          />
          {errors.organization && (
            <p className="text-red-500 text-xs mt-1">{errors.organization}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Industry</label>
          <input
            name="industry"
            placeholder="IT, Finance"
            value={formData.industry}
            onChange={handleChange}
            className={formInputClass}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Experience</label>
          <textarea
            name="experience"
            placeholder="5 years at XYZ Company"
            value={formData.experience}
            onChange={handleChange}
            rows="3"
            className={formInputClass}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm mb-1">Key Skills</label>
          <input
            name="skills"
            placeholder="Java, React, SQL"
            value={formData.skills}
            onChange={handleChange}
            className={formInputClass}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Current Location</label>
          <input
            name="location"
            placeholder="Pune, India"
            value={formData.location}
            onChange={handleChange}
            className={formInputClass}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">LinkedIn Profile</label>
          <input
            name="linkedin"
            placeholder="https://linkedin.com/in/yourname"
            value={formData.linkedin}
            onChange={handleChange}
            className={formInputClass}
          />
        </div>

        {/* Mentorship radio */}
        <div>
          <label className="block text-sm mb-1">Availability of Mentorship</label>
          <div className="flex space-x-6 mt-1">
            <label className="flex items-center">
              <input
                type="radio"
                name="mentorship"
                value="Yes"
                checked={formData.mentorship === "Yes"}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="mentorship"
                value="No"
                checked={formData.mentorship === "No"}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg"
        >
          {isSubmitting ? "Submitting..." : "Create Alumni Account"}
        </button>
      </form>
    </div>
  );
};

window.AlumniSignUpForm = AlumniSignUpForm;
