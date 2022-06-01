import React from 'react'
import { Link } from 'react-router-dom'

import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostsExpert = ({ post }) => {
    return (
        <article>
            <h2>{ post.title }</h2>
            <p className='excerpt'>{ post.content } </p>

            <p className="postCredit">

                <Link to={`post/${post.id}`}>View Post</Link>

                <PostAuthor userId = {post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>

            <ReactionButtons post={post} />
        </article>
    )
}

export default PostsExpert