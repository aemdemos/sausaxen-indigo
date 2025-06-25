/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function: collect all meaningful content from a parent node, preserving semantic meaning
  function collectSemanticContent(parent) {
    const result = [];
    for (const child of parent.childNodes) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        // Only push elements with visible or relevant content
        if (
          child.matches('h1,h2,h3,h4,h5,h6,p,ul,ol,li,a,img,button,span,strong,em,div') &&
          (child.textContent.trim() || child.querySelector('img,a'))
        ) {
          result.push(child);
        }
      } else if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
        // Wrap bare text nodes in a <span> to preserve them
        const span = document.createElement('span');
        span.textContent = child.textContent.trim();
        result.push(span);
      }
    }
    // If nothing found, fallback to the parent itself
    return result.length ? result : [parent];
  }

  // Gather the columns: 3 from accordion, 1 from social/downloads
  const columns = [];
  // The accordion columns: 'Get to Know Us', 'Services', 'Quick links'
  const accordion = element.querySelector('.ig-footer-accordion');
  if (accordion) {
    const accSitemaps = accordion.querySelectorAll(':scope > .col-12.col-md-3.ig-acc-sitemap');
    for (let i = 0; i < 3; i += 1) {
      const sitemap = accSitemaps[i];
      if (sitemap) {
        const section = sitemap.querySelector('.footer-links.section');
        if (section) {
          columns.push(collectSemanticContent(section));
        } else {
          columns.push(collectSemanticContent(sitemap));
        }
      } else {
        columns.push(document.createElement('div'));
      }
    }
  } else {
    for (let i = 0; i < 3; i += 1) columns.push(document.createElement('div'));
  }
  // The social/downloads/awards column (right side in screenshot)
  const row = element.querySelector('.row');
  if (row) {
    const socialDownloads = row.querySelector('.col-lg-3.social-downloads');
    if (socialDownloads) {
      columns.push(collectSemanticContent(socialDownloads));
    } else {
      columns.push(document.createElement('div'));
    }
  } else {
    columns.push(document.createElement('div'));
  }

  // Build table cells: header is a single cell, data is a row with all columns
  const tableCells = [
    [ 'Columns (columns9)' ],
    columns
  ];

  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
