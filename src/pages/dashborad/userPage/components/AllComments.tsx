import { IGetAllComments } from "types/interface";
import Comment from "./Comment";

const AllComments = ({
  comments,
  setReplyComment,
  inputRef,
}: {
  comments: IGetAllComments[];
  setReplyComment: (id: number) => void;
  inputRef: HTMLInputElement | null;
}) => {

  return (
    <>
      {comments?.map((comment, index) => (
        <div key={comment.id} className="flex flex-col gap-4">
          <Comment
            comment={comment.text}
            commentId={comment.id}
            inputRef={inputRef}
            likeCount={comment.likeCount}
            setReplyComment={setReplyComment}
            commentOwnerUserId={comment.createdBy.userId}
            commentOwnerUsername={comment.createdBy.username}
            commentOwnerDisplayName={comment.createdBy.displayName}
            createdDate = {comment.timestamp}

          />
          {comment?.children?.map((childComment, index) => (
            <div key={index} className="flex flex-col mr-8">
              <Comment
                comment={childComment.text}
                commentId={childComment.id}
                inputRef={inputRef}
                likeCount={childComment.likeCount}
                setReplyComment={setReplyComment}
                commentOwnerUserId={comment.createdBy.userId}
                commentOwnerUsername={comment.createdBy.username}
                commentOwnerDisplayName={comment.createdBy.displayName}
                createdDate = {childComment.timestamp}

              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default AllComments;
