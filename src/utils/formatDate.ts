export const formatDate = (date: string) => {
  const dateArray = new Date(date).toDateString().split(" ");
  return `${dateArray[1]} ${dateArray[2]}, ${dateArray[3]}`;
};
