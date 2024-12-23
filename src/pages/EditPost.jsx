import React from 'react'
import { useEffect, useState } from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config"
import {useNavigate, useParams } from 'react-router-dom'


function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const naviagtor = useNavigate()

    useEffect(() => {
        if(slug) {
            appwriteService.getPost(slug).then((post) => {
                if(post) {
                    setPost(post)
                }
            })
        }

        else{
            naviagtor('/')        
        }
    }, [slug, naviagtor])


  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm postInfo={post} />
        </Container>

    </div>
  )
  : null
}

export default EditPost