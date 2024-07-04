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
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold my-2 py-1 px-2 rounded-full"
          disabled={`${code}`.trim() !== inputtedCode?.trim()}
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </Modal>
  );
};
