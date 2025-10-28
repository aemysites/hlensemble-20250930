/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero13)'];

  // Get direct children of the main section
  const topDivs = element.querySelectorAll(':scope > div');

  // Find the background image (should be the first image in the first child div)
  let backgroundImg = null;
  if (topDivs.length > 0) {
    backgroundImg = topDivs[0].querySelector('img');
  }

  // Find the card overlay (contains text, CTA, and secondary image)
  let cardBody = null;
  if (topDivs.length > 1) {
    cardBody = topDivs[1].querySelector('.card-body');
  }

  // Compose the content cell for row 3
  let contentCell = [];
  if (cardBody) {
    // Secondary image (concert crowd)
    const secondaryImg = cardBody.querySelector('img');
    if (secondaryImg) contentCell.push(secondaryImg.cloneNode(true));

    // Heading
    const heading = cardBody.querySelector('h2');
    if (heading) contentCell.push(heading.cloneNode(true));

    // Features (icon + text + divider)
    const verticalFlex = cardBody.querySelector('.flex-vertical');
    if (verticalFlex) {
      Array.from(verticalFlex.children).forEach(child => {
        if (child.classList.contains('flex-horizontal')) {
          contentCell.push(child.cloneNode(true));
        } else if (child.classList.contains('divider')) {
          contentCell.push(child.cloneNode(true));
        }
      });
    }

    // CTA button
    const cta = cardBody.querySelector('.button-group a');
    if (cta) contentCell.push(cta.cloneNode(true));
  }

  // If contentCell is empty, fallback to all text content from cardBody
  if (contentCell.length === 0 && cardBody) {
    contentCell.push(document.createTextNode(cardBody.textContent.trim()));
  }

  // Table rows
  const rows = [
    headerRow,
    [backgroundImg],
    [contentCell.length ? contentCell : '']
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
