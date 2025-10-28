/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: image-only cards, so each row is [img]
  const headerRow = ['Cards (cards7)'];

  // Get all immediate child divs (cards) of the grid container
  let cards = Array.from(element.querySelectorAll(':scope > div'));
  // If only one child and it's the grid, get its children
  if (cards.length === 1 && cards[0].classList.contains('grid-layout')) {
    cards = Array.from(cards[0].querySelectorAll(':scope > div'));
  }

  // For each card, extract the image (mandatory)
  const rows = cards.map(card => {
    const img = card.querySelector('img');
    if (!img) return null;
    return [img]; // Only image, no text cell
  }).filter(Boolean);

  // Compose table cells
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
