import html2canvas from 'html2canvas';

/**
 * Capture share card without modal scroll/overflow clipping.
 */
export async function captureShareCardElement(element) {
  if (!element) throw new Error('Card not ready');

  await new Promise((resolve) => setTimeout(resolve, 500));

  const clone = element.cloneNode(true);
  clone.style.cssText = [
    'position: fixed',
    'left: -10000px',
    'top: 0',
    'z-index: -1',
    'pointer-events: none',
    'transform: none',
    'margin: 0',
  ].join(';');

  document.body.appendChild(clone);

  try {
    const width = clone.offsetWidth || 300;
    const height = clone.scrollHeight || clone.offsetHeight;

    const canvas = await html2canvas(clone, {
      useCORS: true,
      allowTaint: true,
      scale: 2,
      backgroundColor: '#FDFBF7',
      logging: false,
      imageTimeout: 15000,
      foreignObjectRendering: false,
      width,
      height,
      windowWidth: width,
      windowHeight: height,
      scrollX: 0,
      scrollY: 0,
    });

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('Could not create image'))),
        'image/jpeg',
        0.92
      );
    });

    return blob;
  } finally {
    document.body.removeChild(clone);
  }
}
