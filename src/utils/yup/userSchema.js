import * as yup from 'yup';

export const userSchema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().required('Role is required'),
    password: yup.string().required('Password is required')
});

export const updateUserSchema = yup.object({
    username: yup.string().required('Username is required'),
    role: yup.string().required('Role is required')
});
