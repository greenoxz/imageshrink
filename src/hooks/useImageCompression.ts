import { useState, useCallback } from 'react';

export interface CompressionOptions {
  quality: number; // 0-100
  maxWidth: number;
  maxHeight: number;
  outputFormat: 'image/jpeg' | 'image/webp' | 'image/png';
}

export interface ImageFile {
  id: string;
  file: File;
  originalSize: number;
  originalUrl: string;
  compressedBlob: Blob | null;
  compressedSize: number;
  compressedUrl: string | null;
  width: number;
  height: number;
  compressedWidth: number;
  compressedHeight: number;
  status: 'pending' | 'compressing' | 'done' | 'error';
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function compressImage(
  file: File,
  options: CompressionOptions
): Promise<{ blob: Blob; width: number; height: number }> {
  const url = URL.createObjectURL(file);
  const img = await loadImage(url);
  URL.revokeObjectURL(url);

  let { width, height } = img;
  const { maxWidth, maxHeight, quality, outputFormat } = options;

  // Calculate new dimensions maintaining aspect ratio
  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, width, height);

  const qualityValue = quality / 100;

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Failed to compress image'));
      },
      outputFormat,
      qualityValue
    );
  });

  return { blob, width, height };
}

export function useImageCompression() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [options, setOptions] = useState<CompressionOptions>({
    quality: 80,
    maxWidth: 4096,
    maxHeight: 4096,
    outputFormat: 'image/webp',
  });

  const addFiles = useCallback((files: File[]) => {
    const imageFiles = files.filter((f) => f.type.startsWith('image/'));
    const newImages: ImageFile[] = imageFiles.map((file) => ({
      id: generateId(),
      file,
      originalSize: file.size,
      originalUrl: URL.createObjectURL(file),
      compressedBlob: null,
      compressedSize: 0,
      compressedUrl: null,
      width: 0,
      height: 0,
      compressedWidth: 0,
      compressedHeight: 0,
      status: 'pending' as const,
    }));

    setImages((prev) => [...prev, ...newImages]);

    // Load original dimensions
    newImages.forEach(async (img) => {
      try {
        const image = await loadImage(img.originalUrl);
        setImages((prev) =>
          prev.map((p) =>
            p.id === img.id
              ? { ...p, width: image.width, height: image.height }
              : p
          )
        );
      } catch {
        // ignore
      }
    });
  }, []);

  const compressAll = useCallback(async () => {
    setImages((prev) =>
      prev.map((img) => ({ ...img, status: 'compressing' as const }))
    );

    for (const img of images) {
      try {
        const result = await compressImage(img.file, options);
        const compressedUrl = URL.createObjectURL(result.blob);

        setImages((prev) =>
          prev.map((p) =>
            p.id === img.id
              ? {
                  ...p,
                  compressedBlob: result.blob,
                  compressedSize: result.blob.size,
                  compressedUrl,
                  compressedWidth: result.width,
                  compressedHeight: result.height,
                  status: 'done' as const,
                }
              : p
          )
        );
      } catch {
        setImages((prev) =>
          prev.map((p) =>
            p.id === img.id ? { ...p, status: 'error' as const } : p
          )
        );
      }
    }
  }, [images, options]);

  const compressSingle = useCallback(
    async (id: string) => {
      const img = images.find((i) => i.id === id);
      if (!img) return;

      setImages((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: 'compressing' as const } : p
        )
      );

      try {
        const result = await compressImage(img.file, options);
        const compressedUrl = URL.createObjectURL(result.blob);

        setImages((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  compressedBlob: result.blob,
                  compressedSize: result.blob.size,
                  compressedUrl,
                  compressedWidth: result.width,
                  compressedHeight: result.height,
                  status: 'done' as const,
                }
              : p
          )
        );
      } catch {
        setImages((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, status: 'error' as const } : p
          )
        );
      }
    },
    [images, options]
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) {
        URL.revokeObjectURL(img.originalUrl);
        if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const clearAll = useCallback(() => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.originalUrl);
      if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
    });
    setImages([]);
  }, [images]);

  const downloadImage = useCallback(
    (id: string) => {
      const img = images.find((i) => i.id === id);
      if (!img || !img.compressedUrl) return;

      const ext = options.outputFormat.split('/')[1];
      const name = img.file.name.replace(/\.[^.]+$/, '') + `_compressed.${ext}`;

      const a = document.createElement('a');
      a.href = img.compressedUrl;
      a.download = name;
      a.click();
    },
    [images, options.outputFormat]
  );

  const downloadAll = useCallback(() => {
    images.forEach((img) => {
      if (img.status === 'done' && img.compressedUrl) {
        downloadImage(img.id);
      }
    });
  }, [images, downloadImage]);

  return {
    images,
    options,
    setOptions,
    addFiles,
    compressAll,
    compressSingle,
    removeImage,
    clearAll,
    downloadImage,
    downloadAll,
  };
}
