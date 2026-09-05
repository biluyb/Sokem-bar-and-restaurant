# Design System Specification

## 1. Aesthetic Direction: Dark Luxury

The design palette reflects an elevated, high-end bar and dining experience. It combines deep slate backdrops, dark glassmorphism, subtle warm borders, and vivid amber/gold accents.

---

## 2. Color Palette & CSS Tokens

```css
:root {
  /* Surface Colors */
  --bg-primary: #0F172A;      /* Slate 900 */
  --bg-secondary: #1E293B;    /* Slate 800 */
  --bg-card: rgba(30, 41, 59, 0.7); /* Dark Glassmorphism */
  
  /* Brand Accent Colors */
  --accent-gold: #F59E0B;     /* Amber 500 */
  --accent-gold-hover: #D97706; /* Amber 600 */
  --accent-glow: rgba(245, 158, 11, 0.15);

  /* Text Colors */
  --text-primary: #F8FAFC;    /* Slate 50 */
  --text-secondary: #94A3B8;  /* Slate 400 */
  --text-muted: #64748B;      /* Slate 500 */

  /* Borders & Dividers */
  --border-subtle: #334155;   /* Slate 700 */
  --border-gold: rgba(245, 158, 11, 0.3);
}
```

---

## 3. Typography

- **Headings**: `Outfit`, sans-serif (Bold, Elegant serif-like precision, uppercase tracking for navigation).
- **Body Text**: `Inter`, sans-serif (Clean, highly legible at small sizes).

---

## 4. Atomic UI Components Standard (`src/components/ui/`)

| Component | Responsibility | Usage Guidelines |
|---|---|---|
| `Button` | Standard trigger | Variants: `primary` (gold fill), `outline` (gold border), `ghost` |
| `Card` | Content container | Glassmorphic background, subtle border, hover elevation |
| `Input` | Text input | Dark background, subtle border, gold focus ring |
| `Modal` | Overlay dialog | Backdrop blur, `Escape` key close, focus trap |
| `Badge` | Status indicator | Dietary flags (Vegan, GF), stock status, event tags |
| `Toast` | Alert notification | Temporary notification banner for success/error feedback |

---

## 5. Micro-Animations & Motion

- Built using **Framer Motion**.
- Subtitle fade-ins, card hover subtle scales (`scale: 1.02`), smooth modal backdrops.
- Respect `prefers-reduced-motion` media queries for accessibility.
