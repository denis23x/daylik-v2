import { useCallback } from 'react';

// Helper function to generate a random hex color
const generateRandomHexColor = () => {
  const letters = '0123456789ABCDEF';
  let hexColor = '#';
  for (let i = 0; i < 6; i++) {
    hexColor += letters[Math.floor(Math.random() * 16)];
  }
  return hexColor;
};

// Hook to generate a random hex color
export function useRandomHexColor() {
  const generateRandomHex = useCallback((): string => {
    return generateRandomHexColor();
  }, []);

  return { generateRandomHex };
}
