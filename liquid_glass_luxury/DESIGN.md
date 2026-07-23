---
name: Liquid Glass Luxury
colors:
  surface: '#190f24'
  surface-dim: '#190f24'
  surface-bright: '#40344c'
  surface-container-lowest: '#13091e'
  surface-container-low: '#21172c'
  surface-container: '#251b31'
  surface-container-high: '#30253c'
  surface-container-highest: '#3b3047'
  on-surface: '#eedcfa'
  on-surface-variant: '#cfc3cf'
  inverse-surface: '#eedcfa'
  inverse-on-surface: '#372c42'
  outline: '#988d98'
  outline-variant: '#4d444e'
  surface-tint: '#eab3fa'
  primary: '#f8d5ff'
  on-primary: '#481d59'
  primary-container: '#e8b1f8'
  on-primary-container: '#6c3f7d'
  inverse-primary: '#7b4c8b'
  secondary: '#efb0ff'
  on-secondary: '#54006e'
  secondary-container: '#a300d3'
  on-secondary-container: '#f9d4ff'
  tertiary: '#e7dcf7'
  on-tertiary: '#342d42'
  tertiary-container: '#cbc0db'
  on-tertiary-container: '#554e64'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f9d8ff'
  primary-fixed-dim: '#eab3fa'
  on-primary-fixed: '#310343'
  on-primary-fixed-variant: '#613472'
  secondary-fixed: '#fad7ff'
  secondary-fixed-dim: '#efb0ff'
  on-secondary-fixed: '#330044'
  on-secondary-fixed-variant: '#77009a'
  tertiary-fixed: '#e9def9'
  tertiary-fixed-dim: '#cdc2dd'
  on-tertiary-fixed: '#1e182c'
  on-tertiary-fixed-variant: '#4b4359'
  background: '#190f24'
  on-background: '#eedcfa'
  surface-variant: '#3b3047'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style

This design system embodies a "melancholic-chic" aesthetic, blending the somber depth of midnight violet with the illuminating glow of orchid mist. The personality is one of "Quiet Luxury"—it does not shout for attention but rewards the observer with intricate textures and ethereal depth.

The visual style is a hybrid of **Glassmorphism** and **High-End Corporate**, utilizing frosted translucent layers to create a sense of physical presence in a digital space. The emotional response is intended to be one of serene exclusivity, professional yet deeply atmospheric. Key visual drivers include:
- **Atmospheric Depth:** Layered backgrounds with "aura" glows.
- **Materiality:** Elements that mimic liquid glass and polished synthetics.
- **Refinement:** Ample negative space and high-end editorial typography.

## Colors

The palette is anchored in a dark-mode-first philosophy to maintain the "Liquid Glass" effect. 

- **Primary (Orchid Mist):** Used for critical CTAs, active states, and delicate accents. 
- **Secondary (Electric Violet):** The vibrant mid-tone foundation for interactive elements and brand emphasis.
- **Neutral (Midnight Violet):** The deep, near-black foundation of the entire interface.
- **Frost White:** A semi-transparent white used specifically for glass surfaces to ensure the "frosted" look remains legible without being opaque.
- **Aura Glow:** A functional color (using the Secondary Violet) used for soft background blurs and interactive hover states.

## Typography

The system utilizes a dual-font strategy to balance editorial flair with functional clarity.

- **Headlines:** *Playfair Display* provides a sophisticated, high-contrast serif look. It should be used sparingly for page titles, section headers, and key marketing moments.
- **UI & Body:** *Manrope* offers a clean, modern geometric sans-serif that ensures high legibility on dark, frosted backgrounds.
- **Labels:** Use uppercase *Manrope* with increased letter-spacing for navigation items and small UI labels to maintain a "bespoke" feel.

## Layout & Spacing

This system uses a **fluid grid** model with generous margins to evoke luxury. 

- **Grid:** A 12-column layout for desktop.
- **Gutters:** Standard 24px (1.5rem) spacing between columns to prevent visual crowding.
- **Scaling:** On mobile devices, margins compress to 16px, and multi-column card layouts reflow into a single-column stack.
- **Rhythm:** Spacing should follow a 4px/8px base unit. Larger vertical gaps (stack-lg) are encouraged between major sections to maintain the "Quiet Luxury" atmosphere.

## Elevation & Depth

Visual hierarchy is achieved through material density rather than traditional shadows.

1.  **The Void (Base):** The #1A1025 background layer.
2.  **The Mist (Low Elevation):** Subtle `backdrop-blur-sm` overlays with 2% white opacity.
3.  **Liquid Glass (Standard Elevation):** `backdrop-blur-md` with a 0.5px solid border in 10% white. This is the default for cards and modals.
4.  **Aura (High Elevation):** Elements at this level are accompanied by a soft, colored radial gradient (Secondary Violet at 10% opacity) behind the glass surface to simulate a glowing light source.

## Shapes

The design system uses a "Rounded" language to maintain a soft, organic feel that complements the "Liquid" theme.

- **Standard Elements:** Buttons and input fields use a 0.5rem (8px) radius.
- **Cards & Modals:** Use `rounded-lg` (1rem / 16px) to create a soft frame for content.
- **Interactive Triggers:** Select small components like chips or "Bespoke" tags can use `rounded-xl` or pill-shapes to differentiate them from structural containers.

## Components

### Buttons
- **Primary:** Orchid mist background with midnight violet text. No shadow, but a subtle external aura glow on hover.
- **Secondary (Glass):** Frosted white background (15% opacity), backdrop-blur, and a thin primary border. 

### Cards
- Surfaces must use `backdrop-filter: blur(12px)`.
- Borders are 1px thick, utilizing a linear gradient from top-left (White 20%) to bottom-right (White 5%).

### Input Fields
- Dark, semi-transparent backgrounds with a "bottom-only" border or a very subtle ghost outline. Focus states should transition the border to Electric Violet.

### Chips & Tags
- Small, pill-shaped elements with low-opacity violet backgrounds and high-contrast orchid text.

### Aura Highlights
- Decorative elements used behind cards or typography. These are non-interactive radial gradients (e.g., `radial-gradient(circle, rgba(203,67,250,0.1) 0%, rgba(26,16,37,0) 70%)`).