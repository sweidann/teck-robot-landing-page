import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { LanguageToggle } from "../LanguageToggle";
// import Link from 'next/link';

const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { id: "home", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "services", label: t("nav.services") },
    { id: "contact", label: t("nav.contact") },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change blur when scrolled 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 50;

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <header
      className={`fixed top-0 left-0 w-full transition-all duration-300 z-[1000]
        ${
          isScrolled
            ? "backdrop-blur-lg bg-opacity-20 shadow-md"
            : "bg-opacity-0"
        }`}
    >
      <div className="container mx-auto px-10 py-4 flex justify-between items-center">
        <div className="logo">
          <img
            src="./assets/images/Logo+gear.png"
            alt="Logo"
            className="h-20"
          />
        </div>
        <nav className="flex items-center gap-8">
          <ul className="flex gap-20">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-lg font-black text-center ${
                    activeSection === item.id
                      ? "text-secondary"
                      : "text-white hover:text-secondary"
                  }`}
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
