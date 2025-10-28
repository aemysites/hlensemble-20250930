/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns28)'];

  // Defensive: Find the grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: left content, right image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: rich text content (eyebrow, heading, paragraphs, button)
  const leftCol = gridChildren[0];
  // Right column: image
  const rightCol = gridChildren[1];

  // For left column, preserve all its children as a single block
  const leftContent = Array.from(leftCol.childNodes).filter(node => {
    // Only keep elements and non-empty text nodes
    return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
  });

  // For right column, use the image element directly
  let rightContent = null;
  if (rightCol.tagName === 'IMG') {
    rightContent = rightCol;
  } else {
    // Defensive: If not an image, search for an image inside
    rightContent = rightCol.querySelector('img');
  }

  // Build the table rows
  const rows = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
