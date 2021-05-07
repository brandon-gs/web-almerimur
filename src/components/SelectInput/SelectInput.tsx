import { useState } from "react";
import "./SelectInput.css";

interface SelectInputProps {
  placeholder?: string;
  value?: string;
  items?: Array<string>;
  className?: string;
  onChange: (value: string) => void;
}

function SelectInput({
  placeholder,
  value,
  items = [],
  className,
  onChange,
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
      <div className="select_input" onClick={handleClickSelect}>
        {!showValue && <p className="select_placeholder">{placeholder}</p>}
        {showValue && <p>{value}</p>}
        <div className={"select_arrow " + upArrow} />
      </div>
      {showItems && (
        <div className="select_items">
          {items.map((item, idx) => (
            <div
              key={`select-${item}-${idx}`}
              className="select_item"
              onClick={() => handleClickItem(item)}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectInput;
