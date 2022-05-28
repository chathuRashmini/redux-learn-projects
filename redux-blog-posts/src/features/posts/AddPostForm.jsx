import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postAdded } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const AddPostForm = () => {

    const [title, settitle] = useState('')
    const [content, setcontent] = useState('')
    const [userId, setUserId] = useState('')

    const onTitleChange = (e) => settitle(e.target.value)
    const onContentChange = (e) => setcontent(e.target.value)
    const onUserChange = (e) => setUserId(e.target.value)

    const dispatch = useDispatch()

    const users = useSelector(selectAllUsers)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content, userId)
            )

            settitle('')
            setcontent('')
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOptions = users.map(user => (
        <option value={user.id} key={user.id}>
            { user.name }
        </option>
    ))

    return (
        <section>
            <h2>Add a new post</h2>

            <form>
                <label htmlFor="postTitle">Post title: </label>
                <input 
                    type="text" 
                    name="postTitle" 
                    id="postTitle" 
                    value={title}
                    onChange={onTitleChange}
                />

                <label htmlFor="postAuthor">Author: </label>
                <select 
                    name="postAuthor" 
                    id="postAuthor"
                    value={userId}
                    onChange={onUserChange}
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
                    onChange={onContentChange}
                />

                <button 
                    type='button' 
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save post
                </button>

            </form>
        </section>
    )
}

export default AddPostForm