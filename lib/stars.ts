// Fixed star positions - module-level so server and client produce identical CSS
const STARS_SM_VALUES = [
  '2.37vw 7.80vh 0 0 rgba(255,255,255,0.7)',
  '8.21vw 2.30vh 0 0 rgba(255,255,255,0.45)',
  '14.05vw 8.90vh 0 0 rgba(255,255,255,0.8)',
  '21.68vw 13.40vh 0 0 rgba(255,255,255,0.5)',
  '27.53vw 5.60vh 0 0 rgba(255,255,255,0.65)',
  '33.37vw 16.70vh 0 0 rgba(255,255,255,0.4)',
  '39.21vw 3.40vh 0 0 rgba(255,255,255,0.75)',
  '45.05vw 14.50vh 0 0 rgba(255,255,255,0.55)',
  '50.89vw 7.80vh 0 0 rgba(255,255,255,0.8)',
  '56.74vw 2.30vh 0 0 rgba(255,255,255,0.45)',
  '62.58vw 16.70vh 0 0 rgba(255,255,255,0.6)',
  '68.42vw 8.90vh 0 0 rgba(255,255,255,0.8)',
  '74.26vw 3.40vh 0 0 rgba(255,255,255,0.5)',
  '80.11vw 14.50vh 0 0 rgba(255,255,255,0.7)',
  '85.95vw 7.80vh 0 0 rgba(255,255,255,0.45)',
  '91.79vw 5.60vh 0 0 rgba(255,255,255,0.8)',
  '4.68vw 23.40vh 0 0 rgba(255,255,255,0.6)',
  '10.53vw 31.20vh 0 0 rgba(255,255,255,0.45)',
  '16.37vw 24.50vh 0 0 rgba(255,255,255,0.75)',
  '25.16vw 28.90vh 0 0 rgba(255,255,255,0.5)',
  '31.00vw 33.40vh 0 0 rgba(255,255,255,0.8)',
  '36.84vw 25.60vh 0 0 rgba(255,255,255,0.45)',
  '42.68vw 28.90vh 0 0 rgba(255,255,255,0.65)',
  '48.53vw 31.20vh 0 0 rgba(255,255,255,0.75)',
  '54.37vw 24.50vh 0 0 rgba(255,255,255,0.5)',
  '60.21vw 33.40vh 0 0 rgba(255,255,255,0.8)',
  '66.05vw 27.80vh 0 0 rgba(255,255,255,0.45)',
  '71.89vw 28.90vh 0 0 rgba(255,255,255,0.65)',
  '77.74vw 31.20vh 0 0 rgba(255,255,255,0.7)',
  '83.58vw 25.60vh 0 0 rgba(255,255,255,0.5)',
  '89.42vw 28.90vh 0 0 rgba(255,255,255,0.8)',
  '95.26vw 23.40vh 0 0 rgba(255,255,255,0.45)',
  '7.05vw 44.50vh 0 0 rgba(255,255,255,0.6)',
  '12.89vw 47.80vh 0 0 rgba(255,255,255,0.7)',
  '18.74vw 42.30vh 0 0 rgba(255,255,255,0.8)',
  '24.58vw 48.90vh 0 0 rgba(255,255,255,0.5)',
  '30.42vw 41.20vh 0 0 rgba(255,255,255,0.45)',
  '36.26vw 45.60vh 0 0 rgba(255,255,255,0.7)',
  '42.11vw 42.30vh 0 0 rgba(255,255,255,0.65)',
  '47.95vw 48.90vh 0 0 rgba(255,255,255,0.8)',
  '53.79vw 41.20vh 0 0 rgba(255,255,255,0.5)',
  '59.63vw 45.60vh 0 0 rgba(255,255,255,0.45)',
  '65.47vw 42.30vh 0 0 rgba(255,255,255,0.7)',
  '71.32vw 48.90vh 0 0 rgba(255,255,255,0.6)',
  '77.16vw 41.20vh 0 0 rgba(255,255,255,0.8)',
  '83.00vw 45.60vh 0 0 rgba(255,255,255,0.5)',
  '88.84vw 42.30vh 0 0 rgba(255,255,255,0.45)',
  '94.68vw 48.90vh 0 0 rgba(255,255,255,0.7)',
  '3.53vw 56.70vh 0 0 rgba(255,255,255,0.6)',
  '9.37vw 58.90vh 0 0 rgba(255,255,255,0.45)',
  '15.21vw 61.20vh 0 0 rgba(255,255,255,0.8)',
  '21.05vw 57.80vh 0 0 rgba(255,255,255,0.55)',
  '26.89vw 63.40vh 0 0 rgba(255,255,255,0.7)',
  '32.74vw 58.90vh 0 0 rgba(255,255,255,0.65)',
  '38.58vw 61.20vh 0 0 rgba(255,255,255,0.45)',
  '44.42vw 57.80vh 0 0 rgba(255,255,255,0.8)',
  '50.26vw 63.40vh 0 0 rgba(255,255,255,0.55)',
  '56.11vw 58.90vh 0 0 rgba(255,255,255,0.7)',
  '61.95vw 61.20vh 0 0 rgba(255,255,255,0.65)',
  '67.79vw 57.80vh 0 0 rgba(255,255,255,0.45)',
  '18.42vw 75.00vh 0 0 rgba(255,255,255,0.8)',
  '41.05vw 82.00vh 0 0 rgba(255,255,255,0.55)',
  '57.89vw 75.60vh 0 0 rgba(255,255,255,0.7)',
  '76.32vw 83.00vh 0 0 rgba(255,255,255,0.45)',
  '11.58vw 90.00vh 0 0 rgba(255,255,255,0.65)',
  '34.74vw 94.00vh 0 0 rgba(255,255,255,0.8)',
  '52.11vw 89.00vh 0 0 rgba(255,255,255,0.55)',
  '69.47vw 96.00vh 0 0 rgba(255,255,255,0.7)',
  '4.11vw 34.50vh 0 0 rgba(255,255,255,0.5)',
  '82.11vw 39.00vh 0 0 rgba(255,255,255,0.65)',
  '46.84vw 70.00vh 0 0 rgba(255,255,255,0.45)',
  '89.47vw 65.00vh 0 0 rgba(255,255,255,0.8)',
  '22.63vw 85.00vh 0 0 rgba(255,255,255,0.55)',
  '64.74vw 81.00vh 0 0 rgba(255,255,255,0.7)',
  '29.47vw 19.00vh 0 0 rgba(255,255,255,0.5)',
  '72.63vw 52.00vh 0 0 rgba(255,255,255,0.6)',
  '98.42vw 14.00vh 0 0 rgba(255,255,255,0.7)',
  '1.58vw 68.00vh 0 0 rgba(255,255,255,0.45)',
  '55.26vw 32.00vh 0 0 rgba(255,255,255,0.6)',
  '38.95vw 86.00vh 0 0 rgba(255,255,255,0.5)',
  '93.68vw 77.00vh 0 0 rgba(255,255,255,0.7)',
  '5.79vw 49.00vh 0 0 rgba(255,255,255,0.45)',
]

const STARS_LG_VALUES = [
  '16.84vw 14.50vh 0 1px rgba(255,255,255,0.95)',
  '45.79vw 6.70vh 0 1px rgba(255,255,255,0.85)',
  '76.32vw 23.40vh 0 1px rgba(255,255,255,0.95)',
  '35.68vw 51.20vh 0 1px rgba(255,255,255,0.8)',
  '58.95vw 44.50vh 0 1px rgba(255,255,255,0.95)',
  '12.11vw 72.00vh 0 1px rgba(255,255,255,0.85)',
  '86.84vw 38.00vh 0 1px rgba(255,255,255,0.9)',
  '52.11vw 19.00vh 0 1px rgba(255,255,255,0.8)',
  '25.26vw 6.00vh 0 1px rgba(255,255,255,0.9)',
  '68.42vw 68.00vh 0 1px rgba(255,255,255,0.85)',
]

export const STARS_SM = STARS_SM_VALUES.join(', ')
export const STARS_LG = STARS_LG_VALUES.join(', ')

export const STAR_CSS = `
  .sp-stars-sm { will-change: transform; transition: transform 0.18s ease-out; }
  .sp-stars-sm::before {
    content: ''; position: fixed; top: 0; left: 0;
    width: 1px; height: 1px; border-radius: 50%;
    box-shadow: ${STARS_SM}; pointer-events: none;
  }

  .sp-stars-lg { will-change: transform; transition: transform 0.12s ease-out; }
  .sp-stars-lg::after {
    content: ''; position: fixed; top: 0; left: 0;
    width: 2px; height: 2px; border-radius: 50%;
    box-shadow: ${STARS_LG};
    animation: sp-twinkle 5s ease-in-out infinite; pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .sp-stars-sm, .sp-stars-lg { transition: none; }
    .sp-stars-lg::after { animation: none; }
  }
`
