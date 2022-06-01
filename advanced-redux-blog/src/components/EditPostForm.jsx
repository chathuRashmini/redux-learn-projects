import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { deletePost, selectPostById, updatePost } from '../features/posts/postsSlice'
import { selectAllUsers } from '../features/users/usersSlice'

const EditPostForm = () => {

    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, settitle] = useState(post?.title)
    const [content, setcontent] = useState(post?.body)
    const [userId, setuserId] = useState(post?.userId)
    const [reqStatus, setreqStatus] = useState('idle')

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => settitle(e.target.value)
    const onContentChanged = e => setcontent(e.target.value)
    const onAuthorChanged = e => setuserId(e.target.value)

    const canSave = [ title, content, userId ].every(Boolean) && reqStatus === 'idle'

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setreqStatus('pending')
                dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()

                settitle('')
                setcontent('')
                setuserId('')
            } catch (err) {
                console.error('Failed to save the post: ', err)
            } finally {
                setreqStatus('idle')
            }
        }
    }

    const onDeletePostClicked = () => {
        try {
            setreqStatus('pending')
            dispatch(deletePost({ id: post.id })).unwrap()

            settitle('')
            setcontent('')
            setuserId('')
            navigate('/')
        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setreqStatus('idle')
        }
    }

    const usersOptions = users.map(user => (
        <option 
            value={user.id} 
            key={user.id}
        >
            { user.name }
        </option>
    ))

    return (
        <section>
            <h2>Edit post</h2>

            <form>
                <label htmlFor="postTitle">Post title: </label>
                <input 
                    type="text" 
                    name="postTitle" 
                    id="postTitle" 
                    value={title}
                    onChange={onTitleChanged}
                />

                <label htmlFor="postAuthor">Author: </label>
                <select 
                    name="postAuthor" 
                    id="postAuthor"
                    defaultValue={userId}
                    value={userId}
                    onChange={onAuthorChanged}
                >
                    <option value=""></option>
                    { usersOptions }
                </select>
                
                <label htmlFor="postContent">Post content: </label>
                <textarea 
                    type="text" 
                    name="postContent" 
                    id="postContent" 
                    value={content}
                    onChange={onContentChanged}
                />

                <button 
                    type='button' 
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save post
                </button>

                <button className="deleteButton"
                    type="button"
                    onClick={onDeletePostClicked}
                >
                    Delete Post
                </button>

            </form>
        </section>
    )
}

export default EditPostForm