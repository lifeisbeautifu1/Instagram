import { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';

import { Post } from './index';
import { db } from '../firebase';

interface Post {
  id: string;
  username: string;
  userImg: string;
  image: string;
  caption: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(
            snapshot.docs.map((post) => ({
              id: post.id,
              username: post.data().username,
              userImg: post.data().profileImg,
              image: post.data().image,
              caption: post.data().caption,
            }))
          );
        }
      ),

    [db]
  );
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
