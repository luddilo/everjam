import { Status } from "../types/types";

export const formatDate = (moment: moment.Moment, long = false) => {
  if (long) return moment.format("dddd HH:mm");
  return moment.format("dd HH:mm");
};

// Capitalise string
export const capitalise = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Make string normal case from camelCase
export const normalCase = (s: string) => {
  return s.replace(/([A-Z])/g, " $1").toLowerCase();
};

export const getBackgroundColor = (status: Status) => {
  switch (status) {
    case "open":
      return "white";
    case "proposed":
      return "yellow";
    case "happening":
      return "green";
    case "disabled":
      return "grey";
    case "ongoing":
      return "green";
  }
};
