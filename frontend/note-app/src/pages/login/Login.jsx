import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from 'react-router-dom';
import ShowMessage from '../../components/showMessage/ShowMessage';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { authSchema } from '../../utils/validations';
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../api/auth';

const PasswordToggleIcon = ({ isShow, onClick }) => {
    const Icon = isShow ? FaRegEye : FaRegEyeSlash;
    return <Icon size={16} className="text-primary cursor-pointer" onClick={onClick} />;
};

const Login = () => {

    let navigate = useNavigate();
    const queryClient = useQueryClient()
    const [isShowPassword, setIsShowPassword] = useState(false);
    const defaultValue = {
        email:'',
        password: ''
    };
    
    const toggleShowPasswordHandler = ()=>{
        setIsShowPassword(!isShowPassword);
    }


    const { register, 
            handleSubmit,
            setError,
            formState: {errors, isSubmitting} } = useForm({
                defaultValue,
                resolver:zodResolver(authSchema)
            });

    
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/');
        },
        onError: (error) => {
            setError('apiError',{
                type: error.response.status,
                message: error.response.data.message
            })
          },
    })
    const onSubmit = async(data) => {
        try{
            mutation.mutate(data);
        }catch(error){
            console.error('Mutation failed:', error);
        }
    }

  return (
    <div>
        <div className='flex justify-center items-center mt-28'>
            <div className='w-96 border border-card rounded-md bg-card px-7 py-10'>
               
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h4 className='text-2xl mb-7'>Login</h4>
                    <div className='mb-5'>
                    {
                        errors.apiError && <ShowMessage message={errors.apiError.message} flag={"error"}/>
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
                        {isSubmitting ? 'Loading...' : 'Login'}
                    </button>

                    <p className='text-sm text-center mt-4'>
                        Not registered yet? &nbsp;
                        <Link to={'/signup'} className='font-medium text-primary underline'>Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login