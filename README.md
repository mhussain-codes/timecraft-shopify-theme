# TimeCraft Watches — Shopify Online Store 2.0 Theme

A premium, classic Shopify Online Store 2.0 theme built for **TIMECRAFT**, a specialized watch retailer and wholesale distributor based in **Raja Bazaar, Rawalpindi, Pakistan**. 

The theme features an editorial design language with a warm off-white background (`#FAF8F5`), rich forest-green (`#2D4F3E`) sections and buttons, and muted gold (`#C5A46D`) horological accents, paired with serif display headings (*Playfair Display*) and clean sans-serif body typography (*Inter*).

---

## Folder Structure

```
Demo watch/
├── assets/
│   ├── theme.css                  # Core stylesheet with design tokens, responsive breakpoints, animations
│   └── theme.js                   # Lightweight vanilla JS for mobile drawer, sticky nav, and cart interactions
├── config/
│   ├── settings_schema.json       # Theme settings schema (colors, typography, store details, payments)
│   └── settings_data.json         # Default values and brand color presets
├── layout/
│   └── theme.liquid               # Base Online Store 2.0 layout with SEO and accessibility hooks
├── locales/
│   └── en.default.json            # English translations for cart, checkout, wholesale, and catalog
├── sections/
│   ├── announcement-bar.liquid    # Dismissible delivery and payment notice bar
│   ├── header.liquid              # Sticky header with TIMECRAFT watch emblem and mobile drawer
│   ├── hero.liquid                # Hero showcase with vector watch artwork and dual CTAs
│   ├── benefits-row.liquid        # 4 trust pillars (Delivery, Authentic, Warranty, COD)
│   ├── featured-products.liquid   # "Our Bestsellers" comparative product grid
│   ├── collection-tiles.liquid    # "Shop by Category" spacious 3-column portrait cards
│   ├── wholesale-banner.liquid    # Unified B2B wholesale value proposition and enquiry form
│   ├── wholesale-form.liquid      # Standalone wholesale form for dedicated /pages/wholesale
│   ├── main-product.liquid        # Product detail page with gallery and specifications
│   ├── main-collection.liquid     # Collection grid with filters, sorting, and pagination
│   ├── main-cart.liquid           # Shopping cart with order summary and native checkout handoff
│   ├── main-page.liquid           # General content pages
│   ├── main-404.liquid            # 404 error page
│   └── footer.liquid              # 4-column footer with showroom location, policies, and payment note
├── snippets/
│   ├── product-card.liquid        # Reusable comparative product card with badges and specs
│   ├── watch-placeholder.liquid   # Vector analog watch artwork snippet
│   ├── icon-cart.liquid           # Shopping bag SVG icon
│   ├── icon-menu.liquid           # Hamburger menu SVG icon
│   └── icon-close.liquid          # Close (X) SVG icon
├── templates/
│   ├── index.json                 # Homepage section order and configurations
│   ├── product.json               # Product template
│   ├── collection.json            # Collection template
│   ├── cart.json                  # Cart page template
│   ├── page.wholesale.json        # Wholesale enquiry page
│   ├── page.json                  # Generic page
│   └── 404.json                   # 404 page
├── preview.html                   # Standalone, interactive browser preview (desktop & mobile)
└── README.md                      # Theme documentation and setup guide
```

---

## How to Preview the Theme

### 1. Instant Local Browser Preview (Zero Setup)
Open [`preview.html`](file:///c:/Demo%20watch/preview.html) in any modern web browser. It renders the complete desktop and mobile layouts, responsive category tiles, interactive product cards with cart toast feedback, and the unified wholesale B2B form.

### 2. Shopify CLI (Recommended for Development)
```bash
cd "c:\Demo watch"
shopify theme dev --store your-store.myshopify.com
```
This runs a local development proxy with hot-reloading directly against your Shopify store sandbox.

### 3. Theme Kit or Manual Upload
1. Compress all folders (`assets`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`) into a `.zip` archive.
2. In **Shopify Admin**, navigate to **Online Store → Themes**.
3. Under **Theme library**, click **Add theme → Upload zip file**.
4. Click **Customize** to preview and configure settings in the Shopify Theme Editor.

---

## Shop Details & Shopify Admin Configuration Required

To take this theme live with real transactions, the store owner must configure the following in Shopify Admin:

### 1. Products & Inventory
- Replace sample fallback data by adding real watch products under **Products**.
- Include high-resolution photography, variant options (strap color, case size), and set stock availability.
- The theme automatically renders real product titles, prices, compare-at prices, variants, and photography once added.

### 2. Collections Setup
- Create collections matching the 3 primary categories under **Products → Collections**:
  - `Classic Watches` (Dress, Roman numerals, leather straps)
  - `Sports & Chrono` (Stainless steel, tachymeter, water-resistant)
  - `Luxury Collection` (Automatic, gold accents, fluted bezels)
- Assign products to each collection and link them in the Theme Editor.

### 3. Payment Methods (Authentic Configuration)
- **Cash on Delivery (COD):** Navigate to **Settings → Payments → Manual payment methods** and enable *Cash on Delivery*. This works natively without extra fees.
- **JazzCash & Easypaisa:** 
  > **Important Note:** JazzCash and Easypaisa are shown in the theme copy and footer purely as payment options to be configured by the shop owner. They are **not active payment gateways by default**. To accept live mobile wallet payments, the owner must either:
  > 1. Install an approved Shopify payment gateway app (such as PayMob, Safepay, or JazzCash Merchant App for Shopify) and input tested API merchant credentials; OR
  > 2. Configure manual payment instructions under **Settings → Payments → Custom payment method** instructing buyers how to send funds to the shop's official business account number upon checkout.
- Never hard-code live payment keys or merchant credentials into theme files.

### 4. Shipping & Logistics (Rawalpindi / Islamabad & Nationwide)
- Navigate to **Settings → Shipping and delivery**.
- Configure local delivery rates for **Rawalpindi & Islamabad** (e.g. Free above Rs. 5,000, or flat Rs. 200).
- Set up standard courier delivery zones for rest of Pakistan (TCS, Leopard Courier, Call Courier, or Daewoo Cargo).

### 5. Physical Showroom & Contact Information
- In **Theme Customizer → Footer & Settings**, confirm or adjust:
  - Physical address: *Shop #14, Main Watch Market, Raja Bazaar, Rawalpindi, Pakistan*
  - Business Phone & WhatsApp: *+92 300 1234567*
  - Support Email: *info@timecraft.pk*
  - Showroom Hours: *Mon – Sat: 11:00 AM – 9:00 PM*

---

## Design Tokens & Palette

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Background** | `#FAF8F5` | Warm off-white parchment foundation |
| **Primary Theme** | `#2D4F3E` | Deep forest-green for authority, hero, footer, and buttons |
| **Accent Gold** | `#C5A46D` | Muted horological gold for dials, crowns, and badges |
| **Text Primary** | `#2C2C2C` | High-contrast dark charcoal body |
| **Text Muted** | `#6B6B6B` | Secondary specifications and subheadings |
| **Border & Divider** | `#E8E4DF` | Clean architectural dividing lines |

---

## Live Watch Synchronized Clock Feature

Every analog watch visual across the storefront displays the actual current **Rawalpindi time (`Asia/Karachi` timezone, UTC+5)** with real second, minute, and hour hands moving from a centered pivot.

### How It Operates
- **Direct Angle Computation:** On every 1-second tick, angles are calculated directly from current Karachi time:
  - Second hand: $6^\circ / \text{second}$
  - Minute hand: $6^\circ / \text{minute} + (0.1^\circ \times \text{seconds})$
  - Hour hand: $(30^\circ \times (\text{hour} \pmod{12})) + (0.5^\circ \times \text{minutes}) + ((0.5 / 60)^\circ \times \text{seconds})$
- **Automatic Inheritance:** Any newly added analog watch product in collections or grids rendered through `snippets/product-card.liquid` or `snippets/watch-placeholder.liquid` inherits this live behavior automatically.
- **Tab Resync:** Immediately recalculates and synchronizes when a user switches back from an inactive browser tab (`visibilitychange`).
- **Reduced Motion:** If a customer has `prefers-reduced-motion` enabled, animations and smooth sweeps are bypassed, while keeping the hands accurately positioned to the correct time.

### Photographic Dial Position Settings (Metafields)
When uploading custom watch photography instead of vector illustrations, `snippets/watch-clock-overlay.liquid` renders transparent live hands positioned over the watch dial. The following optional Shopify product metafields (namespace: `custom`) allow fine-tuning per product:

| Metafield Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `custom.dial_center_x` | Integer / Float | `50` | Center horizontal coordinate of dial (% of image width) |
| `custom.dial_center_y` | Integer / Float | `50` | Center vertical coordinate of dial (% of image height) |
| `custom.dial_size` | Integer / Float | `50` | Size of hands diameter (% of image width) |
| `custom.hand_color` | String (Hex) | `#2D4F3E` | Color of the hour and minute hands |
| `custom.second_color` | String (Hex) | `#C5A46D` | Color of the second hand |
| `custom.is_digital` | Boolean | `false` | Set to `true` (or tag product `digital`) to omit analog hands |

---

## Quality & Accessibility Standards

- **Typography:** Display serif *Playfair Display* + body sans-serif *Inter* loaded via Google Fonts.
- **Responsive Breakpoints:** Fully tested at `1320px` (desktop), `991px` (tablet wrap), `640px` (mobile stack), and `360px` (small mobile).
- **Reduced Motion:** All transitions and watch-hand sweeps respect `prefers-reduced-motion: reduce`.
- **Touch Targets:** Minimum 44px tap targets for mobile buttons and navigation drawers.
