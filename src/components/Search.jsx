import React from 'react'
import {Input} from './index.js'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function Search() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const onSubmit = (data) => {
        const search = data?.query;
        navigate(`/search/${search}`)
    }
  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                placeholder='Search 🔎'
                {...register('query', { required: true })}
            />
        </form>
    </>
  )
}

export default Search