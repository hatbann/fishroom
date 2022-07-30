import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useState } from 'react';
import { dbService, storageService } from '../fbase';
import styles from './css/Content.module.css';
const Content = ({ contentObj, isOwner, game }) => {
  const ContentTextRef = doc(dbService, game, `${contentObj.id}`);
  const ContentImgRef = ref(storageService, contentObj.imgFileURL);
  const [editing, setEditing] = useState(false);
  const [newobjText, setNewobjText] = useState(contentObj.text);

  const onToggleEdit = () => {
    setEditing((prev) => !prev);
  };
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
        <div className={styles.edit_container}>
          <img
            src={contentObj.imgFileURL}
            className={styles._edit_content_Img}
          ></img>
          <div className={styles.edit_form}>
            <form onSubmit={onEdit}>
              <textarea
                type="text"
                value={newobjText}
                onChange={onChange}
                required
                className={styles.input_text}
              />
              <div className={styles.edit_btns}>
                <input type="submit" value="edit" className={styles.btn} />
                <button onClick={onToggleEdit} className={styles.btn}>
                  Cancel Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.content_container}>
          {contentObj.imgFileURL && (
            <>
              <img src={contentObj.imgFileURL} className={styles.content_Img} />
            </>
          )}
          <span className={styles.content_text}>{contentObj.text}</span>
          {isOwner && (
            <div className={styles.btns}>
              <button onClick={onToggleEdit} className={styles.btn}>
                Edit
              </button>
              <button onClick={onDelete} className={styles.btn}>
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Content;
