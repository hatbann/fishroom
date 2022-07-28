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

import Submit from '../components/Submit';
import Content from '../components/Content';

const Apex = ({ userObj, game }) => {
  const [contents, setContents] = useState([]);
  const [objText, setobjText] = useState('');
  const [imgFile, setImgFile] = useState();

  useEffect(() => {
    const q = query(collection(dbService, game), orderBy('createdAt', 'desc'));
    onSnapshot(q, (snapshot) => {
      const contentArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContents(contentArr);
    });
  }, []);

  //click functions
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setobjText(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const image = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImgFile(result);
    };
    reader.readAsDataURL(image);
  };

  const onClickDeleteImg = () => {
    setImgFile(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const gameName = event.target.name;
    let imgFileURL = '';
    if (imgFile !== '') {
      const imgFileRef = ref(storageService, `${game}/${userObj.uid}/${v4()}`);
      await uploadString(imgFileRef, imgFile, 'data_url');
      imgFileURL = await getDownloadURL(ref(storageService, imgFileRef));
    }
    const Object = {
      text: objText,
      createdAt: serverTimestamp(),
      createdId: userObj.uid,
      imgFileURL,
    };
    await addDoc(collection(dbService, game), Object);
    setobjText('');
    setImgFile('');
  };

  return (
    <>
      <h1>Apex Legend</h1>
      <Submit
        onSubmit={onSubmit}
        onChange={onChange}
        objText={objText}
        onFileChange={onFileChange}
        onClickDeleteImg={onClickDeleteImg}
        imgFile={imgFile}
        game={game}
      />
      <div>
        {contents.map((content) => (
          <Content
            contentObj={content}
            key={content.id}
            isOwner={content.createdId === userObj.uid}
            game={game}
          />
        ))}
      </div>
    </>
  );
};

export default Apex;
