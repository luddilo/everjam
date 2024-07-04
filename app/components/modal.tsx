import { useEffect } from "react";
import { buttonStyle } from "../style";

export const Modal = ({
  title,
  children,
  onClose,
}: {
  title: string;
  children: any;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        border: "1px black solid",
        backgroundColor: "white",
        padding: "20px",
      }}
    >
      <h3>{title}</h3>
      <div>{children}</div>

      <button style={buttonStyle} onClick={onClose}>
        Close
      </button>
    </div>
  );
};
