import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileDate from '../components/ProfileDate';

export default function Profile() {
  return (
    <div>
      <Header title="Profile" showSearch />
      <ProfileDate />
      <Footer />
    </div>
  );
}
