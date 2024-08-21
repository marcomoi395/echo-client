import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3500' || process.env.REACT_APP_API_BASE_URL,
    credentials: 'include', // Thêm dòng này để gửi cookie cùng với yêu cầu
});

const refreshTokenSlice = createApi({
    reducerPath: 'refreshTokenSlice',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        fetchAccessToken: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            }),
        }),
    }),
});

export const {useFetchAccessTokenMutation} = refreshTokenSlice;
export default refreshTokenSlice;
