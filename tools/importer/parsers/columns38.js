/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns (columns38)'];

  // Defensive: get direct children of the main grid layout
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const gridChildren = mainGrid.querySelectorAll(':scope > div');

  // Left column: text content, subheading, button group
  const leftCol = gridChildren[0];
  let leftContent = [];
  if (leftCol) {
    // Heading
    const heading = leftCol.querySelector('h1');
    if (heading) leftContent.push(heading);
    // Subheading
    const subheading = leftCol.querySelector('p');
    if (subheading) leftContent.push(subheading);
    // Button group
    const buttonGroup = leftCol.querySelector('.button-group');
    if (buttonGroup) leftContent.push(buttonGroup);
  }

  // Right column: images (3 images in a horizontal row)
  const rightCol = gridChildren[1];
  let rightContent = [];
  if (rightCol) {
    // Find the grid containing the images
    const imagesGrid = rightCol.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
    if (imagesGrid) {
      const images = Array.from(imagesGrid.querySelectorAll('img'));
      if (images.length) {
        rightContent = images;
      }
    }
  }

  // Compose table rows: header, then one row with two columns
  const rows = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
