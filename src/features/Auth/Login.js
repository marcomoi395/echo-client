import {useEffect, useRef, useState} from "react";
import {useLoginMutation} from "./authApiSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setCredentials} from "./authSlice";


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRememberMe, setIsRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const errorRef = useRef();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        setErrorMessage('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({email, password, isRememberMe}).unwrap();
            dispatch(setCredentials({...userData}))
            setEmail('')
            setPassword('')
            navigate('/dashboard')
        } catch (e) {
            console.log(e)
            if (!e?.status) {
                setErrorMessage('No Sever Response')
            } else if (e.status === 400) {
                setErrorMessage(e?.data?.error);
            } else if (e.status === 401) {
                setErrorMessage(e?.data?.error);
            } else {
                setErrorMessage('Login Failed');
            }
        }
    }

    return (<>
            <h1>Login</h1>
            <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
            {isLoading ? (<h1>Loading...</h1>) : (<section className="login">
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input type="checkbox" name="isRememberMe" checked={isRememberMe}
                           onChange={() => setIsRememberMe(!isRememberMe)}/>
                    <button type="submit">Log in</button>
                </form>
            </section>)}
        </>

    )
}

export default Login;