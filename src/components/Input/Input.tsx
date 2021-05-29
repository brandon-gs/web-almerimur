import { useEffect, useState } from "react";
import "./Input.css";

export interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  className?: string;
  containerClassName?: string;
  error?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  error = "",
  className,
  containerClassName = "",
  ...props
}: InputProps) {
  // const [currentValue, setCurrentValue] = useState<string>(value);
  const [errorProp, setErrorProp] = useState<string>(error);
  // const errorClass = Boolean(errorProp) ? "input-error" : "";

  // useEffect(() => {
  //   setCurrentValue(value);
  // }, [value]);

  useEffect(() => {
    setErrorProp(error);
  }, [error]);

  return (
    <div className={`input_container ${containerClassName}`}>
      <input className={`input ${className}`} {...props} />
      {errorProp && <p className="input_error">{errorProp}</p>}
    </div>
  );
}

export default Input;
