import { FaRegComment } from "react-icons/fa";

type commentButtonParams = {
  numComments: number;
}

export default function CommentButton({numComments} : commentButtonParams) {
  return (
    <div className="flex flex-row items-center space-x-1">
      <FaRegComment className="text-lg"/>
      <p>{numComments}</p>
    </div>
  )
}
