import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { postAdded } from './postsSlice'

const AddPostForm = () => {

    const [title, settitle] = useState('')
    const [content, setcontent] = useState('')

    const onTitleChange = (e) => settitle(e.target.value)
    const onContentChange = (e) => setcontent(e.target.value)

    const dispatch = useDispatch()

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content)
            )

            settitle('')
            setcontent('')
        }
    }

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
                
                <label htmlFor="postContent">Post content: </label>
                <textarea 
                    type="text" 
                    name="postContent" 
                    id="postContent" 
                    value={content}
                    onChange={onContentChange}
                />

                <button type='button' onClick={onSavePostClicked}>Save post</button>

            </form>
        </section>
    )
}

export default AddPostForm