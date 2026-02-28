import { useEffect, useLayoutEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Wine data
const winesData = {
  shiraz: {
    name: "Shiraz",
    tagline: "Smooth. Versatile. Perfectly Balanced.",
    heroImage: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&q=80",
    bottleImage: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?w=800&q=80",
    description: "A medium-bodied, easy-drinking wine with silky tannins and ripe fruit flavours, crafted for versatility and enjoyment.",
    longDescription: `Our Shiraz features a harmonious balance of silky tannins, ripe fruit flavours, and classic varietal character, delivering a smooth, food-friendly style that's perfect for any occasion.

A medium-bodied, easy-drinking wine crafted for versatility and enjoyment. This Shiraz showcases the approachable side of the variety while maintaining the depth and character that Australian Shiraz is known for.`,
    tastingNotes: {
      appearance: "Deep garnet with purple hues",
      nose: "Ripe fruit, classic varietal aromatics",
      palate: "Medium-bodied, silky tannins, ripe fruit flavours, smooth texture",
      finish: "Smooth and food-friendly"
    },
    characteristics: {
      varietal: "Australia's signature red grape, Shiraz thrives in our cool coastal climate, developing elegance over power.",
      philosophy: "Minimal intervention allows the fruit to speak, reflecting our commitment to authenticity and place.",
      expression: "Cool maritime influence brings restraint and finesse to this approachable yet complex wine.",
      occasion: "Versatile enough for casual dinners yet refined enough for special moments."
    },
    pairings: ["Lamb shoulder", "Aged hard cheeses", "Mushroom risotto", "Dark chocolate"],
    servingTemp: "16-18°C",
    accentColor: "#722F37"
  },
  "cabernet-sauvignon": {
    name: "Cabernet Sauvignon",
    tagline: "Rich. Complex. Elegantly Structured.",
    heroImage: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&q=80",
    bottleImage: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80",
    description: "A rich, complex wine offering layers of flavour and elegant structure. Brick red with expressive blackcurrant and leafy notes.",
    longDescription: `Our Cabernet is a rich, complex wine offering layers of flavour and elegant structure. Brick red in colour, it opens with an expressive nose of blackcurrant and leafy notes, complemented by hints of cassis, game, and subtle cigar box aromas.

This wine represents the pinnacle of our red wine portfolio, showcasing the depth and complexity that premium Cabernet Sauvignon can achieve.`,
    tastingNotes: {
      appearance: "Brick red with depth",
      nose: "Expressive blackcurrant, leafy notes, cassis, game, subtle cigar box",
      palate: "Rich and complex, layered flavours, elegant structure",
      finish: "Persistent and structured with refined tannins"
    },
    characteristics: {
      varietal: "The noble Cabernet Sauvignon, given time and cool conditions to develop its hallmark structure and depth.",
      philosophy: "Patient winemaking honours the grape's natural complexity, embodying our pursuit of quiet confidence.",
      expression: "Extended ripening on the vine builds layers of flavour while retaining the freshness of our coastal terroir.",
      occasion: "A wine for contemplation and celebration, rewarding patience and attention."
    },
    pairings: ["Roasted lamb", "Venison", "Aged cheddar", "Herb-crusted rack"],
    servingTemp: "17-19°C",
    accentColor: "#4A0E0E"
  },
  rose: {
    name: "Rosé",
    tagline: "Vibrant. Elegant. Australian Summer.",
    heroImage: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=1920&q=80",
    bottleImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description: "Pale in colour and vibrant in character, perfectly balancing fresh strawberry and zesty lime in an elegant, dry style.",
    longDescription: `Pale in colour and vibrant in character, our Rosé strikes a perfect balance between fresh strawberry and zesty lime—crafted in a style that captures the essence of the Australian summer.

Hand-selected by our winemaker, it delivers both intensity and complexity of flavour, while maintaining the dryness and delicate structure essential to this elegant Rosé.`,
    tastingNotes: {
      appearance: "Pale salmon with delicate hue",
      nose: "Fresh strawberry, zesty lime, summer fruits",
      palate: "Dry, intense flavour, complex character, delicate structure",
      finish: "Clean and refreshing with elegant dryness"
    },
    characteristics: {
      varietal: "Crafted in the Provençal tradition, our Rosé captures light and freshness in every glass.",
      philosophy: "Precision and restraint define this wine—nothing more, nothing less than pure expression.",
      expression: "The bright acidity of our coastal vineyards creates a wine of clarity and refreshment.",
      occasion: "From afternoon gatherings to seaside moments, a wine that embodies effortless elegance."
    },
    pairings: ["Fresh seafood", "Mediterranean salads", "Grilled vegetables", "Soft cheeses"],
    servingTemp: "8-10°C",
    accentColor: "#D4A5A5"
  },
  chardonnay: {
    name: "Chardonnay",
    tagline: "Fresh. Lively. Effortlessly Balanced.",
    heroImage: "https://images.unsplash.com/photo-1659004418358-5c47e4c9b945?w=1920&q=80",
    bottleImage: "https://images.unsplash.com/photo-1569919659476-f0852f9fcc25?w=800&q=80",
    description: "Fresh and lively with vibrant citrus peel and melon aromas, layered with ripe tropical fruit and a subtle hint of honey.",
    longDescription: `Our Chardonnay is a fresh, lively wine that delivers vibrant citrus peel and melon aromas, layered with ripe tropical fruit and a subtle hint of honey. On the palate, rich tropical flavours are balanced by a soft, easy-drinking texture and a touch of viscosity that adds weight without heaviness.

Perfect for those who appreciate a Chardonnay that balances richness with refreshing acidity.`,
    tastingNotes: {
      appearance: "Pale straw with green highlights",
      nose: "Vibrant citrus peel, melon, ripe tropical fruit, subtle honey",
      palate: "Rich tropical flavours, soft easy-drinking texture, touch of viscosity",
      finish: "Clean and refreshing with balanced weight"
    },
    characteristics: {
      varietal: "The world's most versatile white grape, expressing our terroir with precision and purity.",
      philosophy: "Gentle handling preserves natural fruit character, reflecting our belief in minimal intervention.",
      expression: "Cool climate conditions retain bright acidity, creating balance between richness and freshness.",
      occasion: "From elegant dinners to relaxed afternoons, a wine of sophistication without pretense."
    },
    pairings: ["Roasted chicken", "Grilled fish", "Creamy pasta", "Triple cream brie"],
    servingTemp: "10-12°C",
    accentColor: "#C4A35A"
  },
  merlot: {
    name: "Merlot",
    tagline: "Smooth. Approachable. Quietly Complex.",
    heroImage: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=1920&q=80",
    bottleImage: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?w=800&q=80",
    description: "Velvety and approachable, with plum, cherry, and hints of chocolate. Soft tannins and a supple texture.",
    longDescription: `Our Merlot showcases the softer, more approachable side of cool-climate red winemaking. The wine presents a medium ruby colour with garnet edges.

Aromatics of ripe plum, cherry, and a hint of milk chocolate invite you in, while subtle notes of bay leaf and dried herbs add intrigue. The palate is immediately appealing — soft, velvety tannins carry flavours of dark fruit and mocha.`,
    tastingNotes: {
      appearance: "Medium ruby with garnet edge",
      nose: "Plum, cherry, milk chocolate, bay leaf, dried herbs",
      palate: "Medium-bodied, velvety tannins, dark fruit, mocha",
      finish: "Smooth and supple with gentle persistence"
    },
    characteristics: {
      varietal: "Often underestimated, Merlot in our hands becomes a wine of genuine character and quiet depth.",
      philosophy: "We embrace the grape's natural softness, crafting a wine that welcomes rather than challenges.",
      expression: "Maritime influence adds freshness to Merlot's inherent plushness, creating perfect balance.",
      occasion: "An everyday luxury—approachable enough for Tuesday, refined enough for any gathering."
    },
    pairings: ["Duck breast", "Pork tenderloin", "Mushroom dishes", "Semi-hard cheeses"],
    servingTemp: "15-17°C",
    accentColor: "#5D1A1A"
  }
};

const wineOrder = ["shiraz", "cabernet-sauvignon", "rose", "chardonnay", "merlot"];

export const WineDetailPage = () => {
  const { wineSlug } = useParams();
  const heroRef = useRef(null);
  
  const wine = winesData[wineSlug];
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Get prev/next wines
  const currentIndex = wineOrder.indexOf(wineSlug);
  const prevWine = currentIndex > 0 ? wineOrder[currentIndex - 1] : null;
  const nextWine = currentIndex < wineOrder.length - 1 ? wineOrder[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
      {/* Floating Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
      >
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="flex items-center justify-between py-8">
            <Link to="/" className="text-serif text-xl tracking-tight text-white">
              Cape Jervis
            </Link>
            <Link 
              to="/#collection" 
              className="text-white text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:opacity-70 transition-opacity"
              data-testid="back-to-wines"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              Collection
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Immersive Hero */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
          <img
            src={wine.heroImage}
            alt={wine.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32"
        >
          <div className="max-w-[1600px] mx-auto px-8 md:px-16 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-serif text-6xl md:text-8xl lg:text-9xl text-white font-light tracking-tight"
                >
                  {wine.name}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-white/70 text-lg md:text-xl mt-6 font-light tracking-wide"
                >
                  {wine.tagline}
                </motion.p>
              </div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="hidden lg:flex justify-end gap-16"
              >
                <div className="text-right">
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-2">Origin</p>
                  <p className="text-white text-2xl font-light">South Australia</p>
                </div>
                <div className="text-right">
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-2">Serve</p>
                  <p className="text-white text-2xl font-light">{wine.servingTemp}</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* The Story Section */}
      <section className="py-32 md:py-48">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Column - Label */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <div className="sticky top-32">
                <div className="w-12 h-[1px] bg-[#1A1A1A]/20 mb-8" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/40 mb-4">01</p>
                <h2 className="text-serif text-2xl text-[#1A1A1A]">The Story</h2>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-9"
            >
              <p className="text-serif text-3xl md:text-4xl lg:text-5xl text-[#1A1A1A] leading-[1.3] font-light">
                {wine.description}
              </p>
              <div className="mt-16 max-w-2xl">
                <p className="text-[#1A1A1A]/60 text-lg leading-relaxed whitespace-pre-line font-light">
                  {wine.longDescription}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tasting Notes - Elegant Cards */}
      <section className="py-32 md:py-48 bg-[#1A1A1A]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="w-12 h-[1px] bg-white/20 mb-8" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4">02</p>
            <h2 className="text-serif text-4xl md:text-5xl text-white font-light">Tasting Notes</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10">
            {Object.entries(wine.tastingNotes).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1A1A1A] p-10 md:p-12 group hover:bg-[#242424] transition-colors duration-500"
              >
                <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] mb-6 group-hover:text-[#4B7F78] transition-colors">
                  {key}
                </p>
                <p className="text-white/80 text-base leading-relaxed font-light">
                  {value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Details & Pairings - Split Section */}
      <section className="py-32 md:py-48">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-32">
            {/* Varietal Character */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-12 h-[1px] bg-[#1A1A1A]/20 mb-8" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/40 mb-4">03</p>
              <h2 className="text-serif text-3xl md:text-4xl text-[#1A1A1A] font-light mb-16">Varietal Character</h2>

              <div className="space-y-0">
                {Object.entries(wine.characteristics).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="py-6 border-b border-[#1A1A1A]/10"
                  >
                    <span className="text-[#1A1A1A]/40 text-[10px] uppercase tracking-[0.15em] block mb-3">
                      {key === 'varietal' ? 'The Grape' : key === 'philosophy' ? 'Our Approach' : key === 'expression' ? 'Terroir Expression' : 'Perfect For'}
                    </span>
                    <p className="text-[#1A1A1A]/80 text-base leading-relaxed font-light">{value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Food Pairings */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-12 h-[1px] bg-[#1A1A1A]/20 mb-8" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#1A1A1A]/40 mb-4">04</p>
              <h2 className="text-serif text-3xl md:text-4xl text-[#1A1A1A] font-light mb-16">Pairs With</h2>

              <div className="grid grid-cols-2 gap-4">
                {wine.pairings.map((pairing, index) => (
                  <motion.div
                    key={pairing}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="border border-[#1A1A1A]/10 p-6 md:p-8 hover:border-[#1A1A1A]/30 hover:bg-[#F5F5F3] transition-all duration-500">
                      <p className="text-[#1A1A1A] text-base font-light">{pairing}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wine Navigation - Elegant */}
      <section className="border-t border-[#1A1A1A]/10">
        <div className="grid md:grid-cols-2">
          {prevWine ? (
            <Link
              to={`/wines/${prevWine}`}
              className="group relative p-12 md:p-16 lg:p-24 hover:bg-[#F5F5F3] transition-colors duration-500 border-r border-[#1A1A1A]/10"
              data-testid="prev-wine-link"
            >
              <div className="flex items-center gap-4 text-[#1A1A1A]/40 text-[10px] uppercase tracking-[0.2em] mb-4">
                <ArrowLeft size={14} strokeWidth={1.5} className="group-hover:-translate-x-2 transition-transform duration-300" />
                Previous
              </div>
              <p className="text-serif text-3xl md:text-4xl text-[#1A1A1A] group-hover:text-[#4B7F78] transition-colors duration-300">
                {winesData[prevWine].name}
              </p>
            </Link>
          ) : <div className="hidden md:block border-r border-[#1A1A1A]/10" />}

          {nextWine ? (
            <Link
              to={`/wines/${nextWine}`}
              className="group relative p-12 md:p-16 lg:p-24 hover:bg-[#F5F5F3] transition-colors duration-500 text-right"
              data-testid="next-wine-link"
            >
              <div className="flex items-center justify-end gap-4 text-[#1A1A1A]/40 text-[10px] uppercase tracking-[0.2em] mb-4">
                Next
                <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              <p className="text-serif text-3xl md:text-4xl text-[#1A1A1A] group-hover:text-[#4B7F78] transition-colors duration-300">
                {winesData[nextWine].name}
              </p>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 md:py-48 bg-[#1A1A1A]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-8">Trade Enquiries</p>
            <h2 className="text-serif text-4xl md:text-6xl lg:text-7xl text-white font-light mb-8">
              Interested in<br />
              <span className="italic">Cape Jervis</span>?
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto mb-12 font-light">
              For distribution partnerships and trade enquiries, we'd love to hear from you.
            </p>
            <Link 
              to="/#contact" 
              className="inline-flex items-center gap-4 px-10 py-5 bg-white text-[#1A1A1A] text-xs uppercase tracking-[0.2em] hover:bg-[#4B7F78] hover:text-white transition-all duration-500"
            >
              Get in Touch
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WineDetailPage;
