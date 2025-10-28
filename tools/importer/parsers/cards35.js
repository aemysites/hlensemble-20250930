/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, multiple rows; each row = [image, text]
  // Source: Only images in cards, no text or CTA

  // Header row as required
  const headerRow = ['Cards (cards35)'];

  // Find all card elements (each immediate child div of the grid)
  const cardDivs = Array.from(element.children);

  // For each card, extract the image element
  const rows = cardDivs.map(cardDiv => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    // Defensive: Only include if image exists
    if (!img) return null;
    // No text content in source, so cell is empty string
    return [img, ''];
  }).filter(Boolean);

  // Build the table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
