/* global WebImporter */
export default function parse(element, { document }) {
  // Find the bckgrd-tupple container that holds both the images and text
  const bckgrdTupple = element.querySelector('.bckgrd-tupple');
  if (!bckgrdTupple) return;

  // Extract the desktop (main) image element
  // Prefer img with class xs-hidden (desktop), fallback to first img
  const imgs = Array.from(bckgrdTupple.querySelectorAll('img'));
  let bgImg = imgs.find(img => img.classList.contains('xs-hidden')) || imgs[0] || '';

  // Extract the banner content (for heading etc)
  const bannerContent = bckgrdTupple.querySelector('.banner-content');
  let textRowContent = '';
  if (bannerContent) {
    // Only include children that are not empty (skip empty h2, p)
    const nodes = Array.from(bannerContent.childNodes).filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        return node.textContent.trim() !== '';
      } else if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim() !== '';
      }
      return false;
    });
    textRowContent = nodes.length > 0 ? nodes : '';
  }

  // Build the table for the Hero block
  const cells = [
    ['Hero'],
    [bgImg],
    [textRowContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}
