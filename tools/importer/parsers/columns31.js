/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns31)'];

  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column)
  const columns = Array.from(grid.children);
  if (columns.length < 4) return;

  // Combine the name and tags (columns[0] and columns[1]) into one cell for the left column
  const leftCol = document.createElement('div');
  leftCol.appendChild(columns[0]); // Name
  leftCol.appendChild(columns[1]); // Tags

  // Center column: headline (h2)
  const centerCol = columns[2];
  // Right column: rich text paragraphs
  const rightCol = columns[3];

  // Build the table rows
  const contentRow = [leftCol, centerCol, rightCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
