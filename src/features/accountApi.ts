import { apiSlice } from "./api/apiSlice";
import {
  ICreatePost,
  IEditPost,
  IFollowerPost,
  IGetAllPosts,
  IPosts,
  IResponseViewPost,
  IRtkResponse,
  ITags,
  ILikedPosts,
  IPostId,
  ISearchValue,
} from "types/interface";

const Post_API = "post";

const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postCreatePost: builder.mutation<IRtkResponse<ICreatePost>, FormData>({
      query: (data) => ({
        url: `${Post_API}/create-post`,
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Posts"],
    }),

    getViewPost: builder.query<IResponseViewPost, number>({
      query: (postid) => ({
        url: `${Post_API}/view-post/${postid}`,
      }),
      transformResponse: (response: IRtkResponse<IResponseViewPost>) => {
        const sortedTags = response.data.tags.sort(
          (a: ITags, b: ITags) => b.id - a.id
        );
        return {
          ...response.data,
          posts: sortedTags,
        };
      },
      providesTags: ["Posts", "likes","bookmark"],
    }),

    getUserPost: builder.query<IGetAllPosts, string>({
      query: (username) => ({
        url: `${Post_API}/${username}`,
      }),
      transformResponse: (response: IRtkResponse<IGetAllPosts>) => {
        const sortedPosts = response.data.posts.sort(
          (a: IPosts, b: IPosts) => b.id - a.id
        );
        return {
          ...response.data,
          posts: sortedPosts,
        };
      },
      providesTags: ["Posts","userState"],
    }),

    getAllFollowerPost: builder.query<IFollowerPost[], void>({
      query: () => ({
        url: "homepage",
      }),
      transformResponse: (response: IRtkResponse<IFollowerPost[]>) => {
        return response.data.sort(
          (a: IFollowerPost, b: IFollowerPost) => b.id - a.id
        );
      },
      providesTags: ["Posts", "bookmark","userState"],
    }),

    editPost: builder.mutation<IRtkResponse<any>, IEditPost>({
      query: (data) => ({
        url: `${Post_API}/edit-post/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),

    Likedposts: builder.mutation<IRtkResponse<ILikedPosts>, IPostId>({
      query: (data) => ({
        url: `${Post_API}/like`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["likes"],
    }),

    UnLikedposts: builder.mutation<IRtkResponse<ILikedPosts>, IPostId>({
      query: (data) => ({
        url: `${Post_API}/unlike`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["likes"],
    }),

    getSearchValue: builder.query<ISearchValue[], string>({
      query: (value) => ({
        url: `${Post_API}/search/${value}`,
      }),
      transformResponse: (response: IRtkResponse<ISearchValue[]>) => {
        return response.data;
      },
    }),

    getLikedPost: builder.query<boolean, number>({
      query: (postId) => ({
        url: `${Post_API}/isLiked/${postId}`,
      }),
      transformResponse: (response: IRtkResponse<boolean>) => {
        return response.data;
      },
    }),
  }),
});
export const {
  useEditPostMutation,
  useGetViewPostQuery,
  useGetUserPostQuery,
  useGetLikedPostQuery,
  useGetSearchValueQuery,
  useGetAllFollowerPostQuery,
  usePostCreatePostMutation,
  useUnLikedpostsMutation,
  useLikedpostsMutation,
} = accountApi;
