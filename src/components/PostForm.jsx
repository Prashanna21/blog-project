import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from "./index"
import appwriteService from "../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({postInfo}) {
    console.log(postInfo)
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title : postInfo?.title || "",
            slug : postInfo?.$id || "",
            content: postInfo?.content || "",
            status: postInfo?.status || "",

        }
    })

    const navigator = useNavigate()
    const userData = useSelector((state) => state.authReducer.userData)

    const submit = async (data) => {

        if(postInfo){
            console.log(postInfo)
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

            if(file){
                appwriteService.deleteFile(postInfo.featuredImg)
            }

            const dbPost = await appwriteService.updatePost(
                postInfo.$id, {
                    ...data,
                    featuredImg : file ? file.$id : postInfo.featuredImg,

                    
                })

            if(dbPost){
                navigator(`/post/${dbPost.$id}`)
            }
        }
            else{
                const file = data.image ? await appwriteService.uploadFile(data.image[0]) : null

                if(file)
                {
                    const fileId = file.$id
                    data.featuredImg = fileId
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userName : userData.name || "test",
                        userId : userData.$id,
                        
                    })

                    if(dbPost){
                        navigator(`/post/${dbPost.$id}`)
                    }
                }
            }
        
    }

    const slugTransform = useCallback((value) => {
        if (value)
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name){
                if(name == "title"){
                    setValue('slug', slugTransform(value.title,
                        {shouldValidate: true}
                    ))
                }
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !postInfo })}
        />
        {postInfo && (
            <div className="w-full mb-4">
                <img
                    src={appwriteService.getFilePreview(postInfo.featuredImg)}
                    alt={postInfo.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={postInfo ? "bg-green-500" : undefined} className="w-full">
            {postInfo ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  )
}

export default PostForm