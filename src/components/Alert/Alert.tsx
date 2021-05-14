import { VscChromeClose } from "react-icons/vsc";
import "./Alert.css";

export type TypeAlert = "danger" | "info" | "success";

export interface StateAlert {
  show: boolean;
  message: string;
  type: TypeAlert;
}

interface AlertProps {
  message?: string;
  type?: "danger" | "info" | "success";
  show?: boolean;
  onClose: () => void;
}

function Alert({
  show = false,
  message = "",
  type = "danger",
  onClose,
}: AlertProps) {
  const classType = `alert-${type}`;

  return show ? (
    <div className={`alert ${classType}`}>
      <p>{message}</p>
      <VscChromeClose onClick={onClose} className="alert_icon" />
    </div>
  ) : null;
}

export default Alert;
