import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FiLogIn } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { CiSaveDown2 } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillUnlockFill } from "react-icons/bs";
import { useNavigate } from 'react-router';
import axios from 'axios';

const Login = () => {
//   let navigate = useNavigate()
  const [icons, seticons] = useState(true)
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),

    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(16, 'password reached maximum limit'),

  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema), mode: 'all'
  });



  //LOGIN DATA VERIFY WITH EMAIL AND PASSWORD
 async function onSubmit(data) {
  try{
    const response=await axios.post('http://localhost:3600/login/data',data)
    let userId=response.data.userId;
    

    JSON.stringify(localStorage.setItem('userId',userId))
    
  

    toast.success(response.data.message, {
      position: toast.POSITION.TOP_CENTER,
     });
     setTimeout(() => {
      navigate('/update')
    }, 2200);

  }
  catch(error){
    const errData=error.response.data.message
    toast.error(errData)
  }
    }
   

  return (
    <div className='loginapp'>
      <div className=' container-fluid row justify-content-center'>
        <div className="card m-1 p-1  col-md-5 ">
          <h5 className="card-header text-center text-bg-primary">
            <FiLogIn /> LOGIN FORM
          </h5>
          <div className="card-body bg-white">
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>Email</label>
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
                  <label>Password</label>
                  <div className=' input-group'>
                    <input
                      name="password"
                      type={icons ? `password` : 'text'}
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''
                        }`} 
                    />
                    <span className=' input-group-text ' onClick={() => seticons(!icons)}>{icons ? <RiLockPasswordFill /> : <BsFillUnlockFill />}</span>
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </div>
                </div>
              </div>


              <div className="form-group mt-2">
                <button type="submit" className="btn btn-primary  mr-1">
                  <CiSaveDown2 /> SUBMIT
                </button>&nbsp;&nbsp;
                <button className="btn btn-danger " type="reset" onClick={() => reset()}>
                  <AiOutlineClear /> clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login