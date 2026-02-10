import { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Wine, Thermometer, Clock, Grape } from "lucide-react";

// Wine data
const winesData = {
  shiraz: {
    name: "Shiraz",
    year: "2022",
    tagline: "Smooth. Versatile. Perfectly Balanced.",
    heroImage: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&q=80",
    description: "A medium-bodied, easy-drinking wine with silky tannins and ripe fruit flavours, crafted for versatility and enjoyment.",
    longDescription: `Our Shiraz features a harmonious balance of silky tannins, ripe fruit flavours, and classic varietal character, delivering a smooth, food-friendly style that's perfect for any occasion.

A medium-bodied, easy-drinking wine crafted for versatility and enjoyment. This Shiraz showcases the approachable side of the variety while maintaining the depth and character that Australian Shiraz is known for.

Whether paired with a hearty meal or enjoyed on its own, this wine delivers consistent quality and pleasure with every glass.`,
    tastingNotes: {
      appearance: "Deep garnet with purple hues",
      nose: "Ripe fruit, classic varietal aromatics",
      palate: "Medium-bodied, silky tannins, ripe fruit flavours, smooth texture",
      finish: "Smooth and food-friendly"
    },
    details: {
      alcohol: "14.5%",
      sugar: "2 g/L (Naturally Occurring)",
      residualSugar: "2 g/L",
      cellaringPotential: "5-8 years"
    },
    pairings: ["Lamb shoulder", "Aged hard cheeses", "Mushroom risotto", "Dark chocolate"],
    servingTemp: "16-18°C",
    decantTime: "30-60 minutes"
  },
  "cabernet-sauvignon": {
    name: "Cabernet Sauvignon",
    year: "2021",
    tagline: "Rich. Complex. Elegantly Structured.",
    heroImage: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80",
    description: "A rich, complex wine offering layers of flavour and elegant structure. Brick red in colour with expressive blackcurrant and leafy notes.",
    longDescription: `Our Cabernet is a rich, complex wine offering layers of flavour and elegant structure. Brick red in colour, it opens with an expressive nose of blackcurrant and leafy notes, complemented by hints of cassis, game, and subtle cigar box aromas.

This wine represents the pinnacle of our red wine portfolio, showcasing the depth and complexity that premium Cabernet Sauvignon can achieve. The careful vineyard selection and patient winemaking allow the true character of the variety to shine through.

A wine of sophistication and depth, perfect for special occasions or quiet moments of contemplation.`,
    tastingNotes: {
      appearance: "Brick red with depth",
      nose: "Expressive blackcurrant, leafy notes, cassis, game, subtle cigar box",
      palate: "Rich and complex, layered flavours, elegant structure",
      finish: "Persistent and structured with refined tannins"
    },
    details: {
      alcohol: "14.5%",
      sugar: "2 g/L (Naturally Occurring)",
      residualSugar: "2 g/L",
      cellaringPotential: "10-15 years"
    },
    pairings: ["Beef fillet", "Venison", "Aged cheddar", "Lamb rack"],
    servingTemp: "17-19°C",
    decantTime: "1-2 hours"
  },
  rose: {
    name: "Rosé",
    year: "2024",
    tagline: "Vibrant. Elegant. Australian Summer.",
    heroImage: "https://images.unsplash.com/photo-1635232822657-3dcae6c7e715?w=1920&q=80",
    description: "Pale in colour and vibrant in character, perfectly balancing fresh strawberry and zesty lime in an elegant, dry style.",
    longDescription: `Pale in colour and vibrant in character, our Rosé strikes a perfect balance between fresh strawberry and zesty lime—crafted in a style that captures the essence of the Australian summer.

Hand-selected by our winemaker, it delivers both intensity and complexity of flavour, while maintaining the dryness and delicate structure essential to this elegant Rosé.

A wine that embodies sophistication and refreshment in equal measure, perfect for warm days and relaxed gatherings.`,
    tastingNotes: {
      appearance: "Pale salmon with delicate hue",
      nose: "Fresh strawberry, zesty lime, summer fruits",
      palate: "Dry, intense flavour, complex character, delicate structure",
      finish: "Clean and refreshing with elegant dryness"
    },
    details: {
      alcohol: "13.5%",
      sugar: "2 g/L (Naturally Occurring)",
      residualSugar: "2 g/L",
      cellaringPotential: "1-2 years"
    },
    pairings: ["Fresh seafood", "Mediterranean salads", "Grilled vegetables", "Soft cheeses"],
    servingTemp: "8-10°C",
    decantTime: "None required"
  },
  chardonnay: {
    name: "Chardonnay",
    year: "2023",
    tagline: "Fresh. Lively. Effortlessly Balanced.",
    heroImage: "https://images.unsplash.com/photo-1566754436905-a083d30e3b62?w=1920&q=80",
    description: "Fresh and lively with vibrant citrus peel and melon aromas, layered with ripe tropical fruit and a subtle hint of honey.",
    longDescription: `Our Chardonnay is a fresh, lively wine that delivers vibrant citrus peel and melon aromas, layered with ripe tropical fruit and a subtle hint of honey. On the palate, rich tropical flavours are balanced by a soft, easy-drinking texture and a touch of viscosity that adds weight without heaviness.

This wine showcases the best of cool-climate Australian Chardonnay — bright, fruit-forward, and elegantly structured. The careful winemaking process preserves the natural freshness while building complexity through subtle oak integration.

Perfect for those who appreciate a Chardonnay that balances richness with refreshing acidity.`,
    tastingNotes: {
      appearance: "Pale straw with green highlights",
      nose: "Vibrant citrus peel, melon, ripe tropical fruit, subtle honey",
      palate: "Rich tropical flavours, soft easy-drinking texture, touch of viscosity",
      finish: "Clean and refreshing with balanced weight"
    },
    details: {
      alcohol: "13.5%",
      sugar: "2 g/L (Naturally Occurring)",
      residualSugar: "2 g/L",
      cellaringPotential: "3-5 years"
    },
    pairings: ["Roasted chicken", "Grilled fish", "Creamy pasta", "Triple cream brie"],
    servingTemp: "10-12°C",
    decantTime: "None required"
  },
  merlot: {
    name: "Merlot",
    year: "2022",
    tagline: "Smooth. Approachable. Quietly Complex.",
    heroImage: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1920&q=80",
    description: "Velvety and approachable, with plum, cherry, and hints of chocolate. Soft tannins and a supple texture make this wine immediately enjoyable.",
    longDescription: `Our Merlot showcases the softer, more approachable side of cool-climate red winemaking. While often overshadowed by its more structured siblings, Merlot from the right site and in the right hands can produce wines of genuine character and quiet complexity.

The wine presents a medium ruby colour with garnet edges. Aromatics of ripe plum, cherry, and a hint of milk chocolate invite you in, while subtle notes of bay leaf and dried herbs add intrigue. The palate is immediately appealing — soft, velvety tannins carry flavours of dark fruit and mocha to a medium-length finish.

This is a wine designed for enjoyment rather than contemplation, though it rewards attention with layers of flavour that reveal themselves over time in the glass.`,
    tastingNotes: {
      appearance: "Medium ruby with garnet edge",
      nose: "Plum, cherry, milk chocolate, bay leaf, dried herbs",
      palate: "Medium-bodied, velvety tannins, dark fruit, mocha",
      finish: "Smooth and supple with gentle persistence"
    },
    details: {
      alcohol: "13.8%",
      acidity: "5.4 g/L",
      residualSugar: "2.4 g/L",
      cellaringPotential: "5-8 years"
    },
    pairings: ["Duck breast", "Pork tenderloin", "Mushroom dishes", "Semi-hard cheeses"],
    servingTemp: "15-17°C",
    decantTime: "15-30 minutes"
  }
};

const wineOrder = ["shiraz", "cabernet-sauvignon", "rose", "chardonnay", "merlot"];

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export const WineDetailPage = () => {
  const { wineSlug } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  
  const wine = winesData[wineSlug];
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Get prev/next wines
  const currentIndex = wineOrder.indexOf(wineSlug);
  const prevWine = currentIndex > 0 ? wineOrder[currentIndex - 1] : null;
  const nextWine = currentIndex < wineOrder.length - 1 ? wineOrder[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [wineSlug]);

  if (!wine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7]">
        <div className="text-center">
          <h1 className="text-serif text-4xl text-[#1A1A1A] mb-4">Wine Not Found</h1>
          <Link to="/#wines" className="btn-primary">Return to Collection</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F7]" data-testid={`wine-page-${wineSlug}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#F9F9F7]/90 border-b border-[#1A1A1A]/5">
        <div className="section-container">
          <div className="flex items-center justify-between py-6">
            <Link to="/" className="text-serif text-xl tracking-tight text-[#1A1A1A]">
              Cape Jervis
            </Link>
            <Link 
              to="/#wines" 
              className="nav-link text-[#1A1A1A] flex items-center gap-2"
              data-testid="back-to-wines"
            >
              <ArrowLeft size={16} />
              Back to Collection
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img
            src={wine.heroImage}
            alt={wine.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent" />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative z-10 section-container pb-16 md:pb-24"
        >
          <motion.p 
            {...fadeUp}
            className="text-[#4B7F78] text-xs uppercase tracking-[0.2em] mb-4"
          >
            {wine.year} Vintage
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-serif text-5xl md:text-7xl lg:text-8xl text-[#F9F9F7] mb-4"
          >
            {wine.name}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#F9F9F7]/80 text-lg md:text-xl tracking-wide"
          >
            {wine.tagline}
          </motion.p>
        </motion.div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 border-b border-[#1A1A1A]/10">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[#4B7F78] text-xs uppercase tracking-[0.2em] mb-6">
                Overview
              </p>
              <p className="text-[#1A1A1A]/80 text-lg leading-relaxed whitespace-pre-line">
                {wine.longDescription}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Quick Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 border border-[#1A1A1A]/10">
                  <Wine size={24} className="text-[#4B7F78] mb-3" />
                  <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/50 mb-1">Alcohol</p>
                  <p className="text-[#1A1A1A] font-medium">{wine.details.alcohol}</p>
                </div>
                <div className="p-6 border border-[#1A1A1A]/10">
                  <Thermometer size={24} className="text-[#4B7F78] mb-3" />
                  <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/50 mb-1">Serving Temp</p>
                  <p className="text-[#1A1A1A] font-medium">{wine.servingTemp}</p>
                </div>
                <div className="p-6 border border-[#1A1A1A]/10">
                  <Clock size={24} className="text-[#4B7F78] mb-3" />
                  <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/50 mb-1">Decant Time</p>
                  <p className="text-[#1A1A1A] font-medium">{wine.decantTime}</p>
                </div>
                <div className="p-6 border border-[#1A1A1A]/10">
                  <Grape size={24} className="text-[#4B7F78] mb-3" />
                  <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/50 mb-1">Cellaring</p>
                  <p className="text-[#1A1A1A] font-medium">{wine.details.cellaringPotential}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tasting Notes */}
      <section className="py-16 md:py-24 bg-[#1A1A1A]">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#4B7F78] text-xs uppercase tracking-[0.2em] mb-6">
              Tasting Notes
            </p>
            <h2 className="text-serif text-4xl md:text-5xl text-[#F9F9F7] mb-12">
              Character & Profile
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(wine.tastingNotes).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-l-2 border-[#4B7F78] pl-6"
              >
                <h3 className="text-[#F9F9F7] text-xs uppercase tracking-[0.15em] mb-3 capitalize">
                  {key}
                </h3>
                <p className="text-[#F9F9F7]/70 text-sm leading-relaxed">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Pairings */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-[#4B7F78] text-xs uppercase tracking-[0.2em] mb-6">
              Pairs With
            </p>
            <h2 className="text-serif text-4xl md:text-5xl text-[#1A1A1A] mb-8">
              Food Pairings
            </h2>
            <div className="flex flex-wrap gap-4">
              {wine.pairings.map((pairing, index) => (
                <motion.span
                  key={pairing}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="px-6 py-3 border border-[#1A1A1A]/20 text-[#1A1A1A] text-sm"
                >
                  {pairing}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 md:py-24 bg-[#E6E2DD]">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#4B7F78] text-xs uppercase tracking-[0.2em] mb-6">
              Technical
            </p>
            <h2 className="text-serif text-4xl md:text-5xl text-[#1A1A1A] mb-12">
              Wine Details
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {Object.entries(wine.details).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/50 mb-2">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-serif text-2xl text-[#1A1A1A]">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation to Other Wines */}
      <section className="py-16 md:py-24 border-t border-[#1A1A1A]/10">
        <div className="section-container">
          <div className="flex justify-between items-center">
            {prevWine ? (
              <Link
                to={`/wines/${prevWine}`}
                className="group flex items-center gap-4 text-[#1A1A1A] hover:text-[#4B7F78] transition-colors"
                data-testid="prev-wine-link"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/50 mb-1">Previous</p>
                  <p className="text-serif text-xl">{winesData[prevWine].name}</p>
                </div>
              </Link>
            ) : <div />}

            {nextWine ? (
              <Link
                to={`/wines/${nextWine}`}
                className="group flex items-center gap-4 text-[#1A1A1A] hover:text-[#4B7F78] transition-colors text-right"
                data-testid="next-wine-link"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#1A1A1A]/50 mb-1">Next</p>
                  <p className="text-serif text-xl">{winesData[nextWine].name}</p>
                </div>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 bg-[#1A1A1A]">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-serif text-4xl md:text-5xl text-[#F9F9F7] mb-6">
              Interested in Our Wines?
            </h2>
            <p className="text-[#F9F9F7]/70 mb-10 max-w-xl mx-auto">
              For trade enquiries, distribution partnerships, or to learn more about Cape Jervis Wine, get in touch with our team.
            </p>
            <Link to="/#contact" className="btn-light inline-flex items-center gap-3">
              Contact Us
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WineDetailPage;
