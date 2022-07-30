import React from 'react';
import styles from './css/Submit.module.css';

const Submit = ({
  onSubmit,
  onChange,
  objText,
  onFileChange,
  onClickDeleteImg,
  imgFile,
  game,
}) => {
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} name={game}>
        <div>
          <input
            type="text"
            placeholder="What's going on?"
            onChange={onChange}
            value={objText}
            className={styles.inputText}
          />
          <input type="submit" value="Upload" className={styles.upload_btn} />
        </div>
        <div className={styles.input_photo}>
          <label for="attach-img" className={styles.AttachImg_label}>
            <span>Add photo</span>
          </label>
          <input
            id="attach-img"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
          {imgFile && (
            <div className={styles.sample_img}>
              <img src={imgFile} className={styles.sample_img_preview} />{' '}
              <button onClick={onClickDeleteImg} className={styles.delete_btn}>
                Clear
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Submit;
