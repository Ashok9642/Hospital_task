import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const doctorApi = createApi({
  reducerPath: 'doctorApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
  }),

  tagTypes: ['Doctors'],

  endpoints: (builder) => ({
    // GET ALL DOCTORS
    getDoctors: builder.query({
      query: () => '/doctors',

      providesTags: ['Doctors'],
    }),

    // ADD DOCTOR
    addDoctor: builder.mutation({
      query: (doctor) => ({
        url: '/doctors',
        method: 'POST',
        body: doctor,
      }),

      invalidatesTags: ['Doctors'],
    }),

    // DELETE DOCTOR
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `/doctors/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Doctors'],
    }),
    getDoctorDashboard: builder.query({
      query: (doctorId) => `/doctors/dashboard?doctorId=${doctorId}`,
    }),
  }),
});

export const { useGetDoctorsQuery, useAddDoctorMutation, useDeleteDoctorMutation, useGetDoctorDashboardQuery } =
  doctorApi;
