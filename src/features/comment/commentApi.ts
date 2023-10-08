import { apiSlice } from "features/api/apiSlice";
import {
  ICreateComment,
  IGetAllComments,
  IParentCommentId,
  IRtkResponse,
} from "types/interface";

const COMMENT_API = "comment";
const COMMENT_API_LIKE = "comment-like";

const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postCreateComment: builder.mutation<
      IRtkResponse<IParentCommentId>,
      ICreateComment
    >({
      query: (data) => ({
        url: `${COMMENT_API}/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comments"],
    }),

    getComment: builder.query<any, void>({
      query: (commentId) => ({
        url: `${COMMENT_API}/${commentId}`,
      }),
      providesTags: ["Profile"],

    }),

    getAllComments: builder.query<IGetAllComments[], void>({
      query: (postId) => ({
        url: `${COMMENT_API}/post/${postId}`,
      }),
      transformResponse: (response: IRtkResponse<IGetAllComments[]>) => {
        return response.data;
      },
      providesTags: ["Profile","comments", "like"],
    }),

    postLikeComment: builder.mutation<any, number>({
      query: (commentId) => ({
        url: `${COMMENT_API_LIKE}/like/${commentId}`,
        method: "POST",
      }),
      invalidatesTags: ["like"],
    }),

    deleteLikeComment: builder.mutation<any, number>({
      query: (commentId) => ({
        url: `${COMMENT_API_LIKE}/unlike/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["like"],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useDeleteLikeCommentMutation,
  usePostLikeCommentMutation,
  usePostCreateCommentMutation,
  useGetAllCommentsQuery,
} = commentApi;
