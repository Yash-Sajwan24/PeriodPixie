import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Footer from "../components/Sections/Footer"
import AboutUs from "../components/Sections/AboutUs"
import Contact from "../components/Sections/Contact"

export default function Landing() {
  return (
    <>
      <TopNavbar />
      <Header />
      <AboutUs />
      <Contact />
      <Footer />
    </>
  );
}


