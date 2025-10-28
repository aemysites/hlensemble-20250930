/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block header
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = element.querySelectorAll('.w-tab-pane');

  tabPanes.forEach((tabPane) => {
    // For each tab, find the grid containing cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;

    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
    cards.forEach((card) => {
      // IMAGE CELL
      // Try to find an image inside the card
      let img = card.querySelector('img');
      let imageCell = '';
      if (img) imageCell = img;
      // If no image, leave cell empty (do not add placeholder/icon)

      // TEXT CELL
      // Find heading and description inside the card
      let heading = card.querySelector('h3');
      let description = card.querySelector('.paragraph-sm');
      // Compose text cell
      const textCellContent = [];
      if (heading) textCellContent.push(heading);
      if (description) textCellContent.push(description);
      rows.push([
        imageCell,
        textCellContent
      ]);
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
