import { motion } from "framer-motion";

const InputField = ({ label }) => (
  <div className="relative w-[300px]">
    <label className="absolute -top-3 left-5 px-1 bg-[var(--primary-color)] text-white text-sm font-semibold">
      {label}
    </label>
    <input
      type="text"
      className="w-full px-4 py-3 bg-transparent border border-white rounded-full text-white placeholder-transparent focus:outline-none focus:ring-0"
      placeholder={label}
    />
  </div>
);

const ContactSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const fields = ["Name", "Company Name", "Email", "Phone Number"];

  return (
    <section id="contact" className="min-h-screen py-20">
      <div className="container mx-auto px-6 flex">
        <img
          src="/assets/images/M10iD_12-Fanuc-Robot-1200x2062.png"
          className="w-1/2 h-[800px]"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-1/2 flex flex-col justify-center"
        >
          <h2
            className="text-4xl font-black text-center mb-16 text-white"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
            <div className="grid grid-cols-2 gap-8">
              {fields.map((field) => (
                <InputField key={field} label={field} />
              ))}
            </div>

            <div className="relative">
              <label className="absolute -top-3 left-5 px-1 bg-[var(--primary-color)] text-white text-sm font-semibold">
                Describe Your Project
              </label>
              <textarea
                placeholder="Describe your project"
                rows={6}
                className="w-full px-4 py-3 bg-transparent border border-white rounded-[20px] text-white placeholder-transparent focus:outline-none focus:ring-0"
              ></textarea>
            </div>
            <div className="w-full flex justify-end">
              <button
                type="submit"
                className=" bg-[var(--yellow-color)] text-white p-5 m-left-auto rounded-lg  transition-colors shadow-lg"
              >
                Send Message
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
