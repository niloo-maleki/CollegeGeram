import { apiSlice } from "features/api/apiSlice";
import { IPostId, IRtkResponse } from "types/interface";
import { IBookmark, IGetBookMark, IPostBookMark } from "../../types/bookMarkType";

const Bookmark_API = "post/bookmark";

const bookMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookMarked: builder.query<IBookmark[], void>({
      query: () => ({
        url: Bookmark_API,
      }),
      transformResponse: (response: IRtkResponse<IGetBookMark>) => {
        return response.data.bookmarks;
      },
      providesTags: ["bookmark"],
    }),

    postBookMark: builder.mutation<IPostBookMark, IPostId>({
      query: (data) => ({
        url: Bookmark_API,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: IRtkResponse<IPostBookMark>) => {
        return response.data;
      },
      invalidatesTags:["bookmark"]
    }),

    deleteBookMark: builder.mutation<IRtkResponse<IPostBookMark>, IPostId>({
      query: (data) => ({
        url: Bookmark_API,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags:["bookmark"]

    }),
  }),
});

export const {
  useGetAllBookMarkedQuery,
  usePostBookMarkMutation,
  useDeleteBookMarkMutation,
} = bookMarkApi;
