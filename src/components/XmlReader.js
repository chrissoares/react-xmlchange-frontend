// XmlReader.js (React)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import XmlDataPage from './XmlDataPage';

function XmlReader() {
  const [xmlData, setXmlData] = useState('');
  const [file, setFile] = useState(null);
  const [showXmlDataPage, setShowXmlDataPage] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        console.error('Nenhum arquivo selecionado.');
        return;
      }

      const formData = new FormData();
      formData.append('xmlFile', file);

      const response = await fetch('http://localhost:3001/api/xml/read', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Erro na requisição:', response.statusText);
        return;
      }

      const result = await response.json();
      setXmlData(result);

      console.log('XmlReader Dados recebidos:', xmlData);

      setShowXmlDataPage(true);
      setTimeout(() => {
        navigate('/xml-data', { state: { xmlData: result } });
      }, 0);
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
    }
  };

  return (
    <div>
      <h1>XmlReader Page</h1>
      {showXmlDataPage ? (
        <XmlDataPage xmlData={xmlData} />
      ) : (
        <>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {xmlData && <pre>{xmlData}</pre>}
        </>
      )}
    </div>
  );
}

export default XmlReader;
