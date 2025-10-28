/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (main content)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // --- Extract Video Embed (with placeholder image) ---
  let videoEmbedCell = [];
  const videoWrap = grid.querySelector('.utility-position-relative');
  if (videoWrap) {
    const embed = videoWrap.querySelector('.w-embed-youtubevideo');
    if (embed) {
      // Find placeholder image and iframe
      const img = embed.querySelector('img');
      if (img) videoEmbedCell.push(img);
      const iframe = embed.querySelector('iframe');
      if (iframe && iframe.src) {
        // Use the iframe title for link text if available
        const a = document.createElement('a');
        a.href = iframe.src;
        a.textContent = iframe.title ? iframe.title : 'Watch video';
        videoEmbedCell.push(a);
      }
    }
  }
  if (videoEmbedCell.length === 0) videoEmbedCell = [''];

  // --- Extract visually hidden headline (screen-reader only) ---
  let srHeadline = null;
  const srH1 = grid.querySelector('.utility-screen-reader-visible-only');
  if (srH1) {
    const hiddenH1 = document.createElement('h1');
    hiddenH1.textContent = srH1.textContent.trim();
    hiddenH1.setAttribute('style', 'position:absolute;left:-9999px;');
    srHeadline = hiddenH1;
  }

  // --- Extract Headline ---
  let headline = null;
  const headlineDiv = grid.querySelector('.h1-heading');
  if (headlineDiv) {
    const h1 = document.createElement('h1');
    h1.textContent = headlineDiv.textContent.trim();
    headline = h1;
  }

  // --- Extract Subheading (paragraph) ---
  let subheading = null;
  const subDiv = grid.querySelector('.utility-padding-top-2rem');
  if (subDiv) {
    const p = subDiv.querySelector('p');
    if (p) subheading = p;
  }

  // --- Extract CTA buttons ---
  let ctas = [];
  const btnGroup = grid.querySelector('.button-group');
  if (btnGroup) {
    ctas = Array.from(btnGroup.querySelectorAll('a')).filter(a => a.textContent.trim());
  }

  // --- Compose the content cell for row 3 ---
  const contentCell = [];
  if (srHeadline) contentCell.push(srHeadline);
  if (headline) contentCell.push(headline);
  if (subheading) contentCell.push(subheading);
  if (ctas.length) contentCell.push(...ctas);

  // --- Table rows ---
  const headerRow = ['Hero (hero25)'];
  const imageRow = [videoEmbedCell];
  const contentRow = [contentCell];

  // --- Create table ---
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // --- Replace original element ---
  element.replaceWith(table);
}
