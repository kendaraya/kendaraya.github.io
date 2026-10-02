import { toPng } from 'html-to-image';

export async function exportChartAsPng(elementId: string, filename = 'kendaraya-chart.png'): Promise<boolean> {
  const node = document.getElementById(elementId);
  if (!node) {
    console.error(`Element with id ${elementId} not found.`);
    return false;
  }

  try {
    const dataUrl = await toPng(node, {
      quality: 0.98,
      pixelRatio: 2, // High DPI resolution for crisp charts
      backgroundColor: '#faf8f5',
      filter: (child: HTMLElement) => {
        // Exclude elements marked as no-export
        return !child.classList?.contains('no-export');
      },
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (error) {
    console.error('Failed to export chart image:', error);
    // Fallback: try capturing just SVG directly
    const svgElem = node.querySelector('svg');
    if (svgElem) {
      const svgData = new XMLSerializer().serializeToString(svgElem);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const link = document.createElement('a');
      link.download = filename.replace('.png', '.svg');
      link.href = svgUrl;
      link.click();
      URL.revokeObjectURL(svgUrl);
      return true;
    }
    return false;
  }
}

export function printChartPdf(): void {
  window.print();
}
