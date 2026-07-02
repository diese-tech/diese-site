import type { Metadata } from 'next';
import { PlaygroundClient } from '@/components/playground/playground-client';

export const metadata: Metadata = {
  title: 'Playground',
  description:
    'Drive a forklift around the Diese ops floor — an interactive 3D playground built with react-three-fiber and rapier physics.',
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
