'use client';

import { useState } from 'react';

import DitherVeil from '../components/DitherVeil';
import GhostCursor from '../components/GhostCursor';
import SplashCursor from '../components/SplashCursor';

export default function Home() {
  const [ditherReady, setDitherReady] = useState(false);
  const [hasPointer, setHasPointer] = useState(false);

  return (
    <main
      className={`page${hasPointer ? ' has-pointer' : ''}`}
      onPointerMove={() => setHasPointer(true)}
      onPointerLeave={() => setHasPointer(false)}
    >
      <h1 className="background-title" aria-label="Beatuiful Zilla and Zia">
        <span>Beatuiful</span>
        <span>Zilla and Zia</span>
      </h1>
      <div className={`dogs-stage${ditherReady ? ' is-ready' : ''}`}>
        <img
          className="dogs-original"
          src="/rainbow-dogs.png"
          alt="Two small dogs with iridescent metallic colors"
          width="1086"
          height="1448"
          fetchPriority="high"
        />
        <DitherVeil
          className="dogs-dither"
          src="/rainbow-dogs.png"
          fit="contain"
          pattern="floyd"
          pixelSize={2}
          inkColor="#120f17"
          paperColor="#f4f1ea"
          revealRadius={200}
          softness={0.6}
          linger={1}
          wander={false}
          clickBurst={false}
          onReady={() => setDitherReady(true)}
        />
      </div>
      <GhostCursor
        color="#B497CF"
        brightness={1}
        edgeIntensity={0}
        trailLength={50}
        inertia={0.5}
        grainIntensity={0.05}
        bloomStrength={0.1}
        bloomRadius={1.0}
        bloomThreshold={0.025}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
      />
      <SplashCursor />
    </main>
  );
}
