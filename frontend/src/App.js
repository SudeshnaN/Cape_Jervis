import { useEffect, useState, useRef } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Wine, Leaf, Globe, MapPin, Mail, Phone, ArrowRight, Menu, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./components/ui/dialog";
import WineDetailPage from "./pages/WineDetailPage";

// Design Colors
const colors = {
  chalk: "#F9F9F7",
  charcoal: "#1A1A1A",
  sand: "#E6E2DD",
  olive: "#4A5D46",
  copper: "#4B7F78",
  wine: "#5D1822",
};

// Images from design guidelines
const images = {
  heroLighthouse: "https://images.unsplash.com/photo-1707398367347-3c35128081cb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxDYXBlJTIwSmVydmlzJTIwbGlnaHRob3VzZSUyMGNvYXN0JTIwYXVzdHJhbGlhfGVufDB8fHx8MTc3MDcxODcwMXww&ixlib=rb-4.1.0&q=85",
  vineyardSunset: "https://images.unsplash.com/photo-1643190919973-f14e5ca6d301?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHx2aW5leWFyZCUyMHJvd3MlMjBzdW5zZXQlMjBhdXN0cmFsaWF8ZW58MHx8fHwxNzcwNzE4NzA5fDA&ixlib=rb-4.1.0&q=85",
  wineBottle: "https://images.unsplash.com/photo-1759971408697-a0ae9a906e4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwzfHxwcmVtaXVtJTIwcmVkJTIwd2luZSUyMGJvdHRsZSUyMHN0dWRpbyUyMGxpZ2h0aW5nJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzcwNzE4NzA3fDA&ixlib=rb-4.1.0&q=85",
  wineCollection: "https://images.unsplash.com/photo-1565151461167-84645f3f7788?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcmVkJTIwd2luZSUyMGJvdHRsZSUyMHN0dWRpbyUyMGxpZ2h0aW5nJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzcwNzE4NzA3fDA&ixlib=rb-4.1.0&q=85",
  textureLimestone: "https://images.unsplash.com/photo-1764021996050-a9936cf2a431?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxsaW1lc3RvbmUlMjByb2NrJTIwdGV4dHVyZSUyMG1hY3JvfGVufDB8fHx8MTc3MDcxODcxNHww&ixlib=rb-4.1.0&q=85",
};

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.15 },
  },
};

// Age Gate Component
const AgeGate = ({ onVerify }) => {
  return (
    <div className="age-gate-overlay" data-testid="age-gate-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6 max-w-md"
      >
        <h1 className="text-serif text-5xl md:text-6xl text-[#F9F9F7] mb-8">
          Cape Jervis
        </h1>
        <p className="text-[#F9F9F7]/70 text-sm tracking-wide mb-12">
          To enter this site, you must be of legal drinking age in your country of residence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onVerify}
            className="btn-light"
            data-testid="age-verify-yes"
          >
            I Am of Legal Age
          </button>
          <a
            href="https://www.google.com"
            className="px-8 py-4 text-xs uppercase tracking-[0.2em] text-[#F9F9F7]/60 hover:text-[#F9F9F7] transition-colors duration-300"
            data-testid="age-verify-no"
          >
            I Am Not
          </a>
        </div>
        <p className="text-[#F9F9F7]/40 text-xs mt-12 tracking-wide">
          Please enjoy responsibly
        </p>
      </motion.div>
    </div>
  );
};

// Navigation Component
const Navigation = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Wines", href: "#wines" },
    { label: "Terroir", href: "#terroir" },
    { label: "Trade", href: "#trade" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-md bg-[#F9F9F7]/90 border-b border-[#1A1A1A]/5"
          : "bg-transparent"
      }`}
      data-testid="main-navigation"
    >
      <div className="section-container">
        <div className="flex items-center justify-between py-6">
          <a href="#" className="text-serif text-xl tracking-tight text-[#1A1A1A]" data-testid="nav-logo">
            Cape Jervis
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-[#1A1A1A]"
                data-testid={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1A1A1A]"
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden pb-6"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 nav-link text-[#1A1A1A]"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src={images.heroLighthouse}
          alt="Cape Jervis Lighthouse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[#F9F9F7]/80 text-xs uppercase tracking-[0.3em] mb-6"
        >
          Australia
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-serif text-5xl sm:text-6xl lg:text-8xl text-[#F9F9F7] mb-8"
          data-testid="hero-title"
        >
          Cape Jervis Wine
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-[#F9F9F7]/90 text-base md:text-lg tracking-wide max-w-xl mx-auto mb-12"
          data-testid="hero-subtitle"
        >
          Australian wines shaped by coast, climate, and clarity.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          href="#wines"
          className="btn-light inline-flex items-center gap-3"
          data-testid="hero-cta"
        >
          Explore Our Wines
          <ArrowRight size={16} />
        </motion.a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-[#F9F9F7]/40"
        />
      </motion.div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-[#1A1A1A] py-24 md:py-32 lg:py-40"
      data-testid="about-section"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Content */}
          <motion.div {...fadeUp}>
            <p className="text-[#4B7F78] text-xs uppercase tracking-[0.2em] mb-6">
              Our Philosophy
            </p>
            <h2 className="text-serif text-4xl md:text-5xl lg:text-6xl text-[#F9F9F7] mb-8">
              About Cape Jervis Wine
            </h2>
            <div className="space-y-6 text-[#F9F9F7]/70 text-base leading-relaxed">
              <p>
                Cape Jervis Wine draws its identity from a landscape defined by exposure
                and light. The Cape Jervis Lighthouse has long served as a point of
                direction along Australia's southern coast — a philosophy mirrored in
                our approach to winemaking.
              </p>
              <p>
                We believe the best wines are those that speak quietly but confidently.
                Working with carefully selected vineyards influenced by cool maritime
                conditions, we prioritise balance, natural acidity, and textural precision.
              </p>
              <p>
                Minimal intervention in the winery allows each varietal and vintage to
                express itself authentically, producing wines that are refined, composed,
                and distinctly Australian.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img
              src={images.vineyardSunset}
              alt="Australian vineyard at sunset"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Intro Quote */}
        <motion.div
          {...fadeUp}
          className="mt-24 lg:mt-32 border-t border-[#F9F9F7]/10 pt-16"
        >
          <blockquote className="text-serif text-2xl md:text-3xl lg:text-4xl text-[#F9F9F7]/90 italic max-w-3xl">
            "From the southern edge of Australia, Cape Jervis Wine is guided by place,
            precision, and restraint."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

// Wines Section
const WinesSection = () => {
  const wines = [
    {
      name: "Shiraz",
      slug: "shiraz",
      year: "2022",
      description:
        "Medium-bodied and composed, with dark berry fruit, subtle spice, and fine tannins. A structured wine that reflects both maritime influence and varietal clarity.",
      notes: "Dark Berry, Subtle Spice, Fine Tannins",
      pairing: "Lamb, Aged Cheeses, Dark Chocolate",
    },
    {
      name: "Cabernet Sauvignon",
      slug: "cabernet-sauvignon",
      year: "2021",
      description:
        "Elegant and structured, with cassis, herbal notes, and refined tannins. Crafted for balance and cellaring potential.",
      notes: "Cassis, Herbal Notes, Refined Tannins",
      pairing: "Beef, Game Meats, Aged Cheddar",
    },
    {
      name: "Rosé",
      slug: "rose",
      year: "2024",
      description:
        "Pale salmon in colour with delicate notes of wild strawberry, citrus blossom, and a crisp, mineral finish.",
      notes: "Wild Strawberry, Citrus Blossom, Mineral",
      pairing: "Fresh Seafood, Mediterranean Salads",
    },
    {
      name: "Chardonnay",
      slug: "chardonnay",
      year: "2023",
      description:
        "Fresh and precise, showing citrus, stone fruit, and restrained oak. Balanced acidity and texture lead to a clean, extended finish.",
      notes: "Citrus, Stone Fruit, Restrained Oak",
      pairing: "Seafood, Poultry, Creamy Pasta",
    },
    {
      name: "Merlot",
      slug: "merlot",
      year: "2022",
      description:
        "Velvety and approachable, with plum, cherry, and hints of chocolate. Soft tannins and a supple texture make this wine immediately enjoyable.",
      notes: "Plum, Cherry, Chocolate",
      pairing: "Duck, Pork, Mushroom Dishes",
    },
  ];

  return (
    <section
      id="wines"
      className="bg-[#F9F9F7] py-24 md:py-32 lg:py-40"
      data-testid="wines-section"
    >
      <div className="section-container">
        {/* Header */}
        <motion.div {...fadeUp} className="mb-16 md:mb-24">
          <p className="text-[#4B7F78] text-xs uppercase tracking-[0.2em] mb-6">
            The Collection
          </p>
          <h2 className="text-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-8">
            Our Wines
          </h2>
          <p className="text-[#1A1A1A]/70 max-w-2xl text-base leading-relaxed">
            Cape Jervis Wine produces a considered portfolio of Australian wines crafted
            for balance, longevity, and international appeal. Each wine is shaped by
            vineyard expression, coastal influence, purity of fruit, and natural
            structure.
          </p>
        </motion.div>

        {/* Wines Grid - Horizontal Scroll on Mobile */}
        <div className="horizontal-scroll lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {wines.map((wine, index) => (
            <motion.div
              key={wine.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="min-w-[280px] lg:min-w-0 mr-6 lg:mr-0"
            >
              <Link 
                to={`/wines/${wine.slug}`}
                className="wine-card group block transition-colors duration-500 h-full"
                data-testid={`wine-card-${wine.slug}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-serif text-2xl text-[#1A1A1A] group-hover:text-[#4B7F78] transition-colors">
                    {wine.name}
                  </h3>
                  <span className="text-[#1A1A1A]/40 text-sm">{wine.year}</span>
                </div>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed mb-6 line-clamp-3">
                  {wine.description}
                </p>
                <div className="space-y-3 border-t border-[#1A1A1A]/10 pt-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/50 mb-1">
                      Tasting Notes
                    </p>
                    <p className="text-xs text-[#1A1A1A]">{wine.notes}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2 text-[#4B7F78] text-xs uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ArrowRight size={14} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Wine Attributes */}
        <motion.div
          {...fadeUp}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#1A1A1A]/10 pt-16"
        >
          {[
            { icon: <Leaf size={24} />, label: "Vineyard Expression" },
            { icon: <Wine size={24} />, label: "Coastal Influence" },
            { icon: <Globe size={24} />, label: "Purity of Fruit" },
            { icon: <MapPin size={24} />, label: "Natural Structure" },
          ].map((item, index) => (
            <div key={item.label} className="text-center">
              <div className="text-[#4B7F78] mb-4 flex justify-center">{item.icon}</div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/70">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Terroir Section
const TerroirSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="terroir"
      ref={ref}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      data-testid="terroir-section"
    >
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src={images.textureLimestone}
          alt="Limestone texture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/85" />
      </motion.div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Content */}
          <motion.div {...fadeUp}>
            <p className="text-[#4B7F78] text-xs uppercase tracking-[0.2em] mb-6">
              Origin
            </p>
            <h2 className="text-serif text-4xl md:text-5xl lg:text-6xl text-[#F9F9F7] mb-8">
              Regions & Terroir
            </h2>
            <div className="space-y-6 text-[#F9F9F7]/70 text-base leading-relaxed">
              <p>
                Australia's diverse growing regions provide the foundation for Cape Jervis
                Wine's style. The vineyards associated with the portfolio benefit from
                unique environmental conditions that define our wines.
              </p>
              <p>
                These conditions result in wines of freshness, structure, and clarity —
                hallmarks of the Cape Jervis Wine approach.
              </p>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {[
              {
                title: "Proximity to the Coast",
                description: "Cool maritime breezes moderate temperatures and extend the growing season.",
              },
              {
                title: "Cool Growing Seasons",
                description: "Lower temperatures preserve natural acidity and develop complex aromatics.",
              },
              {
                title: "Extended Ripening",
                description: "Longer hang time allows for full phenolic development and balanced sugars.",
              },
              {
                title: "Natural Acidity",
                description: "Retained acidity provides freshness, structure, and ageing potential.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-l-2 border-[#4B7F78] pl-6"
              >
                <h3 className="text-serif text-xl text-[#F9F9F7] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#F9F9F7]/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Trade Section
const TradeSection = () => {
  return (
    <section
      id="trade"
      className="bg-[#E6E2DD] py-24 md:py-32 lg:py-40"
      data-testid="trade-section"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square overflow-hidden order-2 lg:order-1"
          >
            <img
              src={images.wineCollection}
              alt="Premium wine collection"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div {...fadeUp} className="order-1 lg:order-2">
            <p className="text-[#4B7F78] text-xs uppercase tracking-[0.2em] mb-6">
              Partnership
            </p>
            <h2 className="text-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-8">
              Global Markets
            </h2>
            <div className="space-y-6 text-[#1A1A1A]/70 text-base leading-relaxed mb-10">
              <p>
                Cape Jervis Wine is positioned for international distribution and export.
                Our wines are crafted to meet the expectations of global markets while
                retaining a strong sense of Australian provenance.
              </p>
              <p>
                We work with distributors, hospitality buyers, and trade partners who
                value consistency, integrity, and long-term collaboration.
              </p>
            </div>
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-3"
              data-testid="trade-cta"
            >
              Trade & Distribution Enquiries
              <ArrowRight size={16} />
            </a>
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
    enquiryType: "general",
    message: "",
    newsletter: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Visual mockup - no actual submission
    alert("Thank you for your enquiry. This is a visual mockup.");
  };

  return (
    <section
      id="contact"
      className="bg-[#F9F9F7] py-24 md:py-32 lg:py-40"
      data-testid="contact-section"
    >
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Info */}
          <motion.div {...fadeUp}>
            <p className="text-[#4B7F78] text-xs uppercase tracking-[0.2em] mb-6">
              Get in Touch
            </p>
            <h2 className="text-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-8">
              Contact
            </h2>
            <p className="text-[#1A1A1A]/70 text-base leading-relaxed mb-10">
              For trade, distribution, or general enquiries, please get in touch.
              We welcome conversations with partners who share our commitment to
              quality and authenticity.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-[#4B7F78]" />
                <span className="text-[#1A1A1A]">enquiries@capejerviswine.com.au</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-[#4B7F78]" />
                <span className="text-[#1A1A1A]">+61 8 XXXX XXXX</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={20} className="text-[#4B7F78]" />
                <span className="text-[#1A1A1A]">South Australia, Australia</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-8" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-underline"
                  data-testid="contact-name"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-underline"
                  data-testid="contact-email"
                />
              </div>

              <input
                type="text"
                placeholder="Company (Optional)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="input-underline"
                data-testid="contact-company"
              />

              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/50 mb-4">
                  Enquiry Type
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: "general", label: "General" },
                    { value: "trade", label: "Trade & Distribution" },
                    { value: "press", label: "Press & Media" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 border transition-colors ${
                          formData.enquiryType === option.value
                            ? "bg-[#1A1A1A] border-[#1A1A1A]"
                            : "border-[#1A1A1A]/30 group-hover:border-[#1A1A1A]/50"
                        }`}
                      />
                      <input
                        type="radio"
                        name="enquiryType"
                        value={option.value}
                        checked={formData.enquiryType === option.value}
                        onChange={(e) =>
                          setFormData({ ...formData, enquiryType: e.target.value })
                        }
                        className="sr-only"
                      />
                      <span className="text-sm text-[#1A1A1A]">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="input-underline resize-none"
                data-testid="contact-message"
              />

              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  className={`w-4 h-4 border mt-0.5 transition-colors ${
                    formData.newsletter
                      ? "bg-[#1A1A1A] border-[#1A1A1A]"
                      : "border-[#1A1A1A]/30 group-hover:border-[#1A1A1A]/50"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, newsletter: !formData.newsletter })
                  }
                />
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) =>
                    setFormData({ ...formData, newsletter: e.target.checked })
                  }
                  className="sr-only"
                  data-testid="contact-newsletter"
                />
                <span className="text-sm text-[#1A1A1A]/70">
                  Subscribe to receive updates on new releases and vineyard news
                </span>
              </label>

              <button type="submit" className="btn-primary" data-testid="contact-submit">
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
    <footer
      className="bg-[#1A1A1A] py-24 md:py-32"
      data-testid="footer"
    >
      <div className="section-container">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="text-serif text-6xl md:text-7xl lg:text-8xl text-[#F9F9F7] mb-8">
            Cape Jervis
          </h2>
          <p className="text-[#F9F9F7]/50 text-sm tracking-wide max-w-md mx-auto">
            Australian wines shaped by coast, climate, and clarity.
          </p>
        </motion.div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {["About", "Wines", "Terroir", "Trade", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="nav-link text-[#F9F9F7]/60 hover:text-[#F9F9F7]"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Legal */}
        <div className="border-t border-[#F9F9F7]/10 pt-12 text-center">
          <p className="text-[#F9F9F7]/40 text-xs tracking-wide mb-4">
            Please enjoy responsibly.
          </p>
          <p className="text-[#F9F9F7]/40 text-xs tracking-wide mb-8">
            You must be of legal drinking age to visit this site.
          </p>
          <p className="text-[#F9F9F7]/30 text-xs tracking-wide">
            © {new Date().getFullYear()} Cape Jervis Wine — Australia
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check localStorage for age verification
  useEffect(() => {
    const verified = localStorage.getItem("capejervis_age_verified");
    if (verified === "true") {
      setAgeVerified(true);
    }
  }, []);

  // Handle age verification
  const handleAgeVerify = () => {
    localStorage.setItem("capejervis_age_verified", "true");
    setAgeVerified(true);
  };

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!ageVerified) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [ageVerified]);

  // Handle scroll for navigation
  useEffect(() => {
    if (!ageVerified) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ageVerified]);

  return (
    <div className="App">
      {/* Age Gate */}
      <AnimatePresence>
        {!ageVerified && <AgeGate onVerify={handleAgeVerify} />}
      </AnimatePresence>

      {/* Main Site */}
      {ageVerified && (
        <>
          {/* Grain Overlay */}
          <div className="grain-overlay" aria-hidden="true" />

          {/* Navigation */}
          <Navigation isScrolled={isScrolled} />

          {/* Main Content */}
          <main>
            <HeroSection />
            <AboutSection />
            <WinesSection />
            <TerroirSection />
            <TradeSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
