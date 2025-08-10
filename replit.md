# Overview

Fingard Partners is a professional finance company website built with pure HTML, CSS, and JavaScript. The site serves as a corporate presence for a financial services firm offering comprehensive finance and compliance solutions. It features a clean, professional design inspired by modern finance platforms like ClearTax, with a focus on showcasing services, enabling client inquiries, and facilitating online payments through integrated payment processing.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The website follows a traditional multi-page application (MPA) architecture using static HTML files:

**Page Structure**: Five main pages (Home, About, Services, Contact, Payment) with shared navigation and styling
- **Routing**: Simple file-based routing with individual HTML files
- **Styling**: Centralized CSS with CSS custom properties for theming and responsive design
- **Interactivity**: Vanilla JavaScript for navigation, form handling, animations, and payment integration

**Design System**: 
- **Color Scheme**: Professional finance theme using navy blue (#002147), elegant teal (#2CA6A4), and neutral tones
- **Typography**: Google Fonts integration with Poppins font family
- **Icons**: Font Awesome integration for consistent iconography
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

**Component Architecture**: Modular CSS approach with reusable components for buttons, cards, forms, and navigation elements

## Interactive Features
**Navigation System**: Responsive navbar with mobile hamburger menu and smooth scrolling effects
**Animation System**: Scroll-based animations and hover effects using vanilla JavaScript and CSS transitions
**Form Handling**: Contact form with validation and user feedback
**Payment Integration**: Client-side payment form preparation for Razorpay integration

## Performance Considerations
**Asset Loading**: Optimized with external CDN resources for fonts and icons
**Image Handling**: Placeholder images and SVG logo integration
**Code Organization**: Separated concerns with dedicated CSS and JavaScript files

# External Dependencies

## Frontend Libraries
- **Google Fonts**: Poppins font family for consistent typography
- **Font Awesome**: Icon library (v6.0.0) for UI elements and service representations

## Payment Gateway
- **Razorpay**: Payment processing integration with checkout.js for secure online transactions
- **Implementation**: Client-side integration for payment form handling and transaction processing

## External Assets
- **Pixabay**: Image hosting for hero section and visual content
- **Base64 SVG**: Embedded logo as data URI for fast loading

## Maps Integration
- **Google Maps**: Embedded map functionality for office location display (coordinates: 26°54'35.2"N 75°48'39.1"E)

The architecture prioritizes simplicity, performance, and maintainability while providing a professional user experience suitable for a financial services company.