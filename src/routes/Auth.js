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
    <div>
      <button onClick={onToggle}>
        {newAccount ? '기존 회원 로그인' : '계정 생성'}
      </button>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          onChange={onChange}
          placeholder="Email"
          required
          value={email}
        />
        <input
          name="pw"
          type="password"
          onChange={onChange}
          placeholder="Password"
          required
          value={pw}
        />
        {newAccount ? (
          <input
            name="nickname"
            type="text"
            onChange={onChange}
            placeholder="NickName"
            required
            value={nickname}
          />
        ) : null}
        <input type="submit" value={newAccount ? '계정생성' : '로그인'}></input>
      </form>
      <span>{error}</span>
      <div></div>
    </div>
  );
};

export default Auth;
