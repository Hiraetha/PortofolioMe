# Design System — Neo-Brutalist Tech

## Design intent
The portfolio should communicate developer identity, technical confidence, creativity, practical engineering, and curiosity.

Visual direction:
**Neo-Brutalist + Developer Tooling + Editorial Portfolio**

## Principles
1. Strong visual hierarchy.
2. High contrast.
3. Intentional asymmetry.
4. Thick borders.
5. Hard shadows.
6. Bold typography.
7. Generous whitespace.
8. Technical metadata.
9. Motion with purpose.
10. Content over decoration.

## Color system
Centralize semantic tokens:
```text
background
foreground
surface
surface-muted
border
accent
accent-foreground
muted
success
warning
danger
```
Use a high-contrast base and one strong accent. Avoid gradients as the primary identity.

## Typography
Display typography: bold expressive sans-serif for hero and major headings.
Technical typography: monospace for code, tags, metadata, dates, labels, and terminal UI.

## Borders and shadows
Use strong 2px/3px borders for major elements and hard offset shadows, e.g.:
```css
box-shadow: 6px 6px 0 var(--border);
```
Avoid large soft shadows as the default.

## Radius
Use small/moderate radius. Do not make every component a pill.

## Layout
Use a responsive conceptual grid:
- Desktop: 12 columns
- Tablet: 6 columns
- Mobile: 1 main column

Use asymmetry intentionally while preserving readability.

## Navbar
- Strong bottom border.
- Brand/name left.
- Navigation right.
- Clear active state.
- Mobile hamburger menu.
- Admin link visually secondary.

## Hero
The hero is the main visual anchor. Include name, role, strong headline, short description, primary/secondary CTA, and availability/status. Optional terminal/code/decorative elements must not overcrowd it.

Placeholder headline:
```text
BUILDING DIGITAL PRODUCTS
WITH CODE & CURIOSITY.
```

## Tech stack
Categories:
```text
Frontend
Backend
Mobile
Tools / Other
```
Technology list:
```text
NestJS
React
React Native
Expo
TypeScript
Tailwind CSS
Bootstrap
Laravel
PHP
HTML
Antigravity
```
Never fabricate skill levels or experience years.

## Project cards
Each card can contain image, category, date, title, description, technology tags, GitHub, and Live Demo. Featured projects can span more grid columns.

Hover effects may include slight image scale, shadow/border change, or small translation. Content must remain understandable without hover.

## Achievement cards
Show title, issuer, date, description, image/certificate, and certificate link.

## About
Use an editorial layout with a large statement and concise paragraphs. Never fabricate biography details.

## Timeline
Use date marker, title, type/category, and description. Types can include Learning, Project, Competition, Achievement, Experience.

## Contact
Create a strong closing section with email, GitHub, LinkedIn, and other provided social links.

## Buttons
Primary buttons use strong border + hard shadow + clear hover + pressed state. Secondary buttons use lower emphasis. All buttons require visible focus states.

## Inputs
Use strong borders, labels, high contrast, focus states, errors, and disabled states. Never rely on placeholder text as the only label.

## Admin UI
Prioritize speed and clarity over decoration. Use tables/forms, CRUD actions, upload feedback, search/filter, and confirmation dialogs.

## Animation
Use Framer Motion for purposeful transitions: page entrance, section reveal, card hover, image zoom, button press, mobile menu, and staggered content. Avoid constant movement and excessive parallax. Respect `prefers-reduced-motion`.

## Responsive rules
Mobile:
- Reduce heading sizes.
- Stack grids.
- Keep buttons usable.
- Prevent horizontal overflow.
- Keep metadata readable.
- Allow admin tables to scroll.

Desktop:
- Use asymmetric grids.
- Let featured projects dominate.
- Keep readable text line lengths.

## Accessibility
Require semantic HTML, heading hierarchy, alt text, labels, keyboard navigation, focus indicators, sufficient contrast, and reduced-motion support. Never use color as the only state indicator.

## Do / Don't
Do: bold type, strong borders, hard shadows, whitespace, technical labels, intentional asymmetry, responsive interactions.

Don't: copy the reference, overuse gradients, make every element rounded, add animation without purpose, use unreadably small text, invent personal information, or make the site look like a generic SaaS template.

## Visual quality bar
Ask:
- Is the hero focal point clear?
- Does the layout work without animation?
- Are projects easy to scan?
- Does it work on a small phone?
- Are borders/shadows consistent?
- Is typography consistent?
- Is there enough whitespace?
- Does it feel like a developer portfolio?
