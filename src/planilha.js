import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [connectionState, setConnectionState] = useState('');

  // Função para carregar o arquivo Excel
  const loadSpreadsheet = async () => {
    const response = await fetch('/dados.xlsx'); // Substitua com o caminho do arquivo salvo na pasta public
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    // Considera que os dados estão na primeira planilha (Sheet1)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Define os dados no estado
    setData(jsonData);
  };

  // Função para salvar as alterações de volta no arquivo Excel
  const saveSpreadsheet = async () => {
    const newData = [...data];
    newData[editRow] = [login, password, connectionState];

    const worksheet = XLSX.utils.aoa_to_sheet(newData);
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'Sheet1');

    // Cria um arquivo blob para upload
    const excelBuffer = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Criar um formData para enviar o arquivo
    const formData = new FormData();
    formData.append('file', blob, 'dados.xlsx');

    try {
      // Envia o arquivo para o backend
      await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Arquivo salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o arquivo:', error);
    }
  };

  const handleEdit = (rowIndex) => {
    setEditRow(rowIndex);
    const row = data[rowIndex];
    setLogin(row[0]);
    setPassword(row[1]);
    setConnectionState(row[2]);
  };

  const handleSave = () => {
    const newData = [...data];
    newData[editRow] = [login, password, connectionState];
    setData(newData);
    setEditRow(null);
  };

  return (
    <div>
      <h1>Excel Spreadsheet Editor</h1>
      <button onClick={loadSpreadsheet}>Load Spreadsheet</button>

      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Login</th>
              <th>Password</th>
              <th>Connection State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {editRow === index ? (
                  <>
                    <td><input value={login} onChange={(e) => setLogin(e.target.value)} /></td>
                    <td><input value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                    <td><input value={connectionState} onChange={(e) => setConnectionState(e.target.value)} /></td>
                    <td><button onClick={handleSave}>Save</button></td>
                  </>
                ) : (
                  <>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td><button onClick={() => handleEdit(index)}>Edit</button></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {data.length > 0 && <button onClick={saveSpreadsheet}>Save to Server</button>}
    </div>
  );
};

export default App;