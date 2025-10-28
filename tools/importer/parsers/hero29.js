/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: always block name
  const headerRow = ['Hero (hero29)'];

  // 2. Background image row
  let bgImg = null;
  // Defensive: look for an <img> anywhere in the element
  const img = element.querySelector('img');
  if (img) {
    bgImg = img;
  }

  // 3. Content row: heading, subheading, CTA (if present)
  // For this example, only a heading is present
  let contentCell = [];
  // Defensive: look for h1, h2, h3 in order
  let heading = element.querySelector('h1, h2, h3');
  if (heading) {
    contentCell.push(heading);
  }
  // Optionally, look for subheading
  let subheading = element.querySelector('h2, h3');
  if (subheading && subheading !== heading) {
    contentCell.push(subheading);
  }
  // Optionally, look for CTA link
  let cta = element.querySelector('a, button');
  if (cta) {
    contentCell.push(cta);
  }

  // Build table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell.length ? contentCell : '']
  ];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
