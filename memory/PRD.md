# Cape Jervis Wine - Premium Wine Brand Website

## Original Problem Statement
Create a premium, modern wine brand website for Cape Jervis Wine — Australia. A luxury wine producer inspired by the Cape Jervis Lighthouse with a global outlook.

## User Personas
1. **International Wine Distributors** - Looking for premium Australian wines for global markets
2. **Hospitality Buyers** - Hotels, restaurants seeking quality wine suppliers
3. **Trade Partners** - Long-term business collaboration seekers
4. **Premium Wine Consumers** - Discerning customers appreciating quality and provenance

## Core Requirements (Static)
- Premium, editorial, modern luxury design aesthetic
- Age verification gate on first visit
- Brand storytelling through About section
- Wine portfolio showcase (Shiraz, Chardonnay, Cabernet Sauvignon)
- Terroir/regions information
- Global trade/distribution section
- Contact form (visual mockup)
- Mailing list signup (visual mockup)
- Mobile-responsive design
- Smooth scroll animations

## What's Been Implemented
**Date: February 10, 2026**

### Age Gate
- ✅ Age verification modal on first visit
- ✅ localStorage persistence (`capejervis_age_verified`)
- ✅ "I Am of Legal Age" / "I Am Not" options

### Navigation
- ✅ Fixed header with glass-morphism on scroll
- ✅ Links: About, Wines, Terroir, Trade, Contact
- ✅ Mobile hamburger menu
- ✅ Smooth scroll to sections

### Hero Section
- ✅ Full-screen with Cape Jervis lighthouse background
- ✅ Parallax scroll effect
- ✅ "Cape Jervis Wine" title with subtitle
- ✅ "Explore Our Wines" CTA button

### About Section
- ✅ Dark background (#1A1A1A)
- ✅ Brand philosophy content
- ✅ Vineyard sunset image
- ✅ Featured quote

### Wines Section
- ✅ 5 wine cards: Shiraz, Cabernet Sauvignon, Rosé, Chardonnay, Merlot
- ✅ Each card links to individual wine detail page
- ✅ Tasting notes summary
- ✅ Horizontal scroll on mobile

### Individual Wine Pages (NEW)
- ✅ `/wines/shiraz` - 2022 vintage detail page
- ✅ `/wines/cabernet-sauvignon` - 2021 vintage detail page
- ✅ `/wines/rose` - 2024 vintage detail page
- ✅ `/wines/chardonnay` - 2023 vintage detail page
- ✅ `/wines/merlot` - 2022 vintage detail page
- ✅ Hero image with parallax effect
- ✅ Overview with detailed description
- ✅ Tasting notes (Appearance, Nose, Palate, Finish)
- ✅ Food pairings
- ✅ Technical details (Alcohol, Acidity, Cellaring)
- ✅ Previous/Next wine navigation
- ✅ Back to Collection link

### Terroir Section
- ✅ Limestone texture background with parallax
- ✅ Growing region features
- ✅ Cool maritime benefits explanation

### Trade Section
- ✅ Global markets information
- ✅ Partnership opportunities
- ✅ Trade enquiry CTA

### Contact Section
- ✅ Contact form (visual mockup)
- ✅ Fields: Name, Email, Company, Enquiry Type, Message
- ✅ Newsletter checkbox
- ✅ Contact info display

### Footer
- ✅ Large "Cape Jervis" typography
- ✅ Navigation links
- ✅ Legal disclaimer
- ✅ Copyright notice

### Technical
- ✅ Framer Motion animations
- ✅ Lenis smooth scroll
- ✅ Cormorant Garamond + Manrope fonts
- ✅ Responsive design
- ✅ CSS custom properties for color palette
- ✅ Grain texture overlay
- ✅ React Router for wine detail pages

## Prioritized Backlog
### P0 - Completed
- [x] Age verification gate
- [x] All content sections
- [x] Mobile responsive design
- [x] Smooth animations

### P1 - Future Phase
- [ ] E-commerce integration (if required)
- [ ] Actual form backend submission
- [ ] Email newsletter integration
- [ ] Wine detail pages

### P2 - Enhancements
- [ ] Wine vintage selector
- [ ] Trade portal login
- [ ] Multi-language support
- [ ] Analytics integration

## Changelog
**March 25, 2026**
- Integrated enhanced vineyard walk video (1920x1080, H264) into homepage after hero section
- Removed "From the Heart of South Australia" text overlay and fallback image from video section
- Fixed scroll-to-top bug on wine detail page navigation (properly interfacing with Lenis smooth scroll)
- Lightened video section gradient overlay for better visibility

## Next Tasks
1. Add e-commerce functionality when business is ready
2. Connect contact form to actual email service
3. Set up newsletter with mailing provider
4. Implement trade partner portal

## Design System
- **Primary**: Chalk (#F9F9F7), Charcoal (#1A1A1A)
- **Accent**: Copper (#4B7F78), Olive (#4A5D46)
- **Font Headings**: Cormorant Garamond (serif)
- **Font Body**: Manrope (sans-serif)
