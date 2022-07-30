import React from 'react';
import styles from './css/HomeProfile.module.css';

const HomeProfile = ({ userObj, onLogout }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.welcome}>{userObj.displayName}님 안녕하세요!</h3>
      <button onClick={onLogout} className={styles.logout}>
        log out
      </button>
    </div>
  );
};

export default HomeProfile;
