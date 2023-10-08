export type buttonType = "submit" | "reset" | "button" | undefined;

export interface IRtkResponse<T> {
  statusCode: number;
  message?: string;
  data: T;
}

export interface IErrorResponse {
  status?: number;
  data: IErrorMessage;
}

export interface IErrorMessage {
  message: string;
}

export interface ITokenType {
  token: string;
}
export interface IResetpassword {
  token?: string;
  password: string;
}

export interface IBlockUserName {
  blockUserName?: string;
}
export interface ICloseFriend {
  id?: number;
}
export interface IUserforLoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: null;
  lastName: null;
  isPrivate: boolean;
  status: boolean;
  profilePicture: null;
  bio: null;
  followerCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
  isDeleted?: boolean;
}

export interface ICreatePost {
  body?: string;
  tags?: string;
  images: File[];
}
export interface IUserDate {
  user: IUserforLoginResponse;
}

export interface IEdithUserResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  isPrivate: boolean;
  email: string;
  password: string;
  bio: string;
  profilePicture: string;
}

export interface IPostId {
  postId?: string | number;
}
export interface IUserId {
  userId: number;
}

export interface INotificationPage {
  page: number;
}

export interface ICreateComment extends IPostId {
  text: string;
  parentCommentId?: string;
}
export interface IParentCommentId {
  id: number;
}
export interface IGetAllComments {
  id: number;
  text: string;
  likeCount: number;
  timestamp: string;
  parent: null;
  children?: IGetAllComments[];
  createdBy: ICreatedByComment;
}

export interface IResponseViewPost {
  id: number;
  body: string;
  userId: 4;
  likeCount: 0;
  createdAt: string;
  updatedAt: string;
  tags: ITags[];
  images: IImages[];
  bookmarkCount: number;
  isliked: boolean;
  isBookmarked: boolean;
}

export interface ITags {
  id: number;
  name: string;
}
export interface ILikedPosts {
  likeCount: number;
}
export interface IImages extends IUrlImage, IPostId {
  id: number;
  createdAt: string;
}

export interface IGetAllPosts {
  username: string;
  posts: IPosts[];
}

export interface IUrlImage {
  urlImage: string;
}

export interface IPosts {
  id: number;
  images: IUrlImage[];
}

//home page
export interface IFollowerPost {
  id: number;
  body: string;
  userId: number;
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  tags: ITags[];
  images: IFollowerImages[];
  isLiked: boolean;
  isBookmarked: boolean;
  user: string;
}

export interface IFollowerImages {
  id: number;
  urlImage: string;
  postId: number;
  createdAt: string;
}

//collegegramies api
export interface ICollegegramies {
  collegegramies: ICollegegramie[];
}

export interface ICollegegramie {
  id: 1;
  username: string;
  firstName: string;
  lastName: string;
  isPrivate: boolean;
  profilePicture: string;
  followerCount: number;
  posts?: ICollegegramiesPosts[];
}

export interface ICollegegramiesPosts {
  id: number;
  body: string;
  userId: number;
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  images?: ICollegegramiesImages;
}
export interface ISearchValue {
  id: number;
  body: string;
  userId: number;
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  images: string;
  imageCount: number;
  isliked: boolean;
  user: string;
}

export interface ICollegegramiesImages {
  id: number;
  urlImage: string;
  postId: number;
  createdAt: string;
}

//AnotherUser
export interface IAnotherUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isPrivate: boolean;
  status: boolean;
  profilePicture: string;
  bio: string;
  followerCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
  isFollowed: boolean;
  isBlocked: boolean;
  isPending:boolean;
  postsCount: number;
}
//edit post
export interface IEditPost {
  body: string;
  tags: string;
  postId: number;
}

export interface ICreatedByComment {
  userId: number;
  username: string;
  displayName: string;
}

export interface IFraindsList {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export interface IBlackList extends IFraindsList {
  email: string;
  bio: string;
  followersCount: number;
  followingCount: number;
}
export enum EFollowNotification {
  FOLLOWED = "followed",
  FOLLOW_REQUESTED = "follow-request",
  FOLLOW_ACCEPTED = "follow-accepted",
}

interface IPostDetail {
  id: number;
  postImage: string;
}

interface IUserDetail {
  userId: number;
  displayName: string;
  username: string;
}

interface ICommentDetail {
  commentId: number;
}
export interface UserRelatedNotificaiton {
  subject: "follow";
  type: EFollowNotification;
  userId: number;
  username: string;
  displayName: string;
  profilePicture: string | undefined;
  createdAt: Date;
}

export interface PostLikeNotification {
  subject: "post-like";
  postDetails: IPostDetail;
  userDetails: IUserDetail;
  createdAt: Date;
}

export interface CommentNotification {
  subject: "comment";
  userDetail: IUserDetail;
  postDetail: IPostDetail;
  commentDetail: ICommentDetail;
  createdAt: Date;
}

export interface ISourceUser {
  userId: number;
  username: string;
  displayName: string;
  profilePicture?: string;
}

export interface CommentNotificationFriends extends CommentNotification {
  sourceUser: ISourceUser;
}

export interface PostLikeNotificationFriends extends PostLikeNotification {
  sourceUser: ISourceUser;
}

export interface UserRelatedNotificaitonFriends
  extends UserRelatedNotificaiton {
  sourceUser: ISourceUser;
}
