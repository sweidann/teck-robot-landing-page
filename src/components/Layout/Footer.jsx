const Footer = () => {
  return (
    <footer className=" text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="logo">
            <img
              src="./assets/images/Logo+gear.png"
              alt="Logo"
              className="h-8"
            />
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
