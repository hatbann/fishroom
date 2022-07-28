import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react';
import { dbService, storageService } from '../fbase';

const Content = ({ contentObj, isOwner, game }) => {
  const ContentTextRef = doc(dbService, game, `${contentObj.id}`);
  const ContentImgRef = ref(storageService, contentObj.imgFileURL);
  const [editing, setEditing] = useState(false);
  const [newobjText, setNewobjText] = useState(contentObj.text);

  const onToggleEdit = () => {
    setEditing((prev) => !prev);
  };
  console.log(contentObj);
  const onDelete = async () => {
    const ok = window.confirm('정말 삭제하시겠습니까?');
    if (ok) {
      try {
        //삭제
        await deleteDoc(ContentTextRef);
        if (contentObj.imgFileURL !== '') {
          //이미지가 있는 컨텐츠라면 삭제
          await deleteObject(ContentImgRef);
        }
      } catch (error) {
        window.alert('삭제에 실패했습니다');
      }
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewobjText(value);
  };

  //수정 로직
  const onEdit = async (event) => {
    event.preventDefault();
    await updateDoc(ContentTextRef, {
      text: newobjText,
    });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onEdit}>
            <img src={contentObj.imgFileURL} width="100px" height="100px"></img>
            <input
              type="text"
              value={newobjText}
              onChange={onChange}
              required
            />
            <input type="submit" value="edit" />
          </form>
          <button onClick={onToggleEdit}>Cancel Edit</button>
        </>
      ) : (
        <>
          {contentObj.imgFileURL && (
            <img src={contentObj.imgFileURL} width="100px" height="100px" />
          )}
          <h4>{contentObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onToggleEdit}>Edit</button>
              <button onClick={onDelete}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Content;
