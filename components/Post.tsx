import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { FormEvent, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import Moment from 'react-moment';

import { db } from '../firebase';

interface Props {
  id: string;
  username: string;
  userImg: string;
  image: string;
  caption: string;
}

interface Comment {
  id: string;
  comment: string;
  userImage: string;
  username: string;
  timestamp: string;
}

const Post: React.FC<Props> = ({ id, username, userImg, image, caption }) => {
  const [comment, setComment] = useState('');

  const [comments, setComments] = useState<Comment[]>([]);

  const [likes, setLikes] = useState<any[]>([]);

  const [hasLiked, setHasLiked] = useState(false);

  const { data: session } = useSession();

  useEffect(
    () =>
      onSnapshot(
        collection(db, 'posts', id, 'comments'),

        (snapshot) =>
          setComments(
            snapshot.docs.map((value) => ({
              id: value.id,
              comment: value.data().comment,
              userImage: value.data().userImage,
              username: value.data().username,
              timestamp: value.data().timestamp,
            }))
          )
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id == session?.user?.uid) !== -1
    );
  }, [likes]);

  const sendComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentToSend = comment;

    setComment('');

    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid!));
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session?.user?.uid!), {
        username: session?.user?.username,
      });
    }
  };

  return (
    <div className='bg-white my-7 border rounded-sm'>
      <div className='flex items-center p-5'>
        <img
          src={userImg}
          alt={username}
          className='rounded-full h-12 w-12 object-contain border p-1 mr-3'
        />
        <p className='flex-1 font-bold'>{username}</p>
        <DotsHorizontalIcon className='h-5 cursor-pointer' />
      </div>
      <img src={image} className='w-full object-cover' alt='photo' />
      {session && (
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4'>
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className='btn text-red-500'
              />
            ) : (
              <HeartIcon onClick={likePost} className='btn' />
            )}
            <ChatIcon className='btn' />
            <PaperAirplaneIcon className='btn' />
          </div>
          <BookmarkIcon className='btn' />
        </div>
      )}
      <div className='p-5 truncate'>
        {likes.length > 0 && (
          <p className='font-bold mb-1'>{likes.length} likes</p>
        )}
        <span className='font-bold mr-1'>{username} </span>
        {caption}
      </div>
      {comments.length > 0 && (
        <div className='ml-5 max-h-20 h-full overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
          {comments.map((comment) => (
            <div key={comment.id} className='flex items-center space-x-2 mb-3'>
              <img
                className='h-7 rounded-full'
                src={comment?.userImage}
                alt={comment?.username}
              />
              <p className='text-sm flex-1'>
                <span className='font-bold'>{comment?.username}</span>{' '}
                {comment?.comment}
              </p>
              <Moment className='pr-5 text-xs' fromNow>
                {comment?.timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {session && (
        <form onSubmit={sendComment} className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7' />
          <input
            type='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='border-none flex-1 focus:ring-0 outline-none'
            placeholder='Add a comment...'
          />
          <button
            type='submit'
            disabled={!comment.trim()}
            className='font-medium text-blue-400'
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
