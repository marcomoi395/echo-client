import {apiSlice} from "../../app/api/apiSlice";

export const budgetTrackerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBudgetTracker: builder.query({
            query: ({page, pageSize, type, sort, timeFilter}) => ({
                url: '/budget-tracker',
                params:{
                    page: page,
                    pageSize: pageSize,
                    type: type,
                    sort: JSON.stringify(sort),
                    time: timeFilter
                }
            }),
            providesTags: ['BudgetTracker']
        }),
        addBudgetTracker: builder.mutation({
            query: ({description, parseAmount, parseTime, type}) => ({
                url: 'budget-tracker/add',
                method: 'POST',
                body: {
                    description,
                    amount: parseAmount,
                    date: parseTime,
                    type,
                },
            }),
            invalidatesTags: ['BudgetTracker']
        }),
        deleteBudgetTracker: builder.mutation({
            query: (idList) => ({
                url: 'budget-tracker/delete',
                method: 'DELETE',
                body: {
                    idList
                },
            }),
            invalidatesTags: ['BudgetTracker']
        }),
    })
})

export const {useGetBudgetTrackerQuery, useAddBudgetTrackerMutation, useDeleteBudgetTrackerMutation} = budgetTrackerApiSlice