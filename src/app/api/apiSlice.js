import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {setCredentials, logOut} from "../../features/Auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500' || process.env.REACT_APP_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')

        const refreshToken = await baseQuery('/auth/refresh', api, extraOptions)
        console.log(refreshToken)

        if(refreshToken?.data){
            const email = api.getState().auth.email

            api.dispatch(setCredentials({...refreshToken.data, email}))

            let result = await baseQuery(args, api, extraOptions)
        }
        else{
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})