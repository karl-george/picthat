import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { BsCloudDownload, BsBookmark, BsBookmarkFill } from 'react-icons/bs';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { client, urlFor } from '../client';
import { postDetailQuery, additionalPostsQuery } from '../utils/queries';

const PostDetails = ({ user }) => {
  const [postDetails, setPostDetails] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const [extraPosts, setExtraPosts] = useState(null);

  const { postId } = useParams();

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(postId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: 'postedBy', _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPostDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  const fetchPostDetails = () => {
    let query = postDetailQuery(postId);

    if (query) {
      client.fetch(query).then((data) => {
        setPostDetails(data[0]);

        if (data[0]) {
          query = additionalPostsQuery(data[0]);

          client.fetch(query).then((res) => setExtraPosts(res));
        }
      });
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

  if (!postDetails) return <Spinner msg='Loading image...' />;

  return (
    <div>
      <div
        className='flex xl:flex-row flex-col m-auto bg-white'
        style={{ maxWidth: '1500px', borderRadius: '32px' }}
      >
        <div className='flex justify-center items-center md:items-start flex-initial'>
          <img
            src={postDetails?.image && urlFor(postDetails.image).url()}
            alt='users post'
            className='rounded-t-3xl rounded-b-lg'
          />
        </div>
        <div className='w-full p-5 flex-1 xl:min-w-620 xl:ml-5'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <a
                href={`${postDetails.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
              >
                <BsCloudDownload />
              </a>
            </div>
          </div>
          <div>
            <h1 className='text-4xl font-bold break-words mt-3'>
              {postDetails.title}
            </h1>
            <p className='mt-3'>{postDetails.about}</p>
          </div>
          <Link
            to={`user/${postDetails.postedBy?._id}`}
            className='flex gap-2 mt-5 items-center bg-white rounded-lg'
          >
            <img
              src={postDetails.postedBy?.image}
              alt='user profile'
              className='w-8 h-8 rounded-full object-cover'
            />
            <p className='font font-semibold capitalize'>
              {postDetails.postedBy?.userName}
            </p>
          </Link>
          <h2 className='mt-12 text-2xl'>
            {postDetails?.comments?.length}{' '}
            {postDetails?.comments?.length < 2 ? 'Comment' : 'Comments'}
          </h2>
          <div className='max-h-370 overflow-y-auto'>
            {postDetails?.comments?.map((comment, i) => (
              <div
                className='flex gap-2 mt-3 items-center bg-white rounded-lg'
                key={i}
              >
                <img
                  src={comment.postedBy.image}
                  alt='user-image'
                  className='w-8 h-8 rounded-full cursor-pointer'
                />
                <div className='flex flex-col'>
                  <p className='font-bold'>{comment.postedBy?.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap mt-6 gap-3 items-center'>
            <Link to={`user/${postDetails.postedBy?._id}`}>
              <img
                src={user?.image}
                alt='user-profile'
                className='w-8 h-8 rounded-full cursor-pointer'
              />
            </Link>
            <input
              type='text'
              placeholder='Add a comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
            />
            <button
              type='button'
              onClick={addComment}
              className='bg-accent text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
            >
              {addingComment ? 'Posting' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {extraPosts?.length > 0 ? (
        <>
          <h2 className='text-center font-bold text-2xl mt-8 mb-4'>
            More like this
          </h2>
          <MasonryLayout posts={extraPosts} />
        </>
      ) : (
        <Spinner msg='Loading more images' />
      )}
    </div>
  );
};

export default PostDetails;
