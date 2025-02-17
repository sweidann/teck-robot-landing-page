import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import HomeSection from "../components/Sections/HomeSection";
import AboutSection from "../components/Sections/AboutSection";
import ServicesSection from "../components/Sections/ServicesSection";
import ContactSection from "../components/Sections/ContactSection";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HomeSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
