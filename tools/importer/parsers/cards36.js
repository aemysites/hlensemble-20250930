/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from an anchor card
  function extractCardContent(cardEl) {
    // Find image (if present)
    const imgWrapper = cardEl.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let img = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Find tag (if present)
    const tagGroup = cardEl.querySelector('.tag-group');
    let tag = tagGroup ? tagGroup.querySelector('.tag') : null;
    // Find heading
    let heading = cardEl.querySelector('h3');
    // Find description
    let desc = cardEl.querySelector('p');
    // Build text cell
    const textParts = [];
    if (tag) textParts.push(tag);
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    return [img, textParts];
  }

  // Get the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Collect all cards
  const cards = [];

  // First child: feature card (left)
  const featureCard = gridChildren[0] && gridChildren[0].matches('a.utility-link-content-block') ? gridChildren[0] : null;
  if (featureCard) {
    const [img, textParts] = extractCardContent(featureCard);
    cards.push([img, textParts]);
  }

  // Second child: group with two cards with images
  const rightColGroup1 = gridChildren[1];
  if (rightColGroup1 && rightColGroup1.classList.contains('flex-horizontal')) {
    const imgCards = rightColGroup1.querySelectorAll('a.utility-link-content-block');
    imgCards.forEach(cardEl => {
      const [img, textParts] = extractCardContent(cardEl);
      cards.push([img, textParts]);
    });
  }

  // Third child: group with text-only cards separated by dividers
  const rightColGroup2 = gridChildren[2];
  if (rightColGroup2 && rightColGroup2.classList.contains('flex-horizontal')) {
    const textCards = rightColGroup2.querySelectorAll('a.utility-link-content-block');
    textCards.forEach(cardEl => {
      const heading = cardEl.querySelector('h3');
      const desc = cardEl.querySelector('p');
      const textParts = [];
      if (heading) textParts.push(heading);
      if (desc) textParts.push(desc);
      cards.push([null, textParts]);
    });
  }

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards36)']);
  // Card rows
  cards.forEach(([img, textParts]) => {
    rows.push([
      img || '',
      Array.isArray(textParts) ? textParts : [textParts]
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
