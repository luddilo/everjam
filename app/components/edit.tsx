import { useState } from "react";
import { Modal } from "./modal";

export const EditModal = ({
  code,
  name,
  onRemove,
  onClose,
}: {
  code: number;
  name: string;
  onRemove: () => void;
  onClose: () => void;
}) => {
  const [inputtedCode, setInputtedCode] = useState<string>();
  console.log(code, inputtedCode, `${code}` == inputtedCode);

  return (
    <Modal onClose={onClose} title={`Remove ${name}`}>
      <label>Code</label>
      <input
        type="number"
        placeholder="code"
        onChange={(e) => setInputtedCode(e.target.value)}
      />
      <div>
        <button
          disabled={`${code}`.trim() !== inputtedCode?.trim()}
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </Modal>
  );
};
