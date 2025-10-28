/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image element (should be direct child of main grid)
  const imageEl = element.querySelector('img');

  // Find the main content block: heading, paragraph, and button group
  let contentBlock = null;
  const grid = element.querySelector('.w-layout-grid.grid-layout.container');
  if (grid) {
    const candidates = Array.from(grid.querySelectorAll('div.section'));
    for (const candidate of candidates) {
      if (
        candidate.querySelector('h2') &&
        candidate.querySelector('.button-group')
      ) {
        contentBlock = candidate;
        break;
      }
    }
  }
  // Fallback: if not found, try by heading
  if (!contentBlock) {
    contentBlock = element.querySelector('h2')?.closest('div');
  }
  // Defensive fallback
  if (!contentBlock) {
    contentBlock = element.querySelector('div.section');
  }

  // Extract only the heading, paragraph, and buttons for clarity
  const heading = contentBlock.querySelector('h2');
  const paragraph = contentBlock.querySelector('.rich-text p');
  const buttonGroup = contentBlock.querySelector('.button-group');

  // Compose the content cell
  const contentCell = document.createElement('div');
  if (heading) contentCell.appendChild(heading.cloneNode(true));
  if (paragraph) contentCell.appendChild(paragraph.cloneNode(true));
  if (buttonGroup) contentCell.appendChild(buttonGroup.cloneNode(true));

  // Table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [imageEl];
  const contentRow = [contentCell];

  // Create block table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
