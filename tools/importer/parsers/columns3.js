/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Find the image element (right column)
  let imageEl = grid.querySelector('img');

  // Find the content element (left column)
  let contentCol = null;
  // Try to find the div containing heading, subheading, and buttons
  for (const child of gridChildren) {
    if (child.querySelector('h1')) {
      contentCol = child;
      break;
    }
  }
  // Fallback: use first div if not found
  if (!contentCol) {
    contentCol = grid.querySelector('div');
  }

  // Collect all text and interactive content from the left column
  const contentFragment = document.createElement('div');
  if (contentCol) {
    // Include heading
    const heading = contentCol.querySelector('h1');
    if (heading) contentFragment.appendChild(heading.cloneNode(true));
    // Include subheading
    const subheading = contentCol.querySelector('p');
    if (subheading) contentFragment.appendChild(subheading.cloneNode(true));
    // Include button group
    const buttonGroup = contentCol.querySelector('.button-group');
    if (buttonGroup) contentFragment.appendChild(buttonGroup.cloneNode(true));
  }

  // Build table rows
  const headerRow = ['Columns (columns3)'];
  const columnsRow = [contentFragment.childNodes.length ? contentFragment : '', imageEl];
  const cells = [headerRow, columnsRow];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
