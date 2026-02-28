import { useEffect, useState, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { ArrowRight, ArrowDown, Menu, X, Mail, MapPin } from "lucide-react";
import WineDetailPage from "./pages/WineDetailPage";

// Images
const images = {
  hero: "https://images.unsplash.com/photo-1762945762906-83017fc549aa?w=1920&q=80",
  about: "https://images.unsplash.com/photo-1543418219-44e30b057fea?w=1200&q=80",
  vineyard: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=80",
  terroir: "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?w=1920&q=80",
  contact: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80",
};

// Age Gate Component
const AgeGate = ({ onVerify }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] bg-[#0A0A0A] flex items-center justify-center"
      data-testid="age-gate-overlay"
    >
      <div className="absolute inset-0 opacity-20">
        <img src={images.hero} alt="" className="w-full h-full object-cover" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative text-center px-8 max-w-lg"
      >
        <div className="w-16 h-[1px] bg-white/20 mx-auto mb-12" />
        <h1 className="text-serif text-5xl md:text-7xl text-white font-light tracking-tight mb-4">
          Cape Jervis
        </h1>
        <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-12">
          Wine — Australia
        </p>
        <p className="text-white/60 text-sm leading-relaxed mb-16 font-light">
          To enter this site, you must be of legal drinking age in your country of residence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onVerify}
            className="px-12 py-5 bg-white text-[#0A0A0A] text-xs uppercase tracking-[0.2em] hover:bg-[#C9A96E] hover:text-white transition-all duration-500"
            data-testid="age-verify-yes"
          >
            Enter Site
          </button>
          <a
            href="https://www.google.com"
            className="px-12 py-5 border border-white/20 text-white/60 text-xs uppercase tracking-[0.2em] hover:border-white/40 hover:text-white transition-all duration-500"
            data-testid="age-verify-no"
          >
            Exit
          </a>
        </div>
        <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-16">
          Please enjoy responsibly
        </p>
      </motion.div>
    </motion.div>
  );
};

// Navigation
const Navigation = ({ isScrolled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Story", href: "#story" },
    { label: "Collection", href: "#collection" },
    { label: "Terroir", href: "#terroir" },
    { label: "Trade", href: "#trade" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? "bg-[#0A0A0A]/95 backdrop-blur-md" : ""
        }`}
        data-testid="main-navigation"
      >
        <div className="max-w-[1800px] mx-auto px-8 md:px-16">
          <div className="flex items-center justify-between h-24">
            <Link to="/" className="text-serif text-2xl text-white tracking-tight" data-testid="nav-logo">
              Cape Jervis
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/60 text-[11px] uppercase tracking-[0.2em] hover:text-white transition-colors duration-300"
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white"
              data-testid="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex items-center justify-center lg:hidden"
          >
            <div className="text-center space-y-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="block text-white text-2xl font-light"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Hero Section - Cinematic
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-[#0A0A0A]" data-testid="hero-section">
      {/* Video/Image Background */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={images.hero}
          alt="Cape Jervis Wine"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/30 to-[#0A0A0A]" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-between pt-32 pb-16">
        {/* Main Title */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              className="mb-8"
            >
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.4em]">
                Est. South Australia
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="text-serif text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] text-white font-light tracking-tight leading-[0.9]"
              data-testid="hero-title"
            >
              Cape Jervis
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="text-white/50 text-sm md:text-base tracking-[0.15em] mt-8 font-light"
              data-testid="hero-subtitle"
            >
              WHISPERS OF THE OUTBACK
            </motion.p>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="max-w-[1800px] mx-auto w-full px-8 md:px-16"
        >
          <div className="flex items-end justify-between border-t border-white/10 pt-8">
            <div className="hidden md:block">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Scroll to explore</p>
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mx-auto md:mx-0"
            >
              <ArrowDown size={20} className="text-white/40" />
            </motion.div>
            <div className="hidden md:block text-right">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Premium Australian Wine</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Story Section - Editorial
const StorySection = () => {
  return (
    <section id="story" className="bg-[#0A0A0A] py-32 md:py-48" data-testid="about-section">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mb-32"
        >
          <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.3em] block mb-8">Our Philosophy</span>
          <h2 className="text-serif text-4xl md:text-5xl lg:text-6xl text-white font-light leading-[1.2]">
            From the southern edge of Australia, where land meets the Southern Ocean, 
            <span className="text-white/40"> we craft wines defined by balance, restraint, and clarity.</span>
          </h2>
        </motion.div>

        {/* Split Content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={images.about}
                alt="Winemaking"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay Card */}
            <div className="absolute -bottom-12 -right-8 md:right-8 bg-[#C9A96E] p-8 md:p-12 max-w-xs">
              <p className="text-[#0A0A0A] text-xs uppercase tracking-[0.2em] mb-3">Established</p>
              <p className="text-[#0A0A0A] text-serif text-4xl">2025</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:pl-8"
          >
            <div className="space-y-8 text-white/60 text-base md:text-lg leading-relaxed font-light">
              <p>
                Cape Jervis Wine takes its name from the southern coastal town of Cape Jervis, 
                where the Cape Jervis Lighthouse has long served as a point of direction — 
                a philosophy mirrored in our approach to winemaking.
              </p>
              <p>
                We believe the best wines are those that speak quietly but confidently. 
                Working with carefully selected vineyards influenced by cool maritime conditions, 
                we prioritise natural acidity, textural precision, and varietal expression.
              </p>
              <p>
                Minimal intervention in the winery allows each vintage to express itself 
                authentically, producing wines that are refined, composed, and distinctly Australian.
              </p>
            </div>
            <div className="mt-12 pt-12 border-t border-white/10">
              <a href="#collection" className="inline-flex items-center gap-4 text-white text-xs uppercase tracking-[0.2em] hover:text-[#C9A96E] transition-colors group">
                Discover Our Wines
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Video Section - Cinematic
const VideoSection = () => {
  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/vineyard-video.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]/90" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center px-8"
        >
          <p className="text-[#C9A96E] text-[10px] uppercase tracking-[0.4em] mb-6">Where Land Meets Ocean</p>
          <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-white font-light max-w-4xl leading-[1.1]">
            Shaped by the<br />
            <span className="italic">Southern Coast</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg mt-8 max-w-xl mx-auto font-light">
            The maritime influence of Australia's southern edge defines every bottle we craft.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Collection Section - Luxury Grid
const CollectionSection = () => {
  const wines = [
    {
      name: "Shiraz",
      slug: "shiraz",
      year: "2022",
      description: "Silky tannins, ripe fruit, smooth texture",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
    },
    {
      name: "Cabernet Sauvignon",
      slug: "cabernet-sauvignon",
      year: "2021",
      description: "Blackcurrant, cassis, elegant structure",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
    },
    {
      name: "Rosé",
      slug: "rose",
      year: "2024",
      description: "Fresh strawberry, zesty lime, dry finish",
      image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=800&q=80",
    },
    {
      name: "Chardonnay",
      slug: "chardonnay",
      description: "Citrus, melon, tropical fruit, honey",
      image: "https://images.unsplash.com/photo-1659004418358-5c47e4c9b945?w=800&q=80",
    },
    {
      name: "Merlot",
      slug: "merlot",
      year: "2022",
      description: "Plum, cherry, velvety tannins",
      image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80",
    },
  ];

  return (
    <section id="collection" className="bg-[#F5F3F0] py-32 md:py-48" data-testid="wines-section">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20"
        >
          <div>
            <span className="text-[#8B7355] text-[10px] uppercase tracking-[0.3em] block mb-6">The Collection</span>
            <h2 className="text-serif text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A] font-light">
              Our Wines
            </h2>
          </div>
          <p className="text-[#1A1A1A]/50 text-sm max-w-md mt-6 md:mt-0 font-light">
            A considered portfolio crafted for balance, longevity, and international appeal.
          </p>
        </motion.div>

        {/* Wine Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wines.map((wine, index) => (
            <motion.div
              key={wine.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            >
              <Link
                to={`/wines/${wine.slug}`}
                className="group block relative overflow-hidden bg-[#1A1A1A]"
                data-testid={`wine-card-${wine.slug}`}
              >
                <div className={`relative ${index === 0 ? 'aspect-square' : 'aspect-[4/5]'} overflow-hidden`}>
                  <img
                    src={wine.image}
                    alt={wine.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-white/50 text-[10px] uppercase tracking-[0.2em]">{wine.year}</span>
                    <ArrowRight size={20} className="text-white/0 group-hover:text-white transition-all duration-500 -translate-x-4 group-hover:translate-x-0" />
                  </div>
                  <div>
                    <h3 className={`text-serif text-white ${index === 0 ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'} font-light mb-3`}>
                      {wine.name}
                    </h3>
                    <p className="text-white/50 text-sm font-light">{wine.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Terroir Section - Immersive
const TerroirSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const features = [
    { number: "01", title: "Maritime Influence", description: "Cool coastal breezes moderate temperatures throughout the growing season." },
    { number: "02", title: "Extended Ripening", description: "Longer hang time develops complex flavours while retaining natural acidity." },
    { number: "03", title: "Ancient Soils", description: "Limestone and clay foundations contribute mineral complexity and structure." },
    { number: "04", title: "Minimal Intervention", description: "Traditional methods allow authentic expression of place and variety." },
  ];

  return (
    <section id="terroir" ref={ref} className="relative min-h-screen bg-[#0A0A0A]" data-testid="terroir-section">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={images.terroir}
          alt="Vineyard"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 py-32 md:py-48">
        <div className="max-w-[1800px] mx-auto px-8 md:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.3em] block mb-8">Origin</span>
              <h2 className="text-serif text-5xl md:text-6xl lg:text-7xl text-white font-light leading-[1.1] mb-8">
                Terroir &<br />Region
              </h2>
              <p className="text-white/50 text-lg font-light leading-relaxed max-w-md">
                Australia's diverse growing regions provide the foundation for our distinctive style—wines of freshness, structure, and clarity.
              </p>
            </motion.div>

            {/* Right - Features */}
            <div className="space-y-0">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.number}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-t border-white/10 py-8 group hover:bg-white/5 transition-colors px-4 -mx-4"
                >
                  <div className="flex gap-8">
                    <span className="text-[#C9A96E] text-sm">{feature.number}</span>
                    <div>
                      <h3 className="text-white text-xl font-light mb-2">{feature.title}</h3>
                      <p className="text-white/40 text-sm font-light">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Trade Section
const TradeSection = () => {
  return (
    <section id="trade" className="bg-[#F5F3F0] py-32 md:py-48" data-testid="trade-section">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#8B7355] text-[10px] uppercase tracking-[0.3em] block mb-8">Partnership</span>
            <h2 className="text-serif text-5xl md:text-6xl text-[#1A1A1A] font-light leading-[1.1] mb-8">
              Global<br />Distribution
            </h2>
            <p className="text-[#1A1A1A]/60 text-lg font-light leading-relaxed mb-8">
              Cape Jervis Wine is positioned for international distribution and export. 
              We work with distributors, hospitality buyers, and trade partners who value 
              consistency, integrity, and long-term collaboration.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-4 px-8 py-4 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#8B7355] transition-colors group"
              data-testid="trade-cta"
            >
              Trade Enquiries
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={images.vineyard}
                alt="Vineyard"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your enquiry. This is a visual mockup.");
  };

  return (
    <section id="contact" className="bg-[#0A0A0A] py-32 md:py-48" data-testid="contact-section">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C9A96E] text-[10px] uppercase tracking-[0.3em] block mb-8">Get in Touch</span>
            <h2 className="text-serif text-5xl md:text-6xl lg:text-7xl text-white font-light leading-[1.1] mb-8">
              Contact
            </h2>
            <p className="text-white/50 text-lg font-light leading-relaxed mb-12 max-w-md">
              For trade, distribution, or general enquiries, we'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail size={18} className="text-[#C9A96E]" />
                <span className="text-white/70 font-light">enquiries@capejerviswine.com.au</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={18} className="text-[#C9A96E]" />
                <span className="text-white/70 font-light">South Australia, Australia</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/30 focus:border-[#C9A96E] focus:outline-none transition-colors"
                    data-testid="contact-name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/30 focus:border-[#C9A96E] focus:outline-none transition-colors"
                    data-testid="contact-email"
                  />
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Company (Optional)"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/30 focus:border-[#C9A96E] focus:outline-none transition-colors"
                  data-testid="contact-company"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/30 focus:border-[#C9A96E] focus:outline-none transition-colors resize-none"
                  data-testid="contact-message"
                />
              </div>
              <button
                type="submit"
                className="px-10 py-5 bg-white text-[#0A0A0A] text-xs uppercase tracking-[0.2em] hover:bg-[#C9A96E] hover:text-white transition-all duration-500"
                data-testid="contact-submit"
              >
                Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5" data-testid="footer">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 py-20">
        {/* Main Footer */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div>
            <h3 className="text-serif text-4xl text-white font-light mb-4">Cape Jervis</h3>
            <p className="text-white/30 text-sm">Wine — Australia</p>
          </div>
          <div className="md:text-center">
            <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-4">Navigate</p>
            <div className="flex flex-col md:flex-row md:justify-center gap-4 md:gap-8">
              {["Story", "Collection", "Terroir", "Trade", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="md:text-right">
            <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-4">Location</p>
            <p className="text-white/50 text-sm">South Australia</p>
            <p className="text-white/50 text-sm">Australia</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            Please enjoy responsibly. You must be of legal drinking age.
          </p>
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Cape Jervis Wine — Australia
          </p>
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const HomePage = ({ isScrolled }) => {
  return (
    <>
      <Navigation isScrolled={isScrolled} />
      <main>
        <HeroSection />
        <StorySection />
        <VideoSection />
        <CollectionSection />
        <TerroirSection />
        <TradeSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

// App Content
function AppContent() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verified = localStorage.getItem("capejervis_age_verified");
    if (verified === "true") {
      setAgeVerified(true);
    }
  }, []);

  const handleAgeVerify = () => {
    localStorage.setItem("capejervis_age_verified", "true");
    setAgeVerified(true);
  };

  useEffect(() => {
    if (!ageVerified) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [ageVerified]);

  useEffect(() => {
    if (!ageVerified) return;

    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ageVerified]);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location]);

  return (
    <div className="App">
      <AnimatePresence>
        {!ageVerified && <AgeGate onVerify={handleAgeVerify} />}
      </AnimatePresence>

      {ageVerified && (
        <Routes>
          <Route path="/" element={<HomePage isScrolled={isScrolled} />} />
          <Route path="/wines/:wineSlug" element={<WineDetailPage />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
