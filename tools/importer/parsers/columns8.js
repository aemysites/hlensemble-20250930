/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const gridDiv = element.querySelector('.w-layout-grid');
  if (!gridDiv) return;

  // Find the heading (left column)
  const heading = gridDiv.querySelector('h2');

  // Find the right column: the div containing paragraph and button
  // Defensive: get the div that is not the heading
  let rightColDiv = null;
  for (const child of gridDiv.children) {
    if (child.tagName === 'DIV' && child !== heading) {
      rightColDiv = child;
      break;
    }
  }

  // Edge case: if right column is missing, use empty cell
  let rightColContent = [];
  if (rightColDiv) {
    // Collect all children (paragraph, button, etc.)
    rightColContent = Array.from(rightColDiv.children);
  }

  // Table header must match block name exactly
  const headerRow = ['Columns (columns8)'];

  // Table content row: left is heading, right is paragraph + button
  // Reference actual elements, do not clone or create new ones
  const contentRow = [heading || '', rightColContent.length ? rightColContent : ''];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
