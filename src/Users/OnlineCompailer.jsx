import React, { useState } from "react";
import axios from "axios";
import apiList from "../liberary/apiList";

function OnlineCompailer() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [status, setStatus] =useState("");
  const [jobId, setJobId] =useState("");
  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };
    try {
      setJobId(" ");
      setStatus(" ");
      setOutput(" ");
      const { data } = await axios.post(`${apiList.UserCompilerRun}`, payload);
      console.log(data);
      setJobId(data.jobId);
      let intervalId;

 intervalId= setInterval(async () => {
        const { data: dataRes } = await axios.get(
          `${apiList.UserCompilerStatus}`,
          { params: { id: data.jobId } }
        );
        const { success, job, error } = dataRes;
        console.log(dataRes);
      if(success) {
        const {status: jobStatus, output: jobOutput} = job;
        setStatus(jobStatus);
        if(jobStatus === "pending") return;
        setOutput(jobOutput)
        clearInterval(intervalId);
        } else {
          setStatus("Error : Please retry!")
          console.error(error)
          clearInterval(intervalId);
          setOutput(error)
        }
        console.log(dataRes);
      }, 1000);
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      } else {
        setOutput("Error Connecting To Server!");
      }
    }
  };
  return (
    <div>
      <h3>Online Code Compiler</h3>
      <div className="">
        <label htmlFor="">Language : </label>
        <select
          className="mx-2"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="Java">Java</option>
        </select>
      </div>
      <br />
      <textarea
        name=""
        className="mx-3"
        id=""
        cols="70"
        rows="10"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{status}</p>
      <p>{jobId && `JobId: ${jobId}`}</p>
      <p>{output}</p>
    </div>
  );
}

export default OnlineCompailer;



// import React, { useState } from 'react';
// import axios from 'axios';

// function OnlineCompailer() {
//   const [code, setCode] = useState('');
//   const [output, setOutput] = useState('');

//   const runCode = async () => {
//     try {
//       const response = await axios.post('http://localhost:4010/run', { code });
//       setOutput(response.data.output);
//     } catch (error) {
//       console.error('Error:', error.response.data.error);
//       setOutput(`Error: ${error.response.data.error}`);
//     }
//   };

//   return (
//     <div>
//       <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={15} cols={80}/><br />
//       <button onClick={runCode}>Run Code</button>
//       <div>
//         <h3>Output:</h3>
//         <pre>{output}</pre>
//       </div>
//     </div>
//   );
// }

// export default OnlineCompailer;