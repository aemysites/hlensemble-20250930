/* global WebImporter */
export default function parse(element, { document }) {
  // Tabs (tabs22) block parsing
  // 1. Find tab headers (labels)
  const tabMenu = element.querySelector('[role="tablist"]');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('[role="tab"]')) : [];

  // 2. Find tab content panels
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // Defensive: If no tabs found, do nothing
  if (!tabLinks.length || !tabPanes.length) return;

  // 3. Build rows: [Tab Label, Tab Content]
  const rows = [];
  for (let i = 0; i < tabLinks.length; i++) {
    // Tab label
    let label = tabLinks[i].textContent.trim();
    // Tab content: get the corresponding pane
    let pane = tabPanes[i];
    // Defensive: If pane missing, skip
    if (!pane) continue;
    // Get the inner grid (usually contains heading + image)
    let grid = pane.querySelector('.w-layout-grid, .grid-layout');
    // If no grid, fallback to pane itself
    let content = grid || pane;
    rows.push([label, content]);
  }

  // 4. Table header row
  const headerRow = ['Tabs (tabs22)'];
  // 5. Compose table cells
  const cells = [headerRow, ...rows];
  // 6. Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // 7. Replace original element
  element.replaceWith(block);
}
