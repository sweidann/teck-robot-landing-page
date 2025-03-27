import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { LanguageToggle } from "../LanguageToggle";
import { logo } from "../../vars/vars";
// import Link from 'next/link';

const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuBtnRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full transition-all duration-300 z-[1000]
        ${
          isScrolled
            ? "backdrop-blur-lg bg-opacity-20 shadow-md"
            : "bg-opacity-0"
        }`}
    >
      <div className="container mx-auto px-4 md:px-10 py-4">
        <div className="hidden lg:flex justify-between items-center">
          <div className="logo">
            <img src={logo} alt="Logo" className="h-20" />
          </div>
          <nav className="flex items-center gap-8">
            <ul className="flex gap-20">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm md:text-lg font-black text-center ${
                      activeSection === item.id
                        ? "text-[var(--yellow-color)]"
                        : "text-white hover:text-[var(--yellow-color)]"
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

        <div className="flex lg:hidden justify-between items-center relative">
          <button
            ref={menuBtnRef}
            onClick={toggleMenu}
            className="text-white p-2 z-20"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="Logo" className="h-12" />
          </div>

          <div className="z-20">
            <LanguageToggle />
          </div>

          {isMenuOpen && (
            <div
              className="absolute top-full left-0 mt-2 w-48 bg-[var(--primary-color)] border border-white/20 rounded-lg shadow-lg overflow-hidden z-50"
              ref={menuRef}
            >
              <ul className="py-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm md:text-base font-bold ${
                        activeSection === item.id
                          ? "text-[var(--yellow-color)] bg-white/10"
                          : "text-white hover:text-[var(--yellow-color)] hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
