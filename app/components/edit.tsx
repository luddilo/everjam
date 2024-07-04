import { useState } from "react";
import { Modal } from "./modal";
import { buttonStyle } from "../style";
import { formatDate, inputStyle, labelStyle } from "../lib/formatting";
import moment from "moment";

export const EditModal = ({
  code,
  name,
  date,
  onRemove,
  onClose,
}: {
  code: number;
  name: string;
  date: string;
  onRemove: () => void;
  onClose: () => void;
}) => {
  const [inputtedCode, setInputtedCode] = useState<string>();

  return (
    <Modal
      onClose={onClose}
      title={`Remove ${name} at ${formatDate(moment(date), true)}`}
    >
      <div>
        <label style={labelStyle}>Code</label>
        <input
          style={inputStyle}
          type="number"
          placeholder="code"
          onChange={(e) => setInputtedCode(e.target.value)}
        />
      </div>
      <div>
        <button
          style={buttonStyle}
          disabled={`${code}`.trim() !== inputtedCode?.trim()}
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </Modal>
  );
};
