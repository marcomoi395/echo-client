import "./Input.scss"
import {forwardRef} from "react";

const Input = forwardRef(({placeholder, value, setValue, type, required}, ref) => {
    return(
        <input
            className={"input"}
            type={type || 'text'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            required={required}
            ref={ref}
        />
    )
})

export default Input