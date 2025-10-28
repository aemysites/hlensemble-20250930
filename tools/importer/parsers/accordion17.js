/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell with block name
  const headerRow = ['Accordion (accordion17)'];

  // Find all accordion items
  const items = Array.from(element.querySelectorAll('.w-dropdown'));

  // Build rows: [title, content]
  const rows = items.map(item => {
    // Title: clickable header
    const toggle = item.querySelector('[role="button"]');
    let title = '';
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      title = titleDiv ? titleDiv.textContent.trim() : toggle.textContent.trim();
    }
    // Content: rich text inside nav.accordion-content
    const contentNav = item.querySelector('nav.accordion-content');
    let content = '';
    if (contentNav) {
      const richText = contentNav.querySelector('.rich-text, .w-richtext');
      content = richText ? richText : contentNav;
    }
    if (typeof content === 'string') {
      const div = document.createElement('div');
      div.textContent = content;
      content = div;
    }
    return [title, content];
  });

  // Compose table cells
  const cells = [headerRow, ...rows];
  const table = document.createElement('table');
  cells.forEach((row, i) => {
    const tr = document.createElement('tr');
    if (i === 0) {
      // Header row: single cell
      const td = document.createElement('td');
      td.textContent = row[0];
      tr.appendChild(td);
    } else {
      row.forEach(cell => {
        const td = document.createElement('td');
        if (cell instanceof HTMLElement) {
          td.appendChild(cell);
        } else {
          td.textContent = cell;
        }
        tr.appendChild(td);
      });
    }
    table.appendChild(tr);
  });

  element.replaceWith(table);
}
