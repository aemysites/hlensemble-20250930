/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: extract each card's image and text content
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Find all card links (each card is an <a> element)
  const cardLinks = element.querySelectorAll('a.card-link');

  cardLinks.forEach((card) => {
    // --- Image cell ---
    // The image is inside a div with class 'utility-aspect-3x2', then <img>
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    let imageEl = null;
    if (imgContainer) {
      imageEl = imgContainer.querySelector('img');
    }

    // --- Text cell ---
    // The text content is inside .utility-padding-all-1rem
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    let textCellContent = [];
    if (textContainer) {
      // Tag (optional, but always present in this example)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        textCellContent.push(tagGroup);
      }
      // Heading (h3)
      const heading = textContainer.querySelector('h3');
      if (heading) {
        textCellContent.push(heading);
      }
      // Description (p)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textCellContent.push(desc);
      }
    }

    // Add the row: [image, text content]
    rows.push([
      imageEl || '',
      textCellContent.length ? textCellContent : ''
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
