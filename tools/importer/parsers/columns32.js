/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns32)'];

  // Defensive: find the main grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  let leftCol, rightCol;
  if (grid) {
    // The grid-layout contains two children: left (text), right (image)
    const gridChildren = Array.from(grid.children);
    leftCol = gridChildren[0];
    rightCol = gridChildren[1];
  } else {
    // Fallback: treat the first div as left, second as right
    const children = Array.from(element.querySelectorAll(':scope > div'));
    leftCol = children[0];
    rightCol = children[1];
  }

  // --- LEFT COLUMN ---
  // Compose all relevant left column content into a single container
  let leftContent = document.createElement('div');
  if (leftCol) {
    // Breadcrumbs
    const breadcrumbs = leftCol.querySelector('.flex-horizontal');
    if (breadcrumbs) leftContent.appendChild(breadcrumbs.cloneNode(true));
    // Heading
    const heading = leftCol.querySelector('h2');
    if (heading) leftContent.appendChild(heading.cloneNode(true));
    // Author/date/read time
    const meta = leftCol.querySelector('.utility-margin-bottom-1rem');
    if (meta) leftContent.appendChild(meta.cloneNode(true));
    // Social icons
    const social = leftCol.querySelector('ul[aria-label]');
    if (social) leftContent.appendChild(social.cloneNode(true));
  }

  // --- RIGHT COLUMN ---
  // Find the image element
  let rightContent = document.createElement('div');
  if (rightCol) {
    const img = rightCol.querySelector('img');
    if (img) rightContent.appendChild(img);
  }

  // Compose the table rows
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
