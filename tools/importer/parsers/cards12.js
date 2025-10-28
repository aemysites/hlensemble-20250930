/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards12)'];

  // 2. Find all card anchor elements (each card is an <a> inside the grid container)
  const cardLinks = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  // 3. Build rows for each card
  const rows = cardLinks.map(card => {
    // Image: first child div contains the image
    const imageDiv = card.querySelector('div.utility-aspect-2x3');
    const img = imageDiv ? imageDiv.querySelector('img') : null;
    // Text content: tag, date, heading
    const metaDiv = card.querySelector('.flex-horizontal');
    const tag = metaDiv ? metaDiv.querySelector('.tag') : null;
    const date = metaDiv ? metaDiv.querySelector('.paragraph-sm') : null;
    const heading = card.querySelector('h3');

    // Compose text cell: tag + date + heading (in order)
    const textCell = document.createElement('div');
    if (tag) textCell.appendChild(tag);
    if (date) textCell.appendChild(date);
    if (heading) textCell.appendChild(heading);

    // Each row: [image, text]
    return [img, textCell];
  });

  // 4. Assemble table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 5. Replace original element
  element.replaceWith(table);
}
