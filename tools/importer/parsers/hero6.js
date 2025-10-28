/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children divs of the main grid
  const gridDivs = element.querySelectorAll(':scope > div > div');

  // Find the image (background)
  let imgEl = null;
  if (gridDivs.length > 0) {
    const firstGrid = gridDivs[0];
    imgEl = firstGrid.querySelector('img');
  }

  // Find the card with text and CTAs
  let cardEl = null;
  if (gridDivs.length > 1) {
    const secondGrid = gridDivs[1];
    cardEl = secondGrid.querySelector('.card');
  }

  // Extract heading, subheading, and CTAs from the card
  let headingEl = null;
  let subheadingEl = null;
  let ctaEls = [];
  if (cardEl) {
    headingEl = cardEl.querySelector('h1');
    subheadingEl = cardEl.querySelector('p');
    const buttonGroup = cardEl.querySelector('.button-group');
    if (buttonGroup) {
      ctaEls = Array.from(buttonGroup.querySelectorAll('a'));
    }
  }

  // Build table rows
  const headerRow = ['Hero (hero6)'];
  const imageRow = [imgEl ? imgEl : ''];

  // Compose text/cta cell
  const contentCell = [];
  if (headingEl) contentCell.push(headingEl);
  if (subheadingEl) contentCell.push(subheadingEl);
  if (ctaEls.length) {
    const ctaDiv = document.createElement('div');
    ctaDiv.append(...ctaEls);
    contentCell.push(ctaDiv);
  }
  const contentRow = [contentCell.length ? contentCell : ''];

  // Create block table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
