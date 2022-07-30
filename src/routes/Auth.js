import { async } from '@firebase/util';
import { authService, firebaseInstance } from '../fbase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { dbService } from '../fbase';
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  orderBy,
  onSnapshot,
  query,
} from 'firebase/firestore';
import React, { useState } from 'react';
import styles from './css/Auth.module.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickName] = useState('');
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState(true); //계정 만드는지 or 기존 로그인인지

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'pw') {
      setPw(value);
    } else if (name === 'nickname') {
      setNickName(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        //계정 생성하기
        data = await createUserWithEmailAndPassword(auth, email, pw);
        updateProfile(auth.currentUser, {
          displayName: nickname,
        });
      } else {
        //로그인하기
        data = await signInWithEmailAndPassword(auth, email, pw);
      }
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        setError('이미 존재하는 계정입니다');
      } else {
        setError('다시 확인해주세요');
      }
    }
  };

  const onToggle = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <button onClick={onToggle} className={styles.toggle_btn}>
        {newAccount ? '기존 회원 로그인' : '계정 생성'}
      </button>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          name="email"
          type="email"
          onChange={onChange}
          placeholder="Email"
          required
          value={email}
          className={styles.input}
        />
        <input
          name="pw"
          type="password"
          onChange={onChange}
          placeholder="Password"
          required
          value={pw}
          className={styles.input}
        />
        {newAccount ? (
          <input
            name="nickname"
            type="text"
            onChange={onChange}
            placeholder="NickName"
            required
            value={nickname}
            className={styles.input}
          />
        ) : null}
        <input
          type="submit"
          value={newAccount ? '계정생성' : '로그인'}
          className={styles.submit_btn}
        ></input>
      </form>
      <span className={styles.error}>{error}</span>
      <div></div>
    </div>
  );
};

export default Auth;
