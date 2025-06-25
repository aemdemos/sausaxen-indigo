/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row
  const rows = [['Cards']];

  // Find the carousel track containing the slides
  const slickList = element.querySelector('.slick-list');
  if (!slickList) return;
  const slickTrack = slickList.querySelector('.slick-track');
  if (!slickTrack) return;

  // Get all card slides
  const slides = slickTrack.querySelectorAll('.slick-slide');
  slides.forEach((slide) => {
    // Find the card anchor (a)
    const cardLink = slide.querySelector('a');
    if (!cardLink) return;
    // Reference the existing h4 for the heading/title
    const heading = cardLink.querySelector('h4');
    if (!heading) return;
    // If there is a description or CTA (not present in this HTML), get it and add it below the heading
    // For flexibility, also check for a description paragraph or div
    let description = null;
    let cta = null;
    // Try to find a description (if it exists in future structures)
    description = cardLink.querySelector('p, .description, span');
    // Try to find a CTA link (if it exists)
    cta = cardLink.querySelector('a.cta, .cta');

    // Build cell content: always include heading, then (if present) description, then (if present) CTA
    const cellContent = [heading];
    if (description) {
      cellContent.push(document.createElement('br'));
      cellContent.push(description);
    }
    if (cta && cta !== cardLink) {
      cellContent.push(document.createElement('br'));
      cellContent.push(cta);
    }
    rows.push([cellContent]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
