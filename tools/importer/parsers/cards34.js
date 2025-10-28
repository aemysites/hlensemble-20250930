/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block header
  const headerRow = ['Cards (cards34)'];

  // Find all card anchor elements (each card is an <a> inside the grid container)
  const cardLinks = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  // Build rows for each card
  const rows = cardLinks.map(card => {
    // Image: first <img> in card
    const img = card.querySelector('img');

    // Text content container: the div after the image
    const textContainer = img.nextElementSibling;

    // Tag and read time: first flex-horizontal div
    const tagRow = textContainer.querySelector('.flex-horizontal');
    // Heading
    const heading = textContainer.querySelector('h3');
    // Description
    const description = textContainer.querySelector('p');
    // CTA ("Read") - must be the last direct child div in textContainer
    const divs = Array.from(textContainer.querySelectorAll(':scope > div'));
    const cta = divs.length ? divs[divs.length - 1] : null;

    // Compose text cell
    const textCellContent = [];
    if (tagRow) textCellContent.push(tagRow);
    if (heading) textCellContent.push(heading);
    if (description) textCellContent.push(description);
    if (cta && cta.textContent.trim().toLowerCase() === 'read') textCellContent.push(cta);

    // Ensure all text content is included
    // Reference existing elements, do not clone
    return [img, textCellContent];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
