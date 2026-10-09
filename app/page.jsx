'use client';

import { useState } from 'react';
import DitherVeil from '../components/DitherVeil';

const styles = [
  { id: 'floyd', label: 'Soft grain' },
  { id: 'bayer', label: 'Fine dots' },
  { id: 'lines', label: 'Engraved' },
  { id: 'original', label: 'Original' },
];

export default function Home() {
  const [style, setStyle] = useState('floyd');
  const isOriginal = style === 'original';

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Ree's Lover, back to top">
          <span className="wordmark-mark" aria-hidden="true">r.</span>
          <span>REE&apos;S LOVER</span>
        </a>
        <span className="header-note">AN INTERACTIVE KEEPSAKE <span aria-hidden="true">✳</span> 001</span>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-intro">
            <p className="eyebrow"><span className="eyebrow-line" /> A PORTRAIT IN PIXELS</p>
            <h1 id="hero-title">The little moments <em>stay.</em></h1>
            <p className="hero-copy">A quiet afternoon, two familiar faces, and a moment worth keeping close.</p>
          </div>

          <div className="artwork-wrap">
            <span className="side-note side-note-left" aria-hidden="true">01 / TWO LITTLE COMPANIONS</span>
            <div className="photo-frame">
              <div className="photo-surface">
                <img
                  className="photo-original"
                  src="/two-dogs.png"
                  alt="Two small cream-colored dogs on a gray floor, with a colorful toy nearby."
                  width="1086"
                  height="1448"
                  fetchPriority="high"
                />
                <DitherVeil
                  className={`photo-dither ${isOriginal ? 'is-hidden' : ''}`}
                  src="/two-dogs.png"
                  fit="contain"
                  pattern={isOriginal ? 'floyd' : style}
                  pixelSize={style === 'lines' ? 2.4 : 2}
                  inkColor="#1f2423"
                  paperColor="#e9e8df"
                  contrast={1.13}
                  brightness={0.04}
                  revealRadius={165}
                  softness={0.68}
                  linger={0.9}
                  rimColor="#d5a670"
                  rim={0.08}
                  wander={!isOriginal}
                  clickBurst={!isOriginal}
                />
                <span className="photo-corner photo-corner-top" aria-hidden="true">RL / 01</span>
                <span className="photo-corner photo-corner-bottom" aria-hidden="true">A MOMENT, HELD IN LIGHT</span>
              </div>
            </div>
            <span className="side-note side-note-right" aria-hidden="true">HOVER OR TAP TO REVEAL</span>
          </div>

          <div className="artwork-footer">
            <div className="artwork-caption">
              <span className="caption-index">FIG. 01</span>
              <span>Love looks a little like this.</span>
            </div>
            <p className="interaction-hint">Move across the image to uncover the moment.</p>
          </div>

          <div className="viewer-controls" role="group" aria-label="Image viewing style">
            <span className="controls-label">VIEW AS</span>
            <div className="style-options">
              {styles.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`style-button ${style === option.id ? 'is-active' : ''}`}
                  aria-pressed={style === option.id}
                  onClick={() => setStyle(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>REE&apos;S LOVER</span>
        <span>MADE TO REMEMBER THE SMALL THINGS.</span>
      </footer>
    </div>
  );
}
