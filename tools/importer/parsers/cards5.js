/* global WebImporter */
export default function parse(element, { document }) {
  // Find all cards in the container
  const cards = element.querySelectorAll('.commonAdOnsWrap > .commonBottomAdon');
  // Table header: must match exactly
  const rows = [['Cards']];

  cards.forEach(card => {
    const a = card.querySelector('a');
    if (!a) return;

    // Get image (use <picture> if present, else <img>)
    const picture = a.querySelector('picture');
    let imageEl = null;
    if (picture) {
      imageEl = picture;
    } else {
      const img = a.querySelector('img');
      if (img) imageEl = img;
    }

    // Get card title text
    const titleEl = a.querySelector('.ig-common-title');
    // Get description (subtitle), only if non-empty
    let descEl = a.querySelector('.ig-common-subtitle');
    if (descEl && !descEl.textContent.trim()) descEl = null;

    // Compose right cell (text content)
    const textCell = [];
    if (titleEl) {
      // Use <strong> for heading equivalent (matches markdown example appearance)
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      textCell.push(strong);
    }
    if (descEl) {
      // Add line break if both exist
      if (titleEl) textCell.push(document.createElement('br'));
      textCell.push(descEl);
    }

    // Each row: [image, text content]. Always 2 columns, as per block spec.
    rows.push([
      imageEl,
      textCell.length > 1 ? textCell : textCell[0] // array if both heading+desc, else just heading
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
