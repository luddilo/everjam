"use client";
import moment from "moment";
import { useState } from "react";
import { useBookings } from "../hooks/bookings";
import { Booking } from "../types/booking";
import { EditModal } from "./edit";
import { SignupModal } from "./signup";
import { formatDate } from "../lib/formatting";

const generalSettings = {
  planningHorizonHours: 72,
};

export const Studio = ({ name }: { name: string }) => {
  const { bookings, addBooking, removeBooking, loading } = useBookings();

  const [selectedSlot, setSelectedSlot] =
    useState<Pick<Booking, "date" | "type">>();
  const [selectedBooking, setSelectedBooking] = useState<Booking>();

  const studioSettings = {
    open: 9,
    close: 23,
    maxDancers: 5,
    minimumWait: 1,
  };

  const getStatus = (hoursFromNow: number, bookings: Booking[]) => {
    if (hoursFromNow < studioSettings.minimumWait) return "disabled";
    if (bookings.filter((booking) => booking.type === "spaceHolder").length) {
      return "happening";
    }
    if (bookings.length) {
      return "proposed";
    }
    return "open";
  };

  const handleClick = (dateString: string, type: Booking["type"]) => {
    setSelectedBooking(undefined);
    setSelectedSlot({ date: dateString, type });
  };

  const handleSubmit = (props: Omit<Booking, "id">) => {
    addBooking(props);
    setSelectedSlot(undefined);
  };

  const handleRemove = (id: Booking["id"]) => {
    removeBooking(id);
    setSelectedBooking(undefined);
  };

  const getBookings = (slot: moment.Moment) => {
    return bookings.filter((booking) => {
      const bookingMoment = moment(booking.date);
      return (
        bookingMoment.day() == slot.day() && bookingMoment.hour() == slot.hour()
      );
    });
  };

  const getSessions = () => {
    const now = moment();
    now.set({ minute: 0 });
    const sessions: {
      hour: number;
      day: number;
      status: string;
      dateString: string;
      dateLabel: string;
      spaceHolder?: Booking;
      dancers: Booking[];
    }[] = [];

    for (
      let hoursFromNow = 0;
      hoursFromNow < generalSettings.planningHorizonHours;
      hoursFromNow++
    ) {
      const newDate = now.clone().add({ hours: hoursFromNow });
      if (
        newDate.hour() >= studioSettings.open &&
        newDate.hour() < studioSettings.close
      ) {
        const _bookings = getBookings(newDate);
        const status = getStatus(hoursFromNow, _bookings);
        sessions.push({
          dateString: newDate.toISOString(),
          hour: newDate.hour(),
          day: newDate.day(),
          dateLabel: formatDate(newDate),
          status,
          spaceHolder:
            status == "happening"
              ? _bookings.find((b) => b.type === "spaceHolder")
              : undefined,
          dancers: _bookings.filter((b) => b.type === "dancer"),
        });
      }
    }
    return sessions;
  };

  const cellStyle = {
    padding: "0px 10px",
  };

  return (
    <section>
      {selectedSlot && (
        <SignupModal
          {...selectedSlot}
          onSubmit={handleSubmit}
          onClose={() => setSelectedSlot(undefined)}
        />
      )}
      {selectedBooking && (
        <EditModal
          {...selectedBooking}
          onRemove={() => handleRemove(selectedBooking.id)}
          onClose={() => setSelectedBooking(undefined)}
        />
      )}
      <h1 className="title font-semibold text-2xl tracking-tighter">{name}</h1>
      {loading ? (
        <div>Loading..</div>
      ) : (
        <div className="flex justify-between items-center text-sm">
          <table>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Date/time</th>
                <th style={cellStyle}>Space holder</th>
                <th style={cellStyle}>
                  Dancers (max {studioSettings.maxDancers})
                </th>
              </tr>
            </thead>
            <tbody>
              {getSessions().map((session, index) => {
                return (
                  <tr key={index}>
                    <td style={cellStyle}>{session.status}</td>
                    <td style={cellStyle}>{session.dateLabel}</td>
                    <td style={cellStyle}>
                      {session.spaceHolder ? (
                        <button
                          style={{ color: "blue" }}
                          onClick={() => {
                            setSelectedBooking(session.spaceHolder);
                            setSelectedSlot(undefined);
                          }}
                        >
                          {session.spaceHolder.name}
                        </button>
                      ) : (
                        <button
                          key={session.dateString}
                          style={{ color: "blue" }}
                          onClick={() =>
                            handleClick(session.dateString, "spaceHolder")
                          }
                        >
                          Join as spaceholder
                        </button>
                      )}
                    </td>
                    <td style={cellStyle}>
                      {session.dancers.map((booking) => (
                        <button
                          style={{ marginRight: "10px", color: "blue" }}
                          key={booking.id}
                          onClick={() => setSelectedBooking(booking)}
                        >
                          {booking.name}
                        </button>
                      ))}
                      {session.status !== "disabled" && (
                        <button
                          onClick={() =>
                            handleClick(session.dateString, "dancer")
                          }
                          disabled={session.status === "disabled"}
                          style={{ color: "blue" }}
                        >
                          Join as dancer
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
