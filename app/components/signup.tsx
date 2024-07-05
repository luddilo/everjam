import moment from "moment";
import { useState } from "react";
import {
  formatDate,
  inputStyle,
  labelStyle,
  normalCase,
} from "../lib/formatting";
import { Booking } from "../types/types";
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
    <Modal
      onClose={onClose}
      title={`Sign up as ${normalCase(type)} at ${formatDate(
        moment(date),
        true
      )}`}
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
            placeholder="write 'always' here"
            onChange={(e) => setSpaceHolderCode(e.target.value)}
          />
        </div>
      )}
      <div style={{ display: "flex" }}>
        <label style={labelStyle}>Code</label>
        <input
          style={inputStyle}
          type="number"
          placeholder="for removing signup later"
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
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};
