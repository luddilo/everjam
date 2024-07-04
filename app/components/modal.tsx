export const Modal = ({
  title,
  children,
  onClose,
}: {
  title: string;
  children: any;
  onClose: () => void;
}) => {
  return (
    <div
      style={{ position: "absolute", backgroundColor: "gray", padding: "20px" }}
    >
      <h3>{title}</h3>
      <div>{children}</div>

      <button onClick={onClose}>Close</button>
    </div>
  );
};
