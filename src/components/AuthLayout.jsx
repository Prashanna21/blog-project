import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Portected({
    children,
    authentication = true
}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const dispatch = useDispatch()
    const authStatus = useSelector((state) => state.authReducer.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login") 
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }

        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading....</h1> : <>{children}</> 
}

export default Portected