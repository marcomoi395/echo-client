import React, {useEffect, useRef, useState} from "react";
import {useLoginMutation} from "../authApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {setCredentials} from "../authSlice";
import Input from "../../../components/Input/Input";
import {Alert, Checkbox, Col, Divider, message, notification, Radio, Row} from "antd";
import ButtonCustom from "../../../components/Button/Button";
import './Login.scss'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRememberMe, setIsRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const [notifiApi, notifiContextHolder] = notification.useNotification();

    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        setErrorMessage('')
    }, [email, password])

    const openNotification = (messageContent) => {
        notifiApi.info({
            message: messageContent, description: '', showProgress: true, pauseOnHover: true,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        if (!email || !password) {
            openNotification('Requires entering email and password');
            return;
        }

        try {
            const userData = await login({email, password, isRememberMe}).unwrap();
            dispatch(setCredentials({...userData}))
            setEmail('')
            setPassword('')
            navigate('/dashboard')
        } catch (e) {
            if (!e?.status) {
                setErrorMessage('No Sever Response')
                openNotification('No Server Response');
            } else if (e.status === 400 || e.status === 401) {
                setErrorMessage(e?.data?.error);
                openNotification(e?.data?.error);
                if (e?.data?.error === 'Incorrect password') {
                    setPassword("");
                    passwordRef?.current?.focus();
                } else if (e?.data?.error === 'User not found') {
                    setEmail("");
                    setPassword("");
                    emailRef?.current?.focus();
                }

            } else {
                setErrorMessage('Login Failed');
                openNotification('Login Failed');
            }
        }
    }

    return (<>

            {/*<p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>*/}
            {notifiContextHolder}
            <section className="login">
                <Row>

                    <Col xxl={{span: 6, offset: 9}}
                         xl={{span: 6, offset: 9}}
                         lg={{span: 8, offset: 8}}
                         md={{span: 10, offset: 7}}
                         sm={{span: 12, offset: 6}}
                         xs={{span: 14, offset: 5}}
                    >
                        <div className="login__logo">
                            MARCO
                        </div>
                        <div className="login__slogan">
                            see the star
                        </div>
                        <form onSubmit={handleSubmit} className={'login__form'}>
                            <Input
                                type={'email'}
                                value={email}
                                setValue={setEmail}
                                placeholder={"Email"}
                                name={'email'}
                                required={true}
                                ref={emailRef}
                            />
                            <Input
                                type={'password'}
                                value={password}
                                setValue={setPassword}
                                placeholder={"Password"}
                                name={'password'}
                                required={true}
                                ref={passwordRef}
                            />
                            <div className="login__form-checkbox">
                                <Checkbox
                                    // indeterminate={indeterminate}
                                    onChange={() => setIsRememberMe(!isRememberMe)}
                                    checked={isRememberMe}
                                >
                                    <span>Remember Me</span>
                                </Checkbox>
                            </div>
                            <ButtonCustom
                                title={'Login'}
                                handleButton={handleSubmit}
                                type={"button__login"}
                                disabled={isLoading}
                            />
                        </form>
                        <Divider/>
                        <div className="login__footer">
                            <div className="login__footer-link">
                                <Link to={'/auth/register'}>Register</Link>
                            </div>
                            <div className="login__footer-link">
                                <Link to={'/auth/register'}>Forget Password?</Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </>

    )
}

export default Login;