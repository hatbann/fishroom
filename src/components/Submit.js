import React from 'react';

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
    <div>
      <form onSubmit={onSubmit} name={game}>
        <input
          type="text"
          placeholder="What's going on?"
          onChange={onChange}
          value={objText}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Upload" />
        {imgFile && (
          <div>
            <img src={imgFile} width="50px" height="50px" />{' '}
            <button onClick={onClickDeleteImg}>Clear</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Submit;
