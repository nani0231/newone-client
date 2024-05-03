import React, { useState } from 'react';
import axios from 'axios';
import apiList from '../liberary/apiList';

function Ccc() {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [result, setResult] = useState('');
  
    const executeCode = async () => {
      try {
        const response = await axios.post(`${apiList.execute}`, {
          code,
          language,
        });
        setResult(response.data.result);
      } catch (error) {
        console.error('Error executing code:', error.message);
      }
    };
  
    return (
      <div>
        <h1>Online Compiler</h1>
        <div>
          <label>
            Language:
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="javascript">JavaScript</option>
              {/* Add other language options as needed */}
            </select>
          </label>
        </div>
        <div>
          <label>
            Code:
            <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={10} cols={50} />
          </label>
        </div>
        <div>
          <button onClick={executeCode}>Execute Code</button>
        </div>
        <div>
          <h2>Result:</h2>
          <pre>{result}</pre>
        </div>
      </div>
    );
   
}

export default Ccc;
