export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isInThePast = (date) => {
  const today = new Date();

  return date > today;
};

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
};

export const getLocalStorage = () => {
  return localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : { columns: [], storage: [] };
};
