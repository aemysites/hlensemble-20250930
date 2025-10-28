/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract card content from a card anchor or container
  function extractCardContent(cardEl) {
    // Find image (first img in card)
    const img = cardEl.querySelector('img');

    // Find heading (h2 or h3 or h4)
    let heading = cardEl.querySelector('h2, h3, h4');
    // Defensive: If heading is missing, fallback to first strong or b
    if (!heading) heading = cardEl.querySelector('strong, b');

    // Find description (first p after heading)
    let description;
    if (heading) {
      // Find next sibling p after heading
      let next = heading.nextElementSibling;
      while (next && next.tagName !== 'P') next = next.nextElementSibling;
      description = next;
    } else {
      // Fallback: first p
      description = cardEl.querySelector('p');
    }

    // Find CTA (button or link or div with button class)
    let cta = cardEl.querySelector('a.button, button, .button');
    // Defensive: If CTA is a div, wrap in a span
    if (cta && cta.tagName === 'DIV') {
      const span = document.createElement('span');
      span.appendChild(cta);
      cta = span;
    }

    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    if (cta) textCell.push(cta);

    return [img, textCell];
  }

  // Find the main grid containing all cards
  // The first grid-layout is the outer grid, the second is the inner grid for right cards
  const grids = element.querySelectorAll('.grid-layout');
  const mainGrid = grids[0];
  const rightGrid = grids[1];

  // Collect card elements
  const cards = [];
  // Left card: first child of mainGrid (anchor)
  const leftCard = mainGrid.querySelector('a.utility-link-content-block');
  if (leftCard) cards.push(leftCard);
  // Right cards: direct children anchors of rightGrid
  if (rightGrid) {
    rightGrid.querySelectorAll('a.utility-link-content-block').forEach(card => {
      cards.push(card);
    });
  }

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);
  // Card rows
  cards.forEach(cardEl => {
    rows.push(extractCardContent(cardEl));
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
