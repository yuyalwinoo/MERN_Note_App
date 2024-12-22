import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../utils/validations';
import ShowMessage from '../../components/showMessage/ShowMessage';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../api/auth';


const PasswordToggleIcon = ({ isShow, onClick }) => {
    const Icon = isShow ? FaRegEye : FaRegEyeSlash;
    return <Icon size={16} className="text-primary cursor-pointer" onClick={onClick} />;
};

const Signup = () => {

    const navigate = useNavigate();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const defaultValue = {
        username:'',
        email:'',
        password: ''
    };
    
    const toggleShowPasswordHandler = ()=>{
        setIsShowPassword(!isShowPassword);
    }


    const { register, 
            handleSubmit,
            formState: {errors, isSubmitting} } = useForm({
                defaultValue,
                resolver:zodResolver(signupSchema)
            });

    
    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            navigate('/login');
        },
        onError: (error) => {
            console.error('Mutation failed:', error);
            setError('apiError',{
                type: error.response.status,
                message: error.response.data.message
            })
            },
    })
    const onSubmit = (data) => {
        try{
            mutation.mutate(data)
        }catch(error)
        {
            console.log("error",error)
        }
    }
    return (
        <div>

            <div className='flex justify-center items-center mt-28'>
                <div className='w-96 border border-card rounded-md bg-card px-7 py-10'>
                
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h4 className='text-2xl mb-7'>Sign Up</h4>

                        <div className='mb-4'>
                            <input type='text' 
                                {...register("username")} 
                                className='input-box' 
                                placeholder='Username'/>
                            {
                                errors.username && <ShowMessage message={errors.username.message} flag={"error"}/>
                            }
                        </div>

                        <div className='mb-4'>
                            <input type='text' 
                                {...register("email")} 
                                className='input-box' 
                                placeholder='Email'/>
                            {
                                errors.email && <ShowMessage message={errors.email.message} flag={"error"}/>
                            }
                        </div>

                        <div className='mb-4'>
                            <div className='flex items-center justify-between input-box'>
                                <input type={`${isShowPassword ? 'text' : 'password'}`}
                                    {...register("password")} 
                                    className='w-full outline-none pr-5' 
                                    placeholder='Password'
                                />
                                <PasswordToggleIcon isShow={isShowPassword} onClick={toggleShowPasswordHandler} />
                            </div>
                            {
                                errors.password && <ShowMessage message={errors.password.message} flag={"error"} />
                            }

                        </div>

                        <button type='submit' disabled={isSubmitting} className='btn-primary'>
                            {isSubmitting ? 'Loading...' : 'Signup'}
                        </button>

                        <p className='text-sm text-center mt-4'>
                            Already have an account? &nbsp;
                            <Link to={'/login'} className='font-medium text-primary underline'>Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup