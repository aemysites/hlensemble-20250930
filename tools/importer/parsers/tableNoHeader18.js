/* global WebImporter */
export default function parse(element, { document }) {
  // Table (no header, tableNoHeader18) block
  // The header row must be exactly one column with the block name only
  const headerRow = ['Table (no header, tableNoHeader18)'];
  const rows = [];

  // Get all direct children that are dividers (each represents a row)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  dividers.forEach(divider => {
    // Each divider contains a grid-layout with two children: question and answer
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return;
    const gridChildren = Array.from(grid.children);
    if (gridChildren.length < 2) return;
    const question = gridChildren[0]; // h4-heading
    const answer = gridChildren[1];   // rich-text paragraph
    rows.push([question, answer]);
  });

  // Compose the table cells
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
