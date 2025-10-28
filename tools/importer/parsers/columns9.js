/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Identify left column (headings and description)
  const leftCol = children.find(child => child.querySelector('h2') && child.querySelector('h3'));
  // Identify right column (contact info list)
  const rightCol = children.find(child => child.tagName === 'UL');
  // Identify bottom image (spans both columns visually)
  const bottomImg = children.find(child => child.tagName === 'IMG');

  // Defensive: ensure all columns exist
  if (!leftCol || !rightCol || !bottomImg) return;

  // Build table rows
  // Header row: block name
  const headerRow = ['Columns (columns9)'];

  // First content row: left and right columns
  const columnsRow = [leftCol, rightCol];

  // Second row: image spans both columns visually (single cell with colspan)
  // Instead of passing an object, pass an array with just the image element
  // and set the row to have only one cell, which will span both columns
  const rows = [headerRow, columnsRow];

  // Create the table first
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Now, add the image row manually with colspan=2
  const imgRow = document.createElement('tr');
  const imgCell = document.createElement('td');
  imgCell.colSpan = 2;
  imgCell.appendChild(bottomImg.cloneNode(true));
  imgRow.appendChild(imgCell);
  table.appendChild(imgRow);

  // Replace original element with table
  element.replaceWith(table);
}
