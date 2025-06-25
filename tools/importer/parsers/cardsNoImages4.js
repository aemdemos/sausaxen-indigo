/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card slides in the carousel (each .slick-slide)
  const slides = element.querySelectorAll('.slick-slide');
  const rows = [
    ['Cards'], // Header row matches example
  ];

  slides.forEach((slide) => {
    // Each card's content is within this structure:
    // .ig-slide-item > .ig-carosuel-item > a > .exploreMore-travelGuide.plan-travel-blck
    const link = slide.querySelector('.ig-carosuel-item > a');
    if (!link) return; // skip if no link
    const cardContent = link.querySelector('.exploreMore-travelGuide');
    if (!cardContent) return;

    // We'll build an array of elements for the cell
    const cellContent = [];

    // Use img if present (reference existing element)
    const img = cardContent.querySelector('img');
    if (img) cellContent.push(img);

    // Use the heading (h4) if present (reference existing element)
    const heading = cardContent.querySelector('h4');
    if (heading) cellContent.push(heading);

    // If there's any content in the cell, wrap it in the <a> (reference existing link)
    // but only append img and heading (no content is outside)
    if (cellContent.length > 0) {
      // Reference the original <a>, but clear out and only append img + heading
      while (link.firstChild) link.removeChild(link.firstChild);
      cellContent.forEach((node) => link.appendChild(node));
      rows.push([link]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
