import React, { useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import apiList from '../liberary/apiList';
function AssessmentSettings() {
  const {state} = useLocation();
  const [selectedQuestionType, setSelectedQuestionType] = useState('');

  const handleCheckboxClick = (type) => {
    setSelectedQuestionType(type);
  };
  const[Tab,setTab]=useState("")
  const[assessmentTabs,setassessmentTabs]=useState("")
  const useData2 = {
    Tab:Tab,
    assessmentTabs:assessmentTabs
  };
  const onSubmitForm3 = async (e) => {
    e.preventDefault();
  
    try {
      // Make sure useData2 has the category property
      const {Tab, assessmentTabs } = useData2;
  
  
      // Make a POST request to your server endpoint for posting question data
      const response = await fetch(`${apiList.assessmentsettings}/${state}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          Tab,
           assessmentTabs,
        }),
      });
  
      if (response.ok) {
        console.log('Question data posted successfully');
      } else {
        console.error('Failed to post question data');
      }
    } catch (error) {
      console.error('Internal server error:', error);
    }
  };
  const renderTable = () => {
    switch (selectedQuestionType) {
      case 'Enable':
        return (
          <div>
            <p>How many tab switches you want to allow before Terminating</p>
            <p>Show Warning on Tab Switch</p>
            <div className='container'>
              <div className='row'>
                <div className='col-12 col-md-2'>
                <p> <input type='radio' className='mx-3' name="Tab"
                                        value="Yes"
                                        onChange={(e) => setTab(e.target.value)}/>Yes</p>
                </div>
                <div className='col-12 col-md-2'>
                <p ><input type='radio'  className='mx-3' name="Tab"
                                        value="No"
                                        onChange={(e) => setTab(e.target.value)}/>No</p>
                </div>
              </div>
            </div>
         
            
          </div>
        );
      case 'Restrict':
        return (
          <div>
            <p>Show Warning on Tab Switch</p>
            <input type='radio' name="Tab"
                                        value="Yes"
                                        onChange={(e) => setTab(e.target.value)}/><p>Yes</p>
            <input type='radio'name="Tab"
                                        value="No"
                                        onChange={(e) => setTab(e.target.value)} /><p>No</p>
          </div>
        );
      // Add cases for 'Coding' and 'Speaking' if needed
      default:
        return null;
    }
  };

  return (
    <div>
      <h6 className='mt-3'>Assessmentsettings</h6>
      <p className='mt-3'>Proctoring</p>
      <div>
        <input
          type='checkbox'
          onClick={() => handleCheckboxClick('Enable')}
          checked={selectedQuestionType === 'Enable'}
        /> <span className='mx-3'>Enable Proctoring</span><br />
        <input
          type='checkbox'
          onClick={() => handleCheckboxClick('Restrict')}
          checked={selectedQuestionType === 'Restrict'}
        /> <span className='mx-3'>Restrict Browser Tab Switching</span>
      </div>
      {renderTable()}

      <div>
        <p className='mt-4'>Allow the Assessment to be taken on?</p>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-md-3'>
              <input type='checkbox'name="assessmentTabs"
                                        value="On Desktop/Laptop"
                                        onChange={(e) => setassessmentTabs(e.target.value)} /> <span className='mx-2'>On Desktop/Laptop</span>
            </div>
            <div className='col-12 col-md-3'>

              <input type='checkbox' name="assessmentTabs"
                                        value="On Tablet"
                                        onChange={(e) => setassessmentTabs(e.target.value)}/> <span className='mx-2'>On Tablet</span>
            </div>
            <div className='col-12 col-md-3'>
              <input type='checkbox' name="assessmentTabs"
                                        value="On Mobile"
                                        onChange={(e) => setassessmentTabs(e.target.value)}/> <span className='mx-2'>On Mobile</span>
            </div>
          </div>

        </div>


      </div>
      <div className="d-flex flex-row  justify-content-center">
                            <button className="creat12 mt-3" onClick={onSubmitForm3}>Continue</button>
                            </div>
    </div>
  );
}

export default AssessmentSettings;
