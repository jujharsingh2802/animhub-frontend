import React, { useState } from 'react'
import useSelector, { useDispatch } from 'react-redux'
import { deleteComment, updateComment } from '../store/Slices/comment.slice.js';
function CommentsList({
  avatar, 
  username, 
  createdAt,
  content, 
  commentId, 
  isLiked, 
  likesCount
}) {
  const authAvatar = useSelector((state) => state.auth.userdata?.avatar);
  const authUsername = useSelector(state => state.auth.userdata?.username);
  const dispatch = useDispatch();

  const [editState, setEditState ] = useState({
    editing: false, 
    editedContent: content,
    isOpen: false,
    delete: false
  });

  const handleEditComment = (editedContent) => {
    dispatch(updateComment({commentId, content: editedContent}));
    setEditState((prev)=>({
      ...prev,
      editing: false,
      editedContent,
      isOpen: false,
      delete: false
    }))
  };
  const handleDeleteComment = () => {
    dispatch(deleteComment({commentId}));
    setEditState((prev) =>({
      ...prev,
      delete: false
    }))
  }
  return (
    <div className=' text-white w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5'>
      <div className='w-12'>
        <img src={avatar || authAvatar} className=' w-10 h-10 object-cover rounded-full' />
      </div>
      
    </div>
  )
}

export default CommentsList