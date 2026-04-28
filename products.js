// ═══════════════════════════════════════════════════════
// P+3 CERAMICS — PRODUCT CATALOG
// ═══════════════════════════════════════════════════════
// Add or edit products below. Each product needs:
// - id: unique identifier
// - title: product name
// - artist: workshop name
// - type: category (Vessel, Wall Piece, Sculpture, etc.)
// - priceEUR: price in euros (number, no currency symbol)
// - image: path to image file (put images in /images/ folder)
// - alt: description for accessibility
// - stripeLink: Stripe payment link (get from Stripe Dashboard)
// - available: true if in stock, false if sold

window.PRODUCTS = [
  {
    id: "wall-sequence-01",
    title: "Tierra Wall Installation",
    artist: "Colombia Workshop",
    type: "Wall Piece",
    priceEUR: 1800,
    image: "./images/wall-sequence-1.png",
    alt: "Modular ceramic wall installation in earth tones",
    stripeLink: "https://buy.stripe.com/test_PLACEHOLDER_1",
    available: true,
  },
  {
    id: "vessel-01",
    title: "Rustico Vessel",
    artist: "Italian Workshop",
    type: "Vessel",
    priceEUR: 640,
    image: "./images/blue-rust-vessel.png",
    alt: "Hand-thrown ceramic vessel with natural glaze",
    stripeLink: "https://buy.stripe.com/test_PLACEHOLDER_2",
    available: true,
  },
  {
    id: "signature-01",
    title: "Minimal Form Study",
    artist: "Colombia Workshop",
    type: "Sculpture",
    priceEUR: 320,
    image: "./images/studio-signature.png",
    alt: "Abstract ceramic sculpture exploring form",
    stripeLink: "https://buy.stripe.com/test_PLACEHOLDER_3",
    available: true,
  },
];

// ═══════════════════════════════════════════════════════
// TO ADD A NEW PRODUCT:
// 1. Copy one of the blocks above
// 2. Change all the details
// 3. Put the product image in the /images/ folder
// 4. Save this file and refresh the website
// ═══════════════════════════════════════════════════════
