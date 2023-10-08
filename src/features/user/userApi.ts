import { apiSlice } from "features/api/apiSlice";
import { FormDataForLogin } from "pages/login/pages/Login";
import { FormDataForRegister } from "pages/login/pages/Registration";
import {
  IAnotherUser,
  IBlackList,
  IBlockUserName,
  IResetpassword,
  IRtkResponse,
  ITokenType,
  IUserId,
  IUserforLoginResponse,
} from "types/interface";

export const USER_API = "user";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IRtkResponse<ITokenType>, FormDataForLogin>({
      query: (data: FormDataForLogin) => ({
        url: `${USER_API}/login`,
        method: "POST",
        body: data,
      }),
    }),

    register: builder.mutation<
      IRtkResponse<ITokenType>,
      Omit<FormDataForRegister, "repeat_password">
    >({
      query: (body: FormDataForRegister) => ({
        url: `${USER_API}/signup`,
        method: "POST",
        body: body,
      }),
    }),

    postForgetPassword: builder.mutation<any, string>({
      query: (username) => ({
        url: `${USER_API}/forget-password?username=${username}`,
        method: "POST",
      }),
    }),

    getTokenResetPassword: builder.query<ITokenType, string>({
      query: (token) => ({
        url: `${USER_API}/reset-password/${token}`,
      }),
      transformResponse: (response: IRtkResponse<ITokenType>) => {
        return response.data;
      },
    }),

    postResetPassword: builder.mutation<any, IResetpassword>({
      query: (data: IResetpassword) => ({
        url: `${USER_API}/reset-password`,
        method: "POST",
        body: data,
      }),
    }),

    getUser: builder.query<IUserforLoginResponse, void>({
      query: () => ({
        url: `${USER_API}`,
      }),
      providesTags: ["Profile"],
      transformResponse: (response: IRtkResponse<IUserforLoginResponse>) => {
        return response.data;
      },
    }),

    postEdithUser: builder.mutation<
      IRtkResponse<IUserforLoginResponse>,
      FormData
    >({
      query: (data) => ({
        url: `${USER_API}`,
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Profile"],
    }),

    getAnotherUser: builder.query<IAnotherUser, string>({
      query: (username) => ({
        url: `${USER_API}/another/${username}`,
      }),
      transformResponse: (response: IRtkResponse<IAnotherUser>) => {
        return response.data;
      },
      providesTags: ["userState"],
    }),

    postBlockUser: builder.mutation<IRtkResponse<any>, IBlockUserName>({
      query: (data: IBlockUserName) => ({
        url: `${USER_API}/block`,
        method: "POST",
        body: data,
      }),
    }),
    getBlockLists: builder.query<IBlackList[], void>({
      query: () => ({
        url: `${USER_API}/block`,
      }),
      transformResponse: (response: IRtkResponse<IBlackList[]>) => {
        return response.data;
      },
    }),

    postCloseFriend: builder.mutation<IRtkResponse<any>, IUserId>({
      query: (data:IUserId) => ({
        url: `setcloseFriends`,
        method: "POST",
        body:data,
      }),
      invalidatesTags: ["userState"],

    }),
    deleteCloseFriend: builder.mutation<IRtkResponse<any>, IUserId>({
      query: (data:IUserId) => ({
        url: `deletecloseFriends`,
        method: "DELETE",
        body:data,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetBlockListsQuery,
  usePostBlockUserMutation,
  useLoginMutation,
  useRegisterMutation,
  useGetAnotherUserQuery,
  usePostEdithUserMutation,
  usePostForgetPasswordMutation,
  useGetTokenResetPasswordQuery,
  usePostResetPasswordMutation,
  usePostCloseFriendMutation,
  useDeleteCloseFriendMutation,
} = userApi;
