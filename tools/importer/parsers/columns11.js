/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;
  const grids = container.querySelectorAll('.grid-layout');
  if (grids.length < 2) return;

  // Top grid: headline/eyebrow/h1 (left), paragraph+author+button (right)
  const topGrid = grids[0];
  const topColumns = Array.from(topGrid.children).filter(el => el.tagName === 'DIV');
  if (topColumns.length < 2) return;

  // Left cell: eyebrow + h1
  const leftCol = topColumns[0];
  const leftCell = document.createElement('div');
  const eyebrow = leftCol.querySelector('.eyebrow');
  if (eyebrow) leftCell.appendChild(eyebrow.cloneNode(true));
  const h1 = leftCol.querySelector('h1');
  if (h1) leftCell.appendChild(h1.cloneNode(true));

  // Right cell: paragraph, author info, button
  const rightCol = topColumns[1];
  const rightCell = document.createElement('div');
  const paragraph = rightCol.querySelector('.rich-text, .w-richtext, p');
  if (paragraph) rightCell.appendChild(paragraph.cloneNode(true));
  // Author info
  const authorGrid = rightCol.querySelector('.grid-layout');
  if (authorGrid) {
    const avatarImg = authorGrid.querySelector('.avatar img');
    if (avatarImg) rightCell.appendChild(avatarImg.cloneNode(true));
    const authorName = authorGrid.querySelector('.paragraph-sm:not(.utility-text-secondary)');
    if (authorName) rightCell.appendChild(authorName.cloneNode(true));
    const metaInfo = authorGrid.querySelectorAll('.utility-text-secondary');
    metaInfo.forEach(meta => rightCell.appendChild(meta.cloneNode(true)));
    const button = authorGrid.querySelector('a.button, .w-button');
    if (button) rightCell.appendChild(button.cloneNode(true));
  } else {
    const button = rightCol.querySelector('a.button, .w-button');
    if (button) rightCell.appendChild(button.cloneNode(true));
  }

  // Bottom grid: two images side by side
  const bottomGrid = grids[1];
  const imageDivs = Array.from(bottomGrid.children).filter(el => el.tagName === 'DIV');
  const images = imageDivs.map(div => div.querySelector('img')).filter(Boolean).map(img => img.cloneNode(true));
  if (images.length < 2) return;

  // Build table rows
  const headerRow = ['Columns (columns11)'];
  const contentRow = [leftCell, rightCell];
  const imageRow = [images[0], images[1]];

  const cells = [headerRow, contentRow, imageRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
