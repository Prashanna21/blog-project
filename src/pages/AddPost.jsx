import React from 'react'
import { PostForm , Container} from '../components/index'

function AddPost() {
  return (
    <div className='py-5'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost