# Smart Labour - Premium One-Page Website Design Specification

## Design Philosophy
**Modern Minimalism with Premium Glassmorphism**
- Clean, spacious layouts with strategic use of brand colors
- Glassmorphism effects (frosted glass backgrounds, blur effects)
- Sophisticated gradient overlays and abstract shapes
- Smooth, purposeful animations using Framer Motion
- High-end luxury aesthetic with technical precision

## Color Palette
- **Primary Blue**: #0099CC (Sky Blue) - CTAs, accents, highlights
- **Dark Blue**: #003366 (Deep Blue) - Headers, depth, authority
- **Accent Green**: #CCFF00 (Lime Green) - Highlights, badges, micro-interactions
- **Neutral White**: #FFFFFF - Backgrounds, cards
- **Neutral Gray**: #F5F5F5, #E8E8E8, #666666 - Subtle backgrounds, text hierarchy
- **Black**: #000000 - Primary text, strong contrast

## Typography System
- **Display Font**: Playfair Display (serif, 600-700 weight) - Headlines, prestige
- **Body Font**: Inter (sans-serif, 400-500 weight) - Readable, modern
- **Accent Font**: IBM Plex Mono (monospace) - Stats, numbers, technical elements

## Visual Elements
1. **Glassmorphism Cards**: Semi-transparent backgrounds with backdrop blur
2. **Gradient Overlays**: Subtle blue-to-transparent gradients
3. **Abstract Shapes**: SVG blobs, diagonal lines, geometric elements
4. **Icons**: Custom branded icons for services (from previous generation)
5. **Shadows**: Soft, layered shadows for depth (not harsh)

## Page Structure (One-Page Scroll)

### 1. Navigation Bar (Sticky)
- Fixed top, semi-transparent with backdrop blur
- Logo on left
- Navigation links (About, Services, Why Us, Contact)
- CTA button (Get Quote)
- Active section highlighting
- Mobile hamburger menu

### 2. Hero Section
- Full viewport height
- Split layout: Text left, visual right
- Animated headline with staggered text reveal
- Subheading with fade-in animation
- Primary CTA button with hover animation
- Background: Abstract geometric shapes, gradient overlay
- Scroll indicator at bottom

### 3. About Section
- Two-column layout (text left, visual right on desktop)
- Company introduction with smooth fade-in
- Mission & vision statements in glassmorphism cards
- Stats counter with number animation
- Background: Subtle gradient, abstract shapes

### 4. Services Section
- Grid layout (1 col mobile, 2 cols tablet, 4 cols desktop)
- Service cards with glassmorphism effect
- Hover: Lift animation, color shift, icon animation
- Each card: Icon, title, description
- Staggered entrance animation on scroll

### 5. Why Choose Us Section
- 3-column layout with icons
- Key advantages with animated counters
- Glassmorphism cards with hover effects
- Background: Gradient with abstract shapes

### 6. Testimonials / Stats Section
- Rotating testimonial carousel or stats display
- Animated number counters
- Client logos or metrics
- Glassmorphism container

### 7. Contact Section
- Contact form with validation
- Business information (email, phone, address)
- Optional map integration
- Glassmorphism form container
- Floating WhatsApp button

### 8. Footer
- Dark background with brand colors
- Logo, navigation links, social media
- Copyright information

## Animation Strategy
- **Entrance Animations**: Fade-in, slide-up, scale-in on scroll
- **Hover Effects**: Scale, color shift, shadow increase
- **Scroll Animations**: Parallax, reveal on scroll
- **Micro-interactions**: Button ripples, icon animations, number counters
- **Page Transitions**: Smooth fade-in/out between sections

## UX Enhancements
1. **Sticky Navigation**: Always accessible, highlights current section
2. **Smooth Scrolling**: Anchor links with smooth scroll behavior
3. **Back-to-Top Button**: Appears on scroll, smooth animation
4. **Floating WhatsApp Button**: Fixed position, pulsing animation
5. **Active Section Highlighting**: Navigation updates based on scroll position
6. **Loading States**: Skeleton screens, smooth transitions
7. **Responsive Design**: Mobile-first, optimized for all screen sizes
8. **Performance**: Lazy loading images, optimized animations

## Technical Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Manus hosting

## Responsive Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

## Performance Targets
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Focus indicators visible
- Color contrast ratios met
