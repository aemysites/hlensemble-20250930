/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block header
  const headerRow = ['Cards (cards26)'];

  // Helper to extract card content from a card element
  function extractCardContent(cardEl) {
    // Find image (mandatory)
    const img = cardEl.querySelector('img');
    // Find text container (optional)
    let textContent = '';
    // Look for a div with utility-padding-all-2rem (where h3/p live)
    const textDiv = cardEl.querySelector('.utility-padding-all-2rem');
    if (textDiv) {
      // Collect all text nodes (including headings, paragraphs, etc.)
      textContent = Array.from(textDiv.childNodes)
        .map((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            return node.outerHTML;
          } else if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
          }
          return '';
        })
        .join('').trim();
      // If still empty, fallback to textContent
      if (!textContent) textContent = textDiv.textContent.trim();
    } else {
      // Try to find heading or paragraph directly
      const h3 = cardEl.querySelector('h3');
      const p = cardEl.querySelector('p');
      if (h3 || p) {
        textContent = '';
        if (h3) textContent += h3.outerHTML;
        if (p) textContent += p.outerHTML;
      }
    }
    // If no text content, leave cell empty (do not use alt text)
    return [img, textContent];
  }

  // Find all card elements: those with at least an image
  const cardElements = Array.from(element.children).filter((child) => {
    // Must have an image
    return child.querySelector('img');
  });

  // Build rows for all cards (with image, text optional)
  const rows = cardElements.map(cardEl => extractCardContent(cardEl));

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
