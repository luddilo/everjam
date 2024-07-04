export const formatDate = (moment: moment.Moment) => {
  return moment.format("dddd HH:mm");
};

// Capitalise string
export const capitalise = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Make string normal case from camelCase
export const normalCase = (s: string) => {
  return s.replace(/([A-Z])/g, " $1").toLowerCase();
};
