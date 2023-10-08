import { apiSlice } from "features/api/apiSlice";
import { USER_API } from "features/user/userApi";
import { IUserId, IRtkResponse, IFraindsList } from "types/interface";

const followApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<IRtkResponse<any>, IUserId>({
      query: (data) => ({
        url: `${USER_API}/follow`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userState"],
    }),

    unFollowUser: builder.mutation<IRtkResponse<any>, IUserId>({
      query: (data) => ({
        url: `${USER_API}/unfollow`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["userState"],
    }),

    denyFollowUser: builder.mutation<IRtkResponse<any>, IUserId>({
      query: (data) => ({
        url: `${USER_API}/deny`,
        method: "DELETE",
        body: data,
      }),
    }),

    acceptFollowUser: builder.mutation<IRtkResponse<any>, IUserId>({
      query: (data) => ({
        url: `${USER_API}/accept`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["userState"],
    }),
    getAllFollowings: builder.query<IFraindsList[], void>({
      query: () => ({
        url: `${USER_API}/followings`,
      }),
      transformResponse: (response: IRtkResponse<IFraindsList[]>) => {
        return response.data;
      },
      providesTags: ["userState"],
    }),

    getAllFollowers: builder.query<IFraindsList[], void>({
      query: () => ({
        url: `${USER_API}/followers`,
      }),
      transformResponse: (response: IRtkResponse<IFraindsList[]>) => {
        return response.data;
      },
      providesTags: ["userState"],
    }),
    getAllCloseFrainds: builder.query<IFraindsList[], void>({
      query: () => ({
        url: `closeFriends`,
      }),
      transformResponse: (response: IRtkResponse<IFraindsList[]>) => {
        return response.data;
      },
      providesTags: ["userState"],
    }),
  }),
});

export const {
  useFollowUserMutation,
  useDenyFollowUserMutation,
  useUnFollowUserMutation,
  useGetAllCloseFraindsQuery,
  useGetAllFollowersQuery,
  useAcceptFollowUserMutation,
  useGetAllFollowingsQuery,
} = followApi;
