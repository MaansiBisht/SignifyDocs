import React, { useEffect, useState } from 'react';
import { Form } from '@formio/react';
import { auth } from "../firebase";
import {useNavigate} from 'react-router-dom';

const DynamicForm = () => {
  const [user, setUser] = useState(null);
  const formUrl = 'https://mgmysqwemfhvyzj.form.io/dynamicform';
  const [form, setForm] = useState(null);
  const navigate = useNavigate();

  // const token = user
  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const fetchForm = async () => {
      const response = await fetch(formUrl);
      const formData = await response.json();
      setForm(formData);
    };

    fetchForm();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log(currentUser)
      setUser(currentUser);
    });
    
    return () => unsubscribe();
  }, [formUrl]);

  const onSubmitHandler = async (submission) => {  

    try {
      const response = await fetch('http://localhost:8000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({
          uid: user.uid,
          title: submission.data.textField,
          description: submission.data.description,
          agreement: submission.data.checkbox1,
          premiumsignature: submission.data.premiumsignature
        })
      });
  
      if (response.ok) {
        console.log('Form data saved successfully');
        navigate('/dashboard');
      } else {
        console.error('Error saving form data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-100">
      <div className="custom-form-wrapper w-3/4 sm:w-1/2 bg-white shadow-lg rounded-lg p-6">
      {form && <Form form={form} onSubmit={onSubmitHandler} />}
      </div>
    </div>

  );

};

export default DynamicForm;