'use client';

import { useEffect, useState } from 'react';
import FlexCarousel from './FlexCarousel';

const dogs = [
  { name: 'Zilla', key: 'zilla', crop: [110, 360, 480, 790] },
  { name: 'Zia', key: 'zia', crop: [585, 360, 470, 610] },
];

const ditherImage = (source) => {
  const canvas = document.createElement('canvas');
  canvas.width = source.width;
  canvas.height = source.height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(source, 0, 0);
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = image;
  const errors = new Float32Array(canvas.width * canvas.height);
  const spread = (x, y, error, weight) => {
    if (x < 0 || x >= canvas.width || y >= canvas.height) return;
    const pixel = y * canvas.width + x;
    if (data[pixel * 4 + 3] > 16) errors[pixel] += error * weight;
  };

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const pixel = y * canvas.width + x;
      const offset = pixel * 4;
      if (data[offset + 3] <= 16) continue;
      const luminance = Math.max(0, Math.min(255,
        data[offset] * 0.2126 + data[offset + 1] * 0.7152 + data[offset + 2] * 0.0722 + errors[pixel]
      ));
      const light = luminance >= 128;
      data[offset] = light ? 244 : 18;
      data[offset + 1] = light ? 241 : 15;
      data[offset + 2] = light ? 234 : 23;
      const error = luminance - (light ? 255 : 0);
      spread(x + 1, y, error, 7 / 16);
      spread(x - 1, y + 1, error, 3 / 16);
      spread(x, y + 1, error, 5 / 16);
      spread(x + 1, y + 1, error, 1 / 16);
    }
  }

  context.putImageData(image, 0, 0);
  return canvas.toDataURL('image/png');
};

export default function DogCards({ onHover }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) return;
      const next = dogs.map(({ name, key, crop }) => {
        const [x, y, width, height] = crop;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(image, x, y, width, height, 0, 0, width, height);
        return {
          key,
          title: name,
          alt: `${name}, an iridescent dog`,
          src: ditherImage(canvas),
          revealSrc: canvas.toDataURL('image/png'),
        };
      });
      setItems(next);
    };
    image.src = '/rainbow-dogs.png';
    return () => {
      active = false;
      image.onload = null;
    };
  }, []);

  if (!items) return null;

  return (
    <div className="carousel-stage">
      <FlexCarousel
        items={items}
        preset="liquid"
        intro="rise"
        cardHeight={0.5}
        fit="portrait"
        gap={12}
        squeeze={0.2}
        focusOnClick
        captions
        loop={false}
        onHover={(_, item) => onHover(item?.key ?? null)}
      />
    </div>
  );
}
