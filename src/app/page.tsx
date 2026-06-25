import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Forums from "@/components/Forums";
import WhyAttend from "@/components/WhyAttend";
import About from "@/components/About";
import Register from "@/components/Register";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Reveal />
      <Nav />
      <main>
        <Hero />
        <Forums />
        <WhyAttend />
        <About />
        <Register />
      </main>
      <Footer />
    </>
  );
}