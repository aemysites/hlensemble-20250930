/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (image, text block)
  const gridChildren = grid.querySelectorAll(':scope > *');
  if (gridChildren.length < 2) return;

  // Left column: image (reference the existing element)
  const img = gridChildren[0].tagName === 'IMG' ? gridChildren[0] : gridChildren[0].querySelector('img');
  const leftCell = img ? img : document.createTextNode('');

  // Right column: text content
  const textBlock = gridChildren[1];
  const rightCellContent = [];

  // Eyebrow (label)
  const eyebrow = textBlock.querySelector('.eyebrow');
  if (eyebrow) rightCellContent.push(eyebrow);

  // Tag (pill)
  const tag = textBlock.querySelector('.tag');
  if (tag) rightCellContent.push(tag);

  // Heading
  const heading = textBlock.querySelector('h2, .h2-heading');
  if (heading) rightCellContent.push(heading);

  // Metadata (author, role, date)
  const metaRow = textBlock.querySelector('.flex-horizontal.flex-gap-xxs');
  if (metaRow) rightCellContent.push(metaRow);

  // Table header row per spec
  const headerRow = ['Columns (columns33)'];
  const contentRow = [leftCell, rightCellContent];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the section with the block table
  element.replaceWith(table);
}
