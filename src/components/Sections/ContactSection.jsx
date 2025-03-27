import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useLanguage } from "../../context/LanguageContext";
import { contactArmImage, fanucImage, logo, logoShadow } from "../../vars/vars";

const InputField = ({ label }) => (
  <div className="relative w-full">
    <label className="absolute -top-3 left-5 px-1 bg-[var(--primary-color)] text-white text-xs lg:text-sm font-semibold">
      {label}
    </label>
    <input
      type="text"
      className="w-full px-4 py-3 bg-transparent border border-white rounded-full text-white placeholder-transparent focus:outline-none focus:ring-0"
      placeholder={label}
    />
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
};

const ContactSection = () => {
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
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
                  <InputField key={field.key} label={field.label} />
                ))}
              </div>

              <div className="relative">
                <label className="absolute -top-3 left-5 px-1 bg-[var(--primary-color)] text-white text-sm font-semibold">
                  {t("contact.project")}
                </label>
                <textarea
                  placeholder={t("contact.project")}
                  rows={6}
                  className="w-full px-4 py-3 bg-transparent border border-white rounded-[20px] text-white placeholder-transparent focus:outline-none focus:ring-0"
                ></textarea>
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
      <div className="flex mt-20 lg:mt-0 flex-col lg:flex-row items-center gap-12 h-[40vh]">
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
