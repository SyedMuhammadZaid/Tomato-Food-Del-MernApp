import * as yup from "yup"

export const signUpSchema = yup.object().shape({
    name:yup.string().required(),
    email:yup.string().email().required(),
    password:yup.string().required()
})

export const loginSchema = yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().required()
})

export const addAddress = yup.object().shape({
    firstName:yup.string().min(3).max(20),
    lastName:yup.string().min(3).max(20),
    email:yup.string().email().required(),
    street:yup.string().required(),
    city:yup.string().required(),
    state: yup.string().required(),
    zipCode:yup.string().min(5).max(5).required(),
    country:yup.string().required(),
    phone:yup.string().required()
})