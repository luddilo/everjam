import { useState } from "react";
import { Booking } from "../types/booking";
import { Modal } from "./modal";

export const SignupModal = ({
  date,
  type,
  onSubmit,
  onClose,
}: {
  date: string;
  type: Booking["type"];
  onSubmit: (props: Pick<Booking, "date" | "name" | "type" | "code">) => void;
  onClose: () => void;
}) => {
  const [name, setName] = useState<string>();
  const [spaceHolderCode, setSpaceHolderCode] = useState<string>();
  const [code, setCode] = useState<string>();
  return (
    <Modal onClose={onClose} title={`Join as ${type}`}>
      <label>Name</label>
      <input placeholder="name" onChange={(e) => setName(e.target.value)} />
      {type == "spaceHolder" && (
        <>
          <label>Space holder password</label>
          <input
            type="text"
            placeholder="super secret"
            onChange={(e) => setSpaceHolderCode(e.target.value)}
          />
        </>
      )}
      <label>Code</label>
      <input
        type="number"
        placeholder="code"
        onChange={(e) => setCode(e.target.value)}
      />
      <div>
        <button
          disabled={
            !name?.length ||
            !code?.length ||
            (type == "spaceHolder" && spaceHolderCode !== "always")
          }
          onClick={() =>
            onSubmit({
              date,
              type,
              name: name as string,
              code: parseInt(code!),
            })
          }
        >
          Add
        </button>
      </div>
    </Modal>
  );
};
