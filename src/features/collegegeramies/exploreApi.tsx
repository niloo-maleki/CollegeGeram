import { apiSlice } from "features/api/apiSlice";
import { ICollegegramie, ICollegegramies, IRtkResponse } from "types/interface";

const exploreApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCollegegramies: builder.query<ICollegegramie[],number>({
      query: (page) => ({
        url: `collegegramies?page=${page}`,
      }),
      providesTags: ["userState"],
      transformResponse: (response: IRtkResponse<ICollegegramies>) => {
        return response.data.collegegramies
      },
    }),
  }),
});

export const { useGetAllCollegegramiesQuery } = exploreApi;
