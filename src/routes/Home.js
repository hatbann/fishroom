import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  orderBy,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { v4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { async } from '@firebase/util';
import {
  authService,
  dbService,
  firebaseInstance,
  storageService,
} from '../fbase';

import Content from '../components/Content';
import HomeProfile from '../components/HomeProfile';
import Submit from '../components/Submit';
import Apex from '../components/Apex';
import Minecraft from '../components/Minecraft';

const GAME_TYPE = {
  APEX: 'apex',
  MINECRAFT: 'minecraft',
};

const Home = ({ userObj }) => {
  const [objText, setobjText] = useState('');
  const [imgFile, setImgFile] = useState();

  //Contents array 구성
  /*useEffect(() => {
    const q = query(
      collection(dbService, 'contents'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const contentArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContents(contentArr);
    });
  }, []);
  */

  const history = useHistory();
  const onLogout = () => {
    const auth = getAuth();
    signOut(auth);
    history.push('/');
  };

  return (
    <>
      <HomeProfile userObj={userObj} onLogout={onLogout} />
      <Minecraft userObj={userObj} game={GAME_TYPE.MINECRAFT} />
      <Apex userObj={userObj} game={GAME_TYPE.APEX} />
    </>
  );
};

export default Home;
