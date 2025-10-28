/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (holds the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const columns = Array.from(grid.children);
  if (columns.length < 4) return;

  // --- Column 1: logo + social icons + all text ---
  const firstCol = columns[0];
  const col1 = document.createElement('div');
  const logoLink = firstCol.querySelector('.logo');
  if (logoLink) col1.appendChild(logoLink.cloneNode(true));
  const socialIcons = firstCol.querySelector('.footer-icons-group');
  if (socialIcons) col1.appendChild(socialIcons.cloneNode(true));
  Array.from(firstCol.childNodes).forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      col1.appendChild(document.createTextNode(node.textContent.trim()));
    }
  });

  // --- Columns 2-4: navigation lists ---
  // Each column contains a heading and a list of links
  function extractNavCol(col) {
    const frag = document.createElement('div');
    // Get heading (only once, outside the ul)
    const heading = col.querySelector('h2');
    if (heading) frag.appendChild(heading.cloneNode(true));
    // Get <ul> (should contain all <li> links)
    const ul = col.querySelector('ul');
    if (ul) frag.appendChild(ul.cloneNode(true));
    // Also include any stray text nodes directly under col
    Array.from(col.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        frag.appendChild(document.createTextNode(node.textContent.trim()));
      }
    });
    return frag;
  }
  const col2 = extractNavCol(columns[1]);
  const col3 = extractNavCol(columns[2]);
  const col4 = extractNavCol(columns[3]);

  const headerRow = ['Columns (columns21)'];
  const cellsRow = [col1, col2, col3, col4];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);

  element.replaceWith(table);
}
