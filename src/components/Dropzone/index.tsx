import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './styles.css';
import { FiUpload } from 'react-icons/fi';

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileURL, setSelectedFileURL] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileURL = URL.createObjectURL(file);

      setSelectedFileURL(fileURL);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />

      {selectedFileURL ? (
        <img src={selectedFileURL} alt='Point thumbnail'></img>
      ) : isDragActive ? (
        <>
          <p>
            <FiUpload />
            Solte o arquivo aqui...
          </p>
        </>
      ) : (
        <p>
          <FiUpload />
          Arraste e solte um arquivo aqui, ou click para selecionar...
        </p>
      )}
    </div>
  );
};

export default Dropzone;
