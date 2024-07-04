"use client";
import moment from "moment";
import { useState } from "react";
import { useBookings } from "../hooks/bookings";
import { Booking, Status } from "../types/types";
import { EditModal } from "./edit";
import { SignupModal } from "./signup";
import { capitalise, formatDate, getBackgroundColor } from "../lib/formatting";
import { useIsMobile } from "../hooks/useMediaQuery";

const generalSettings = {
  planningHorizonDays: 4,
};

export const Studio = ({ name }: { name: string }) => {
  const { bookings, addBooking, removeBooking, loading } = useBookings();

  const [selectedSlot, setSelectedSlot] =
    useState<Pick<Booking, "date" | "type">>();
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const isMobile = useIsMobile();

  const studioSettings = {
    open: 9,
    close: 23,
    maxDancers: 5,
    minimumWait: 1,
  };

  const getStatus = (hoursFromNow: number, bookings: Booking[]): Status => {
    if (hoursFromNow < studioSettings.minimumWait) {
      if (bookings.filter((booking) => booking.type === "spaceHolder").length)
        return "ongoing";
      return "disabled";
    }
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
    const end = now
      .clone()
      .add({ days: generalSettings.planningHorizonDays })
      .set({ hour: studioSettings.close });
    const sessions: {
      hour: number;
      day: number;
      status: Status;
      dateString: string;
      dateLabel: string;
      spaceHolder?: Booking;
      dancers: Booking[];
    }[] = [];

    let newDate = now.clone();
    console.log(end.diff(newDate.clone(), "hours"));

    while (end.diff(newDate.clone(), "hours") > 0) {
      newDate = newDate.add({ hours: 1 });

      if (
        newDate.hour() >= studioSettings.open &&
        newDate.hour() < studioSettings.close
      ) {
        const _bookings = getBookings(newDate);
        const status = getStatus(newDate.diff(now, "hours"), _bookings);

        if (status == "disabled") {
          continue;
        }
        sessions.push({
          dateString: newDate.toISOString(),
          hour: newDate.hour(),
          day: newDate.day(),
          dateLabel: formatDate(newDate, true),
          status,
          spaceHolder: ["happening", "ongoing"].includes(status)
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
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {capitalise(name)}
      </h1>
      {loading ? (
        <div>Loading..</div>
      ) : (
        <div className="flex justify-between items-center text-sm">
          <table style={{ maxWidth: "100%" }}>
            <thead>
              <tr style={{ textAlign: "left" }}>
                <th style={cellStyle}></th>
                <th style={cellStyle}>Date/time</th>
                <th style={cellStyle}>
                  Space-
                  {isMobile && <br />}
                  holder
                </th>
                <th style={cellStyle}>
                  Dancers
                  {isMobile && <br />} (max {studioSettings.maxDancers})
                </th>
              </tr>
            </thead>
            <tbody>
              {getSessions().map((session, index) => {
                return (
                  <tr key={index}>
                    <td
                      style={{
                        ...cellStyle,
                        backgroundColor: getBackgroundColor(session.status),
                      }}
                    >
                      {" "}
                    </td>
                    <td style={cellStyle}>{session.dateLabel}</td>
                    <td style={cellStyle}>
                      {session.spaceHolder ? (
                        <button
                          style={{
                            color:
                              session.status !== "ongoing" ? "blue" : "black",
                          }}
                          disabled={session.status == "ongoing"}
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
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-0 px-1 rounded-full"
                          onClick={() =>
                            handleClick(session.dateString, "spaceHolder")
                          }
                        >
                          Join
                        </button>
                      )}
                    </td>
                    <td style={cellStyle}>
                      {!["disabled", "ongoing"].includes(session.status) &&
                        session.dancers.length < studioSettings.maxDancers && (
                          <button
                            onClick={() =>
                              handleClick(session.dateString, "dancer")
                            }
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-0 px-1 rounded-full"
                            style={{
                              marginRight: "10px",
                            }}
                          >
                            Join
                          </button>
                        )}
                      {session.dancers.map((booking) => (
                        <button
                          style={{ marginRight: "5px", color: "blue" }}
                          key={booking.id}
                          onClick={() => setSelectedBooking(booking)}
                        >
                          {booking.name}
                        </button>
                      ))}
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
