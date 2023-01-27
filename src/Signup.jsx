import React, { useState } from 'react';
import { app, database } from '../firebaseconfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function SignUpForm() {
  const ref = collection(database, 'teams');
  const [teamCode, setTeamCode] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    profession: '',
    teamCode: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.phoneNumber || !formData.profession) {
      return alert('Name, Phone Number, and Profession are mandatory fields.');
    }
    addDoc(ref, formData)
      .then(() => {
        console.log('done');
      })
      .catch(() => {
        console.log('Something went wrong');
      });

    setFormData({
      name: '',
      phoneNumber: '',
      profession: '',
      teamCode: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type='text'
          name='phoneNumber'
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Profession:
        <input
          type='text'
          name='profession'
          value={formData.profession}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Team Code:
        <input
          type='text'
          name='teamCode'
          value={formData.teamCode}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type='submit'>Sign Up</button>
    </form>
  );
}

export default SignUpForm;
