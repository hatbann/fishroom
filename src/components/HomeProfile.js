import React from 'react';

const HomeProfile = ({ userObj, onLogout }) => {
  return (
    <div>
      <h3>{userObj.displayName}님 안녕하세요!</h3>
      <button onClick={onLogout}>log out</button>
    </div>
  );
};

export default HomeProfile;
