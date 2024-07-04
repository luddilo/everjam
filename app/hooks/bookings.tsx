import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { Booking } from "../types/booking";

// create uuid v4
const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "bookings"),
      (snapshot) => {
        setLoading(false);
        setBookings(snapshot.docs.map((doc) => doc.data() as Booking));
      },
      (error) => console.log(error)
    );
    return () => {
      unsub();
    };
  }, []);

  const addBooking = async (booking: Omit<Booking, "id">) => {
    const key = uuidv4();
    await setDoc(doc(db, "bookings", key), {
      id: key,
      ...booking,
    });
  };

  const removeBooking = async (id: Booking["id"]) => {
    await deleteDoc(doc(db, "bookings", id));
  };

  return { bookings, addBooking, removeBooking, loading };
};
