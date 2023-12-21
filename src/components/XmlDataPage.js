import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function renderData(data, parentKey = '', onChange, onAddField, onEditField, onConfirmField) {
  return Object.keys(data).map((key) => {
    const currentKey = parentKey ? `${parentKey}.${key}` : key;
    const value = data[key];
    const currentKeySplited = currentKey.split('.');
    const currentKeyLabel = currentKeySplited[currentKeySplited.length - 1];

    if (typeof value === 'object') {
      // If the value is an object, recursively call renderData
      return (
        <div key={currentKey}>
          {currentKeyLabel !== '0' && currentKeyLabel !== '$' && (
            <strong>{currentKeyLabel}:</strong>
          )}

          <div style={{ marginLeft: '20px' }}>
            {renderData(value, currentKey, onChange, onAddField, onEditField, onConfirmField)}
            <button onClick={() => onAddField(currentKey)}>Adicionar Campo</button>
          </div>
        </div>
      );
    } else {
      // If the value is not an object, display it with an input field for editing
      return (
        <div key={currentKey}>
          {currentKeyLabel && currentKeyLabel !== '0' && <span>{currentKeyLabel}:</span>}
          {typeof value === 'object' ? (
            <div>
              <button onClick={() => onEditField(currentKey)}>Editar Nome</button>
              {renderData(value, currentKey, onChange, onAddField, onEditField, onConfirmField)}
            </div>
          ) : (
            <>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(currentKey, e.target.value)}
              />
              <button onClick={() => onAddField(currentKey)}>Adicionar Campo</button>
            </>
          )}
        </div>
      );
    }
  });
}

function XmlDataPage() {
  const location = useLocation();
  const [editedData, setEditedData] = useState(null);
  const [newKey, setNewKey] = useState('');

  useEffect(() => {
    if (location.state && location.state.xmlData) {
      // Set editedData only when xmlData is available in location.state
      setEditedData(location.state.xmlData);
    }
  }, [location.state]);

  const handleInputChange = (key, value) => {
    // Update the editedData state when an input field changes
    setEditedData((prevData) => {
      const newData = { ...prevData };
      const keys = key.split('.');
      let currentObject = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        currentObject = currentObject[keys[i]];
      }

      currentObject[keys[keys.length - 1]] = value;

      return newData;
    });
  };

  const handleAddField = (parentKey) => {
    // Abre um prompt para inserir o nome do novo campo
    const newKey = prompt('Digite o nome do novo campo:');
    if (newKey !== null) {
      setNewKey(newKey);
    }
  };

  const handleEditField = (parentKey) => {
    setEditedData((prevData) => {
      const newData = { ...prevData };
      const keys = parentKey.split('.');
      let currentObject = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        currentObject = currentObject[keys[i]];
      }

      // Abre um prompt para editar o nome do campo
      const newKey = prompt('Digite o novo nome do campo:', currentObject[keys[keys.length - 1]]);
      if (newKey !== null) {
        currentObject[newKey] = currentObject[keys[keys.length - 1]];
        delete currentObject[keys[keys.length - 1]];
      }

      return newData;
    });
  };

  const handleConfirmField = (parentKey, newKey) => {
    setEditedData((prevData) => {
      const newData = { ...prevData };
      const keys = parentKey.split('.');
      let currentObject = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        currentObject = currentObject[keys[i]];
      }

      currentObject[newKey] = '';

      return newData;
    });
    setNewKey('');
  };

  const sendDataToBackend = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/xml/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ editedData, newKey }),
      });
  
      if (!response.ok) {
        console.error('Error saving data:', response.statusText);
        return;
      }
  
      // Verifica se o tipo de conteúdo da resposta é 'application/xml'
      const contentType = response.headers.get('content-type');
      console.log('contentType', contentType)
      if (contentType && (contentType.includes('application/xml') || contentType.includes('text/xml'))) {
        // Inicia o download do arquivo XML
        console.log('response', response);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'updated.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
  
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };
  
  const handleSaveChanges = () => {
    // Implement logic to send editedData back to the backend for saving
    console.log('Saving changes:', editedData, newKey);
    sendDataToBackend();
  };

  return (
    <div>
      <h1>XmlDataPage</h1>
      {editedData && renderData(editedData, '', handleInputChange, handleAddField, handleEditField, handleConfirmField)}
      {newKey && (
        <div>
          <span>{newKey}:</span>
          <input
            type="text"
            value=""
            onChange={(e) => handleConfirmField('', newKey, e.target.value)}
          />
        </div>
      )}
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
}

export default XmlDataPage;
