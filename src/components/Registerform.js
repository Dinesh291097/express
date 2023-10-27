import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const Registerform = () => {
   

    const validationSchema = Yup.object().shape({
        Name: Yup.string().required(' Name is cannot be empty.').min(3, 'minimum 3 chatacter are allowed').max(15, 'Name is reached maximum limit!')
            .matches(
                /^[a-zA-Z -]+$/,
                'Enter Valid Name Only'
            ),


        email: Yup.string().required('Email cannot be empty.').email('Email is invalid')
            .matches(
                /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
                'Enter valid mail id'
            ),

        password: Yup.string()
            .required('Password cannot be empty.')
            .min(6, 'Password must be at least 6 characters')
            .max(16, 'password reached maximum limit ')

            // .oneOf([Yup.ref('confirmPassword')], 'confirmPassword must match')
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                'Enter Valid Password'
            ),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password cannot be empty.'),

        acceptTerms: Yup.bool()
            .oneOf([true], 'Accept Ts & Cs is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema), mode:'all'
    });


    // function onsubmit and local storage-register created
     async function onSubmit(data) {
      try{
       const response= await axios.post('http://localhost:3600/register/data',data)
    //    console.log(response);
        toast.success(response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
          });

      } 
      catch(err){
        toast.warning(err.response.data.message, {
            position: toast.POSITION.TOP_CENTER
        });
          console.log(err);
      } 
    }
  

    return (

        <div className=' container-fluid row justify-content-center'>
            <div className="card m-1 p-1  col-md-9  registerapp">
                <h5 className="text-label text-center bg-info"> 
                    REGISTER FORM
                </h5>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-row">

                            <div className="form-group col-md-12">
                                <label className=' text-label'>Name</label>
                                <input
                                    name="Name"
                                    type="text"
                                    {...register('Name')}
                                    className={`form-control ${errors.Name ? 'is-invalid' : ''
                                        }`}
                                />
                                <div className="invalid-feedback">
                                    {errors.Name?.message}
                                </div>
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label className=' text-label'>Email</label>
                                <input
                                    name="email"
                                    type="text"
                                    {...register('email')}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                />
                                <div className="invalid-feedback">{errors.email?.message}</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12 ">
                                <label className=' text-label'>Password</label>
                                <div className=' input-group'>
                                    <input
                                        name="password"
                                        type='password'
                                        {...register('password')}
                                        className={`form-control ${errors.password ? 'is-invalid' : ''
                                            }`}
                                    />
                                  
                                    <div className="invalid-feedback">{errors.password?.message}</div>
                                </div>
                            </div>
                            <div className="form-group col-md-12">
                                <label className=' text-label'>Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    {...register('confirmPassword')}
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''
                                        }`}
                                />
                                <div className="invalid-feedback">
                                    {errors.confirmPassword?.message}

                                </div>
                            </div>
                            <div className="form-group form-check">
                                <input name="acceptTerms" type="checkbox" {...register("acceptTerms")} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
                                <label for="acceptTerms" className="form-check-label text-label">Accept Terms & Conditions</label>
                                <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                            </div>
                        </div>

                        <div className="form-group mt-2">
                            <button type="submit" className="btn btn-success mr-1">
                                Register
                            </button>&nbsp;&nbsp;
                            <button className="btn btn-danger" type="reset" onClick={() => reset()}>
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Registerform