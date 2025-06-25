/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the main desktop image for the hero background
  let heroImg = null;
  const imgs = element.querySelectorAll('img');
  if (imgs.length > 0) {
    // Prefer non-base64 (real) image, fallback to first if not found
    heroImg = Array.from(imgs).find(img => img.src && !img.src.startsWith('data:')) || imgs[0];
  }

  // Extract the content block (text)
  let contentCell = '';
  // Try to find the main content div used for the banner text
  const bannerContent = element.querySelector('.banner-content');
  if (bannerContent) {
    // If the content is empty, leave blank (as in example)
    // If there are children (like h2, p, etc.), pass the div itself
    // If all children are empty or whitespace, leave blank
    const hasContent = Array.from(bannerContent.childNodes).some(n => n.textContent && n.textContent.trim().length > 0);
    contentCell = hasContent ? bannerContent : '';
  } else {
    // No banner content found; leave blank
    contentCell = '';
  }

  // Construct the table rows as per example: 1 column, 3 rows
  const cells = [
    ['Hero'],
    [heroImg ? heroImg : ''],
    [contentCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
