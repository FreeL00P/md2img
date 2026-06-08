import html2canvas from 'html2canvas';

const exportOptions = {
  scale: 2,
  useCORS: true,
  allowTaint: false,
  logging: false
};

function createExportWrapper(container: HTMLElement, backgroundColor: string) {
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.left = '-9999px';
  wrapper.style.top = '0';
  wrapper.style.padding = '24px';
  wrapper.style.backgroundColor = backgroundColor;
  wrapper.appendChild(container.cloneNode(true));
  document.body.appendChild(wrapper);

  return wrapper;
}

export async function copyElementAsPng(container: HTMLElement, backgroundColor: string) {
  const canvas = await html2canvas(container, {
    ...exportOptions,
    backgroundColor
  });

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Unable to create PNG blob'));
      }
    }, 'image/png', 1.0);
  });

  await navigator.clipboard.write([
    new ClipboardItem({
      'image/png': blob
    })
  ]);
}

export async function downloadElementAsPng(container: HTMLElement, filename: string, backgroundColor: string) {
  const wrapper = createExportWrapper(container, backgroundColor);

  try {
    const canvas = await html2canvas(wrapper, exportOptions);
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  } finally {
    document.body.removeChild(wrapper);
  }
}
