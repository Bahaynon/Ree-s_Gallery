'use client';

import { useState } from 'react';

import DogCards from '../components/DogCards';
import GhostCursor from '../components/GhostCursor';
import SplashCursor from '../components/SplashCursor';

export default function Home() {
  const [hoveredDog, setHoveredDog] = useState(null);

  return (
    <main className={`page${hoveredDog ? ' is-over-dog' : ''}`}>
      <h1 className="background-title" aria-label="Zilla Zia">
        <span className={`title-word${hoveredDog === 'zilla' ? ' is-visible' : ''}`}>Zilla</span>
        <span className={`title-word${hoveredDog === 'zia' ? ' is-visible' : ''}`}>Zia</span>
      </h1>
      <DogCards onHover={setHoveredDog} />
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
