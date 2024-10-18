import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

type RegisterFormData = {
  name: string;
  companyName: string;
  email: string;
  licenseNumber: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      return; // Handle password mismatch
    }

    try {
      await registerUser(data);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error (show message to user)
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register as Agent</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Full name is required' })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="companyName" className="block mb-1">Company Name</label>
          <input
            type="text"
            id="companyName"
            {...register('companyName', { required: 'Company name is required' })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName.message}</span>}
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="licenseNumber" className="block mb-1">Real Estate License Number</label>
          <input
            type="text"
            id="licenseNumber"
            {...register('licenseNumber', { required: 'License number is required' })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.licenseNumber && <span className="text-red-500 text-sm">{errors.licenseNumber.message}</span>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === watch('password') || 'Passwords do not match'
            })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
        </div>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;