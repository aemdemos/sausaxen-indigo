/* global WebImporter */
export default function parse(element, { document }) {
  // Find navigation columns from accordion
  const accordion = element.querySelector('#footer-accordion');
  let navCols = [];
  if (accordion) {
    navCols = Array.from(
      accordion.querySelectorAll('.col-12.col-md-3.ig-acc-sitemap')
    ).filter(col => col.querySelector('.ig-footer-site-list li')).slice(0, 3);
  }

  // Social/downloads/awards column
  const row = element.querySelector('.row');
  let socialCol = null;
  if (row) {
    socialCol = row.querySelector('.col-lg-3.social-downloads');
  }
  const socialContent = [];
  if (socialCol) {
    Array.from(socialCol.children).forEach(child => {
      if (!child.classList || !child.classList.contains('footer-app-widget-custom')) {
        // Exclude empty divs and divs with only clearfix
        if (child.textContent.trim() !== '' || child.querySelector('img, a, ul, li, h6')) {
          socialContent.push(child);
        }
      }
    });
    // Add desktop download section
    const downloadSection = socialCol.querySelector('.d-none.d-sm-block');
    if (downloadSection) {
      socialContent.push(downloadSection);
    }
    // Add Awards section if present (sibling in row)
    const awardsSection = row.querySelector('.footer-links.section');
    if (awardsSection) {
      socialContent.push(awardsSection);
    }
  }

  // Compose the columns: three nav, one social
  const columns = [navCols[0], navCols[1], navCols[2], socialContent].filter(Boolean);

  // Build table: header row must be a single cell, content row must have N cells (N=columns.length)
  const cells = [
    ['Columns (columns9)'],
    columns.map(col => {
      if (Array.isArray(col)) {
        // Flatten any array (socialContent)
        const frag = document.createDocumentFragment();
        col.forEach(el => { if (el) frag.appendChild(el); });
        return frag;
      }
      return col;
    })
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
