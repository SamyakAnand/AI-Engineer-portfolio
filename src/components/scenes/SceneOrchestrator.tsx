'use client';

import React from 'react';
import InitializationScene from './InitializationScene';
import CreationStudioScene from './CreationStudioScene';

export default function SceneOrchestrator() {
  return (
    <main>
      <InitializationScene />
      <CreationStudioScene />
    </main>
  );
}
