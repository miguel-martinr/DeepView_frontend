export const getFormattedTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
  const seconds = timeInSeconds - hours * 3600 - minutes * 60;

  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = Math.round(seconds).toString().padStart(2, '0');

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}