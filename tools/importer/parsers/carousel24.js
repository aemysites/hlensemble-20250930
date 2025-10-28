/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel24) block parsing
  // Table header row
  const headerRow = ['Carousel (carousel24)'];

  // Find the card body (contains heading and image)
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Extract image (mandatory)
  const img = cardBody.querySelector('img');

  // Extract heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Extract any visible decorative text (e.g., 'PARTY NIGHTS TREND ON')
  // This may be outside .card-body, so check the whole element
  let decorativeText = '';
  const possibleTexts = element.querySelectorAll('div, span, p');
  possibleTexts.forEach(node => {
    if (node.textContent && node.textContent.trim().toLowerCase().includes('party nights trend on')) {
      decorativeText = node.textContent.trim();
    }
  });

  // Compose text cell (heading and decorative text)
  let textCell = document.createElement('div');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell.appendChild(h2);
  }
  if (decorativeText) {
    const deco = document.createElement('div');
    deco.textContent = decorativeText;
    textCell.appendChild(deco);
  }
  if (!heading && !decorativeText) textCell = '';

  // Compose the slide row: [image, text content]
  const slideRow = [img, textCell];

  // Build the table
  const cells = [headerRow, slideRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
