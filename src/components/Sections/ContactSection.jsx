import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useLanguage } from "../../context/LanguageContext";
import { contactArmImage, fanucImage, logo, logoShadow } from "../../vars/vars";
import { sendEmail } from "../../api/sendEmail";
import { useState } from "react";
import toast from "react-hot-toast";

const InputField = ({ label, name, value, onChange, error }) => (
  <div className="relative w-full">
    <label className="absolute -top-3 left-5 px-1 bg-[var(--primary-color)] text-white text-xs lg:text-sm font-semibold">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-transparent border rounded-full text-white placeholder-transparent focus:outline-none focus:ring-0 ${
        error ? "border-[var(--yellow-color)]" : "border-white"
      }`}
      placeholder={label}
    />
    {error && (
      <span className="text-[var(--yellow-color)] text-xs mt-1 ml-4">
        {error}
      </span>
    )}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    project: "",
  });
  const [errors, setErrors] = useState({});
  const [lastSubmissionTime, setLastSubmissionTime] = useState(
    localStorage.getItem("lastFormSubmission") || 0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const minLength = 2;
    const maxLength = {
      name: 50,
      company: 100,
      email: 100,
      phone: 20,
      project: 1000,
    };

    // Check submission rate (minimum 1 minute between submissions)
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmissionTime;
    if (timeSinceLastSubmission < 60000) {
      const remainingTime = Math.ceil((60000 - timeSinceLastSubmission) / 1000);
      newErrors.form = t("validation.tooManyRequests") + ` (${remainingTime}s)`;
      setErrors(newErrors);
      return false;
    }

    // Required fields and length validation
    if (!formData.name.trim()) {
      newErrors.name = t("validation.required");
    } else if (
      formData.name.length < minLength ||
      formData.name.length > maxLength.name
    ) {
      newErrors.name = t("validation.invalidLength");
    }

    if (!formData.company.trim()) {
      newErrors.company = t("validation.required");
    } else if (
      formData.company.length < minLength ||
      formData.company.length > maxLength.company
    ) {
      newErrors.company = t("validation.invalidLength");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("validation.required");
    } else {
      // Enhanced email validation
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = t("validation.invalidEmail");
      }
      if (formData.email.length > maxLength.email) {
        newErrors.email = t("validation.invalidLength");
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("validation.required");
    }

    if (!formData.project.trim()) {
      newErrors.project = t("validation.required");
    } else if (
      formData.project.length < minLength ||
      formData.project.length > maxLength.project
    ) {
      newErrors.project = t("validation.invalidLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (errors.form) {
        toast.error(errors.form, {
          icon: "⏳",
          duration: 2000,
        });
      }
      return;
    }

    try {
      await sendEmail(formData);
      const now = Date.now();
      setLastSubmissionTime(now);
      localStorage.setItem("lastFormSubmission", now);
      toast.success(t("contact.success"));
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        project: "",
      });
      setErrors({});
    } catch (error) {
      toast.error(t("contact.error"));
    }
  };

  const fields = [
    { key: "name", label: t("contact.name") },
    { key: "company", label: t("contact.company") },
    { key: "email", label: t("contact.email") },
    { key: "phone", label: t("contact.phone") },
  ];

  return (
    <section id="contact" className="min-h-screen py-10">
      <div className="container relative mx-auto px-6">
        <div className="flex flex-row lg:flex-col relative">
          <div className="w-3/4 lg:w-full lg:hidden">
            <img
              src={contactArmImage}
              className="w-full h-[300px] md:h-[500px] object-fit"
            />
          </div>
          <div className="w-1/2 absolute top-[50%] left-[40%] lg:static lg:w-full flex items-center justify-center">
            <h2
              className="text-3xl lg:text-5xl font-black text-center mb-8 lg:mb-16 text-white text-nowrap"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              {t("contact.title")}
            </h2>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <img
            src={contactArmImage}
            className="hidden lg:block w-full lg:w-1/2 h-[400px] lg:h-[700px] 2xl:h-[900px] lg:pr-[100px] mb-8 lg:mb-0"
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {fields.map((field) => (
                  <InputField
                    key={field.key}
                    name={field.key}
                    label={field.label}
                    value={formData[field.key]}
                    onChange={handleChange}
                    error={errors[field.key]}
                  />
                ))}
              </div>

              <div className="relative">
                <label className="absolute -top-3 left-5 px-1 bg-[var(--primary-color)] text-white text-sm font-semibold">
                  {t("contact.project")}
                </label>
                <textarea
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  placeholder={t("contact.project")}
                  rows={6}
                  className={`w-full px-4 py-3 bg-transparent border rounded-[20px] text-white placeholder-transparent focus:outline-none focus:ring-0 ${
                    errors.project
                      ? "border-[var(--yellow-color)]"
                      : "border-white"
                  }`}
                  style={{ resize: "none" }}
                ></textarea>
                {errors.project && (
                  <span className="text-[var(--yellow-color)] text-xs mt-1 ml-4">
                    {errors.project}
                  </span>
                )}
              </div>
              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  className="bg-[var(--yellow-color)] w-full lg:w-auto text-white text-sm lg:text-base p-3 lg:p-5 m-left-auto rounded-lg transition-colors shadow-lg"
                >
                  {t("contact.submit")}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <div className="flex mt-20 lg:mt-0 flex-col lg:flex-row items-center gap-12 xl:h-[300px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="w-3/4 lg:w-1/2 h-full flex justify-center"
        >
          <img className="" src={fanucImage}></img>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className={`w-1/2 h-full flex justify-center`}
        >
          <img src={logoShadow}></img>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
