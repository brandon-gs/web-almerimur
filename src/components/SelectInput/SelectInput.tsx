import { useState } from "react";
import "./SelectInput.css";

interface SelectInputProps {
  placeholder?: string;
  value?: string;
  items?: Array<string>;
  className?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function SelectInput({
  placeholder,
  value,
  items = [],
  className,
  onChange,
  disabled = false,
}: SelectInputProps) {
  const [showItems, setShowItems] = useState(false);

  const handleClickSelect = () => {
    setShowItems((show) => !show);
  };

  const handleClickItem = (item: string) => {
    setShowItems(false);
    onChange(item);
  };

  const showValue = Boolean(value);
  const upArrow = showItems ? "arrow_up" : "";

  return (
    <div className={"select " + className}>
      <div
        className="select_input"
        onClick={!disabled ? handleClickSelect : () => {}}
        style={{ cursor: !disabled ? "pointer" : "default" }}
      >
        {!showValue && <p className="select_placeholder">{placeholder}</p>}
        {showValue && <p>{value}</p>}
        {!disabled && <div className={"select_arrow " + upArrow} />}
      </div>
      {showItems && (
        <div className="select_items">
          {items.map((item, idx) => {
            const active = item === value ? "selected_item" : "";
            return (
              <div
                key={`select-${item}-${idx}`}
                className={`select_item ${active}`}
                onClick={() => handleClickItem(item)}
              >
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SelectInput;
