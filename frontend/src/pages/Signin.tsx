import React from 'react'
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const navigate =useNavigate();
    const {login} = useAuth();
    const handleLogin= async () =>{
        try{
            const sucess = await login({
                email:"Anmol@gmail.com",
                password: "Anmol"
            });

            if(sucess){
                console.log('Login successful');
                navigate('/dashboard');
            }else{
                console.log('Login failed');
                navigate('/signin');
            }
        }catch(error){
            console.error('Error during login', error);
            navigate('/signin');
        }
    }
  return (
    <div><Button onClick={handleLogin}>Sign in</Button></div>
  )
}
export default Signin