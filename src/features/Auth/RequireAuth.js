import {useDispatch, useSelector} from "react-redux";
import {logOut, selectCurrentToken, setCredentials} from "./authSlice";
import {Navigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useFetchAccessTokenMutation} from "./refreshTokenSlice";
import Loading from "../../components/Loading";

const RequireAuth = ({children}) => {
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const [fetchAccessToken] = useFetchAccessTokenMutation();
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                try {
                    const result = await fetchAccessToken().unwrap();
                    dispatch(setCredentials(result));
                } catch {
                    dispatch(logOut());
                } finally {
                    setLoading(false);
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, [token, fetchAccessToken, dispatch]);

    if (loading) return <Loading/>

    if (!token) {
        return <Navigate to="/auth/login" state={{from: location}}/>;
    }

    return children;
};

export default RequireAuth;
