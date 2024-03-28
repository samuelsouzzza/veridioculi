'use client';
import { InputFile } from '../InputFile/InputFile';
import { Button } from '../Button/Button';
import { IImgsForAnalysis } from '@/@types/@types';
import React from 'react';

export const FormNewAnalysis = () => {
  const [selectedImgs, setSelectedImgs] = React.useState<
    IImgsForAnalysis[] | null
  >(null);

  function loadImgs(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { files } = e.target;

    if (files !== null && files.length > 0) {
      setSelectedImgs(
        Array.from(files).map((file) => ({
          preview: URL.createObjectURL(file),
          raw: file,
        }))
      );
    }
  }

  function deleteImg(id: number) {
    if (selectedImgs) {
      let arr = [...selectedImgs];
      arr?.splice(id, 1);
      setSelectedImgs(arr);
    }
  }

  function sendForm() {
    alert('Formulário enviado');
    console.log(selectedImgs);
  }

  return (
    <form action={sendForm}>
      <InputFile
        id='idInputImgsNewAnalysis'
        label='Selecione as imagens para a análise'
        selectedImgs={selectedImgs ? selectedImgs : null}
        onChange={loadImgs}
        onDelete={deleteImg}
        accept='image/*'
      />
      {selectedImgs && selectedImgs.length > 0 && (
        <Button
          type='submit'
          text='Enviar para análise'
          className='btnPrimary'
        />
      )}
    </form>
  );
};
