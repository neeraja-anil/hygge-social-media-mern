import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hygge-inhy.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token ? getState().auth.token : null; //the token is stored in the "auth" state slice
      if (!headers.has("Authorization") && token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post", "User", "Messages", "Conversations", "Notification"],
  endpoints: (builder) => ({}),
});
