/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for block name
  const headerRow = ['Hero (hero37)'];

  // 2. Background image row (none in this example)
  const imageRow = [''];

  // 3. Content row: heading, subheading, CTA
  // Find the grid container (holds headline/subheading and CTA)
  const grid = element.querySelector('.grid-layout');
  let contentElements = [];
  if (grid) {
    // Find headline/subheading container
    const textCol = grid.querySelector('div');
    if (textCol) {
      // Headline (h2)
      const headline = textCol.querySelector('h2');
      if (headline) contentElements.push(headline);
      // Subheading (p)
      const subheading = textCol.querySelector('p');
      if (subheading) contentElements.push(subheading);
    }
    // CTA button (anchor)
    const cta = grid.querySelector('a.button');
    if (cta) contentElements.push(cta);
  }
  const contentRow = [contentElements];

  // Compose table rows
  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block table
  element.replaceWith(table);
}
