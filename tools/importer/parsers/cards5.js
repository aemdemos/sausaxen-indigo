/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all card elements
  const cards = Array.from(element.querySelectorAll('.commonAdOnsWrap > .commonBottomAdon'));
  const rows = [['Cards']];

  cards.forEach(card => {
    const anchor = card.querySelector('a');

    // --- IMAGE CELL ---
    let imgElem = null;
    const picture = anchor && anchor.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) imgElem = img;
    }

    // --- TEXT CELL ---
    const textContents = [];
    // Title
    const title = anchor && anchor.querySelector('.ig-common-title');
    if (title && title.textContent.trim()) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      p.appendChild(strong);
      textContents.push(p);
    }
    // Subtitle/description below the title, if present and non-empty
    const subtitle = anchor && anchor.querySelector('.ig-common-subtitle');
    if (subtitle && subtitle.textContent.trim()) {
      const descP = document.createElement('p');
      descP.textContent = subtitle.textContent.trim();
      textContents.push(descP);
    }
    // If there is no title or description, leave the cell empty
    rows.push([
      imgElem || '',
      textContents.length > 0 ? textContents : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
