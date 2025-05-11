import { useState, useCallback } from 'react';

// Helper function to generate a random hex color
const generateRandomHex = () => {
  const letters = '0123456789ABCDEF';
  let hexColor = '#';
  for (let i = 0; i < 6; i++) {
    hexColor += letters[Math.floor(Math.random() * 16)];
  }
  return hexColor;
};

// Hook to generate a random hex color
export function useRandomHexColor() {
  const [color, setColor] = useState<string>(generateRandomHex());

  // Memoized version of the generate function
  const memoizedGenerateRandomHex = useCallback(() => {
    return generateRandomHex();
  }, []);

  // Function to refresh the color
  const refreshColor = useCallback(() => {
    setColor(memoizedGenerateRandomHex());
  }, [memoizedGenerateRandomHex]);

  return { color, refreshColor, generateRandomHex: memoizedGenerateRandomHex };
}
