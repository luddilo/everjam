import { useState } from "react";
import { Booking } from "../types/types";
import { Modal } from "./modal";
import { buttonStyle } from "../style";
import { formatDate, normalCase } from "../lib/formatting";
import moment from "moment";

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
    <Modal
      onClose={onClose}
      title={`Join as ${normalCase(type)} at ${formatDate(moment(date), true)}`}
    >
      <div style={{ display: "flex" }}>
        <label style={{ flexGrow: 1 }}>Name</label>
        <input
          style={{ flexGrow: 1 }}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {type == "spaceHolder" && (
        <div style={{ display: "flex" }}>
          <label style={{ flexGrow: 1 }}>Secret</label>
          <input
            style={{ flexGrow: 1 }}
            type="text"
            placeholder="super secret"
            onChange={(e) => setSpaceHolderCode(e.target.value)}
          />
        </div>
      )}
      <div style={{ display: "flex" }}>
        <label style={{ flexGrow: 1 }}>Code</label>
        <input
          style={{ flexGrow: 1 }}
          type="number"
          placeholder="code to remove later"
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div>
        <div>
          <button
            style={buttonStyle}
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
      </div>
    </Modal>
  );
};
