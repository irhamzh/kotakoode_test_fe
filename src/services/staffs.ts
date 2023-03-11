import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { StaffUpdateRequest, StaffBrowseRequest, StaffBrowseResponse, StaffDetailResponse } from '@/types/staff'
import { apiBaseQuery, } from '@/utils/api'
import { AttendanceBaseResponse } from '@/types/attendance'

const api = createApi({
  reducerPath: 'staff',
  baseQuery: apiBaseQuery,
  tagTypes: ['Staff'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    getListStaffs: builder.query<StaffBrowseResponse, StaffBrowseRequest>({
      query: (params) => ({
        params,
        url: '/staffs',
        providesTags: ['Staff'],
      }),
    }),
    getDetailStaff: builder.query<StaffDetailResponse, string>({
      query: (id) => ({
        url: `/staffs/${id}`,
      }),
      providesTags: ['Staff'],
    }),
    
    // api features implementation
    getSelfUser: builder.query({
      query: () => ({
        url: "/auth/selfUser",
      }),
    }),
    putUpdateUser: builder.mutation<StaffDetailResponse, StaffUpdateRequest>({
      query: (data) => ({
        url: `/staffs/${data.data.attributes.id}`,
        method: 'PUT',
        body: data
      }),
    }),
    getListAttendances: builder.query<AttendanceBaseResponse, string>({
      query: (id) => ({
        url: `/staffs/${id}/attendances`,
      }),
    }),
    postNewAttendance: builder.mutation<AttendanceBaseResponse, String>({
      query: (id) => ({
        url: `/staffs/${id}/attendance/clock-in`,
        method: 'POST',
      }),
    }),
    putUpdateAttendance: builder.mutation<AttendanceBaseResponse, String>({
      query: (id) => ({
        url: `/staffs/${id}/attendance/clock-out`,
        method: 'PUT',
      }),
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

// Export hooks for usage in functional components
export const { 
  useGetListStaffsQuery,
  useGetDetailStaffQuery,
  useGetListAttendancesQuery,
  useGetSelfUserQuery,
  usePutUpdateUserMutation,
  usePostNewAttendanceMutation,
  usePutUpdateAttendanceMutation,
  util: exampleUtil
} = api

export default api
