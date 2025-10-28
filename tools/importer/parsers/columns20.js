/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all images from the grid
  const grid = element.querySelector('.desktop-3-column');
  const imageDivs = grid ? Array.from(grid.querySelectorAll('.utility-position-relative')) : [];
  const images = imageDivs.map(div => div.querySelector('img')).filter(Boolean);

  // Extract hero content: heading, subheading, buttons
  const heroContentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content .container') || element.querySelector('.container');
  const heroCellContent = [];
  if (heroContentDiv) {
    const heroHeading = heroContentDiv.querySelector('h1');
    const heroSubheading = heroContentDiv.querySelector('p');
    const heroButtons = Array.from(heroContentDiv.querySelectorAll('.button-group a'));
    if (heroHeading) heroCellContent.push(heroHeading);
    if (heroSubheading) heroCellContent.push(heroSubheading);
    if (heroButtons.length) heroCellContent.push(...heroButtons);
  }

  // Compose table rows
  const headerRow = ['Columns (columns20)'];

  // Second row: images as columns
  const columnsRow = images.length ? images : [''];
  const numCols = columnsRow.length;

  // Third row: hero content distributed across columns
  // Place hero content in all columns (not just center), so each column has the hero content
  // This avoids unnecessary empty columns and ensures all columns have content
  const heroRow = Array(numCols).fill(heroCellContent.length ? heroCellContent : ['']);

  // Build table
  const cells = [
    headerRow,
    columnsRow,
    heroRow
  ];

  // Replace element with block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
