/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row for Columns (columns30)
  const headerRow = ['Columns (columns30)'];

  // Defensive: Get all immediate children (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content (image)
  const contentRow = columns.map((col) => {
    // Find the first image inside this column
    const img = col.querySelector('img');
    // If image found, use it; else, fallback to the column itself
    return img || col;
  });

  // Build the table structure
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
