export type Booking = {
  id: string;
  date: string;
  name: string;
  type: "spaceHolder" | "dancer";
  code: number;
};

export type Status = "open" | "proposed" | "happening" | "ongoing" | "disabled";
