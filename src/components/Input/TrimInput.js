import { Children, cloneElement } from "react";

const TrimInput = (props) => {
  const { children, onChange = () => {}, ...reset } = props;
  const handleBlur = (e) => {
    if (typeof onChange === "function") {
      e.target.value = e.target.value.trim();
      onChange(e);
    }
  };
  const handleChange = (e) => {
    if (typeof onChange === "function") {
      onChange(e);
    }
  };
  return Children.map(children, (child) =>
    cloneElement(child, {
      ...reset,
      onBlur: handleBlur,
      onChange: handleChange,
    })
  );
};
export default TrimInput;