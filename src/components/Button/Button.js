import "./Button.scss"
import {CloseOutlined, LoadingOutlined} from "@ant-design/icons";
import {Spin} from "antd";

const Button = ({title, type, handleButton, count, disabled}) => {
    return (
        <>
            <button className={type} onClick={handleButton} disabled={disabled}>
                {disabled ? (
                    <Spin size="small"/>
                ) : (
                    <>
                        {title} {count ? <span>({count})</span> : null}
                    </>
                )}
            </button>
        </>
    )
}

export default Button;