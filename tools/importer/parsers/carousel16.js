/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container holding the carousel images
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each is a slide)
  const slideDivs = Array.from(grid.children);

  // Prepare the table rows
  const headerRow = ['Carousel (carousel16)'];
  const rows = [headerRow];

  slideDivs.forEach(slideDiv => {
    // Each slideDiv contains a nested div with the image inside
    const aspectDiv = slideDiv.querySelector('.utility-aspect-2x3');
    let img = null;
    if (aspectDiv) {
      img = aspectDiv.querySelector('img');
    }
    // Only add row if image is present
    if (img) {
      rows.push([img, '']); // Two columns: image and empty text column
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
