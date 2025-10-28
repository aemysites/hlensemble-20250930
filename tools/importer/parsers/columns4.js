/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if we have at least 2 columns
  if (columns.length < 2) return;

  // First column: heading and paragraph
  const leftCol = columns[0];
  // Second column: button group
  const rightCol = columns[1];

  // Prepare the table rows
  const headerRow = ['Columns (columns4)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block
  element.replaceWith(block);
}
