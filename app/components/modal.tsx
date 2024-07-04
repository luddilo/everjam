import { useEffect } from "react";

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
      className="text-black bg-white dark:text-white dark:bg-black border border-black dark:border-white"
      style={{
        position: "absolute",
        padding: "20px",
        margin: "auto",
        maxWidth: "90%",
      }}
    >
      <button
        style={{ position: "absolute", right: 0, top: 0 }}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2"
        onClick={onClose}
      >
        x
      </button>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};
