/**
 * @param {string} filename The filename.
 * @param {string} content The file content.
 * @param {string} contentType The content type (e.g.: `text/plain`)
 * @returns {HTMLAnchorElement} An anchor element that will download the file when clicked.
 */
export const createDownloadableElement = (filename, content, contentType) => {
  let anchorEl = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  anchorEl.href = URL.createObjectURL(file);
  anchorEl.download = filename;
  anchorEl.target = '_blank';
  return anchorEl;
};

/**
 * 
 * @param {string} filename The filename.
 * @param {string} content The file content.
 * @param {string} contentType The content type (e.g.: `text/plain`)
 */
export const downloadTextFile = (filename, content, contentType) => {
  const hiddenElement = createDownloadableElement(filename, content, contentType);
  hiddenElement.click();
  URL.revokeObjectURL(hiddenElement.href); /** See https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL */
};