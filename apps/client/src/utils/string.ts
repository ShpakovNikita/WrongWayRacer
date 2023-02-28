import { useWrongWayRacerStore } from '@/context';

export const nthFormat = (d: number) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const getMinutesAndSecondsTime = (seconds: number) => {
  const date = new Date(0);
  date.setMilliseconds(seconds * 1000); // specify value for SECONDS here
  const timeString = date.toISOString().slice(14, 19);

  return timeString;
};

export const formattedCounter = (count: number) => {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 0
  }).format(count);
};
