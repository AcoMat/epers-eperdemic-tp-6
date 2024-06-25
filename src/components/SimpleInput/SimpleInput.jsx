import { useTheme } from "@emotion/react";
import { forwardRef } from "react";

const SimpleInput = forwardRef(function SimpleInput(
  { children, onSearchPress, onChange, value, inputType, placeholder },
  ref
) {

    const theme = useTheme()
    const backgroundColor = theme.palette.background.onBackground
    const textColor = theme.palette.background.default

    const _onSendPressed = (event) => {
        event.preventDefault()
        onSearchPress(value)
    }

  return (
    <form style={{...inputContainerStyle, boxSizing: "border-box", backgroundColor: backgroundColor}} onSubmit={_onSendPressed} className="simple-input">
      <input
        ref={ref}
        type={inputType}
        onChange={onChange}
        name="inputValue"
        placeholder={placeholder}
        value={value}
        style={{...inputStyle, backgroundColor: backgroundColor, color: textColor, fontWeight: "bold"}}
      />
      {children}
    </form>
  );
});

const inputContainerStyle = {
    width: "100%",
    display: "flex",
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 8
}

const inputStyle = {
    flexGrow: 1,
    outline: "none",
    border: "none"
}

export default SimpleInput;
