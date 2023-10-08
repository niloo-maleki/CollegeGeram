export interface IGetBookMark {
  bookmarks: IBookmark[];
}

export interface IBookmark {
  id: number;
  body: string;
  userId: number;
  images:IImages[];
}
export interface IImages {
  id: number;
  urlImage: string;
  postId: number;
  createdAt: string;
}
export interface IPostBookMark {
  bookmark: boolean;
}
