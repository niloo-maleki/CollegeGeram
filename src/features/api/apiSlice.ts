import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const API_IMAGE = process.env.REACT_APP_IMAGE_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile","Posts","bookmark","comments","like","likes","userState"],
  endpoints: (builder) => ({}),
});
