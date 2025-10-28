/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Get the grid layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each column cell)
  const cells = Array.from(grid.children);

  // Defensive: Only proceed if there are at least one cell
  if (cells.length === 0) return;

  // For each cell, extract its main content (text or button)
  const columnCells = cells.map((cell) => {
    // If cell contains a button, use the button element
    const button = cell.querySelector('a, button');
    if (button) return button;
    // Otherwise, use the full cell (usually a <div> with <p>)
    return cell;
  });

  // Compose the table rows
  const rows = [
    headerRow,
    columnCells
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
