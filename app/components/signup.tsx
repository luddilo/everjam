import { useState } from "react";
import { Booking } from "../types/types";
import { Modal } from "./modal";
import { buttonStyle } from "../style";
import { formatDate, inputStyle, labelStyle, normalCase } from "../lib/formatting";
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
        <label style={labelStyle}>Name</label>
        <input
          style={inputStyle}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {type == "spaceHolder" && (
        <div style={{ display: "flex" }}>
          <label style={labelStyle}>Secret</label>
          <input
            style={inputStyle}
            placeholder="super secret"
            onChange={(e) => setSpaceHolderCode(e.target.value)}
          />
        </div>
      )}
      <div style={{ display: "flex" }}>
        <label style={labelStyle}>Code</label>
        <input
          style={inputStyle}
          type="number"
          placeholder="for removing booking later"
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div>
        <div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full"
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
