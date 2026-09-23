# CodeSupa Studio — React + Vite + TypeScript

A multi-page, editorial digital-agency website inspired by the attached reference: oversized typography, restrained color, rounded central canvas, pill navigation, spacious composition, and subtle motion.

## Stack

- React 19
- TypeScript (strict)
- Vite
- React Router
- GSAP
- Lenis
- Lucide React

## Run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Typography

The reference is visually closest to the broad modern grotesk / Neue Montreal style. The CSS therefore prioritizes a licensed `Neue Montreal` font, then falls back to DM Sans / Helvetica.

For a true licensed production build, place the font files in `src/assets/fonts/` and add `@font-face` rules in `src/styles.css`.

Do not redistribute a commercial font file without the appropriate license.

## Pages

`/` Home  
`/about` About  
`/work` Work  
`/expertise` Expertise  
`/thinking` Thinking  
`/contact` Contact

The content is written as a CodeSupa studio starter and should be replaced with the final brand copy, portfolio media and contact details.
