export const daysLeft = (deadline) => {
  const deadlineDate = new Date(deadline * 1000); // Convert Unix timestamp to milliseconds
  const difference = deadlineDate.getTime() - Date.now();
  const remainingDays = Math.floor(difference / (1000 * 3600 * 24));

  if (remainingDays === 0) {
    const remainingHours = Math.floor(difference / (1000 * 3600));
    const remainingMinutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
    const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);
    return `${remainingHours}:${remainingMinutes}:${remainingSeconds}`;
  } else {
    return remainingDays.toFixed(0);
  }
};
export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
