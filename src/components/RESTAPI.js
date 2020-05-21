import React, { useState } from 'react';
import '../App.css';


function REST() {

  //Declare react hooks to dynamically render response from REST API and handles changes to input
  const[apiResponse, setApiResponse] = useState("No Request Has Been Sent To REST API Yet");
  const[paramString, setParamString] = useState('');


  //Function that handles clicking of the submit button
  //Handles form, if the input is empty, returns an error and shows a display
  //Fetches the API with the query string param attatched and waits for the promise and response
  //JSON parses the response and sets the Hook accordingly
  const handleSubmit = (e) =>{
    const input = document.getElementById('param-input');
    e.preventDefault()
    if(paramString === ""){
      renderAlert('Please Fill out the param input below!', 'alert-danger');
    }else{
      fetch(`http://localhost:3001/paramchecker/${paramString}`)
      .then(res => res.json())
        .then(data =>{
          if(data.res === false){
            setApiResponse("FALSE");
          }else{
            setApiResponse("TRUE");
          }

          //Reset the input value and show a successful alert
          input.value = "";
          renderAlert('REST API Fetch Successful, check below for results', 'alert-success');
        })
        .catch(err =>{
          renderAlert(err, 'alert-danger');
        })
      .catch(err =>{
        renderAlert(err, 'alert-danger');
      })
    }
  };


  //Function that handles dispaly of alerts
  function renderAlert(message, className){

    //Set Dom vairables for where the alert will be placed and create a new alert component
    const inputDiv = document.getElementById('input-div');
    const inputForm = document.getElementById('param-form');
    const alert = document.createElement('div');
    alert.id = "alert";
    alert.className = "alert center-text " + className;
    alert.appendChild(document.createTextNode(message));

    //Check that an alert is not already displayed
    if(document.getElementById("alert")){
        document.getElementById('alert').remove();
        inputDiv.insertBefore(alert, inputForm);
        setTimeout(() =>{
          alert.remove();
        }, 3000);
    }else{
        inputDiv.insertBefore(alert, inputForm);
        setTimeout(() =>{
          alert.remove();
        }, 3000);
    }
  };

  return (
    <div className="body">
      <div className="container text-center">


        <h1 className="display-4 mb-5" id="home-title">Type A Parameter Below to Test The REST API</h1>
        <br/>
        <br/>
        <div className="card bg-dark">
          <div className="card-body text-center justify-content-center mt-3 mb-3" id="input-div">
            <form id="param-form">
              <div className="form-group">
                <label for="param-input" id="input-label">Param String</label>
                <input id="param-input" className="form-control mt-2" type="text" placeholder="e.g. Apple, Car, ABC, etc." onChange={e => setParamString(e.target.value)}></input>
              </div>
              <button className="btn btn-success mt-2" onClick={e => handleSubmit(e)}>Submit Request!</button>
            </form>
          </div>
        </div>
        <br/>
        <br/>


        <p className="lead mt-5" id="response-title">Response From REST API</p>
        <div>
          <h3>{apiResponse}</h3>
        </div>

      </div>
    </div>
  );
}

export default REST;
