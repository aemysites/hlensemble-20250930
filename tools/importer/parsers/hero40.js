/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row (block name)
  const headerRow = ['Hero (hero40)'];

  // 2. Background image row
  // Find the main image (background)
  let bgImg = element.querySelector('img');
  // Defensive: If not found, leave cell empty
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Content row (heading, subheading, CTA)
  // Find the main heading (h1)
  let heading = element.querySelector('h1');

  // Find the subheading/paragraph (first p)
  let subheading = element.querySelector('p');

  // Find the CTA link (first .button-group a)
  let cta = element.querySelector('.button-group a');

  // Compose content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);
  const contentRow = [contentCell.length ? contentCell : ''];

  // Build table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
