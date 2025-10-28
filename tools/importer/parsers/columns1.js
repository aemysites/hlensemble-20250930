/* global WebImporter */
export default function parse(element, { document }) {
  // Columns (columns1) block: single centered text
  const headerRow = ['Columns (columns1)'];

  // Extract all text content from the element
  const textContent = element.textContent.trim();
  if (!textContent) return;

  // Create a <p> element for the text
  const textElem = document.createElement('p');
  textElem.textContent = textContent;

  // Build the table structure
  const cells = [headerRow, [textElem]];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Always replace the original element
  element.replaceWith(table);
}
