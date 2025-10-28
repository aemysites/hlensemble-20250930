/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block: extract each card's icon and text
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Select all direct card containers (each card is a flex-horizontal div)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(card => {
    // Find the icon (SVG image) inside the card
    const iconDiv = card.querySelector('.icon');
    let iconImg = null;
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    if (!iconImg) return;

    // Collect all text content from the card except the icon
    // Get all <p> elements inside the card, and any other text nodes
    const textNodes = [];
    card.childNodes.forEach(node => {
      // Exclude the iconDiv
      if (node === iconDiv) return;
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'P') {
          textNodes.push(node.cloneNode(true));
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        // Only add non-empty text
        if (node.textContent.trim()) {
          const span = document.createElement('span');
          span.textContent = node.textContent.trim();
          textNodes.push(span);
        }
      }
    });
    // Defensive: if no text, skip this card
    if (!textNodes.length) return;

    // Add the card row: [icon, all text content]
    rows.push([iconImg, textNodes]);
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
