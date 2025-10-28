/* global WebImporter */
export default function parse(element, { document }) {
  // Columns (columns39) block table header
  const headerRow = ['Columns (columns39)'];

  // Get all direct children (columns)
  const columns = Array.from(element.children);

  // Each column should contain its image (reference the existing <img> element)
  const columnCells = columns.map(col => {
    const img = col.querySelector('img');
    // Reference the image element directly if present
    return img ? img : '';
  });

  // Build the table: header row, then columns row
  const rows = [
    headerRow,
    columnCells
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
