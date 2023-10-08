import { apiSlice } from "features/api/apiSlice";
import { IRtkResponse, CommentNotification, UserRelatedNotificaiton, PostLikeNotification, CommentNotificationFriends, UserRelatedNotificaitonFriends, PostLikeNotificationFriends } from "types/interface";

const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    selfNotification: builder.query<(CommentNotification | UserRelatedNotificaiton | PostLikeNotification | undefined)[], number>({
      query: (page) => ({
        url: `/notification/self-notifications/${page}`,
        method: "GET",
      }),
      transformResponse: (response: IRtkResponse<(CommentNotification | UserRelatedNotificaiton | PostLikeNotification | undefined)[]>) => {
        return response.data.reverse()
      },
    }),
    friendsNotification: builder.query<(CommentNotificationFriends | UserRelatedNotificaitonFriends | PostLikeNotificationFriends | undefined)[], number>({
        query: (page) => ({
          url: `/notification/friends-notifications/${page}`,
          method: "GET",
        }),
        transformResponse: (response: IRtkResponse<(CommentNotificationFriends | UserRelatedNotificaitonFriends | PostLikeNotificationFriends | undefined)[]>) => {
          return response.data.reverse()
        },
      }),
  }),
});

export const {
    useSelfNotificationQuery,
    useFriendsNotificationQuery,
} = notificationApi;