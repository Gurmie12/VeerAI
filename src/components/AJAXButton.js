import React, { useState, useEffect } from 'react';
import '../css/ajax.css';
import { render } from '@testing-library/react';

function AJAXButton(){
    //React Hooks that store the API data
    const [apiData, setApiData] = useState('');


    //Function that handles the click of the fetch button and retrieves API data through AJAX
    const handleClick = (e) =>{
        e.preventDefault();

        //Create the XHR object
        const xhr = new XMLHttpRequest();

        //Specify request and API endpoint and state synchnorosity
        xhr.open('GET', 'https://api.thevirustracker.com/free-api?global=stats', true);

        //On the GET request proccess the data but check for the status from API
        xhr.onload = () =>{
            if(xhr.status === 200){
                
                //Set the parsed JSON data to a variable
                let data = (JSON.parse(xhr.responseText).results)[0];
                
                //Set data to React Hook and render a successful alert
                setApiData(data);
                renderAlert('AJAX successfuly fetched API, Data can be seen below!', 'alert-success');
            }else{
                renderAlert('The Status of the AJAX Request was ' + xhr.status + '. Try again!', 'alert-danger');
            }   
        }

        //Finalize the AJAX request
        xhr.send();
    };

    //Function that handles dispaly of alerts
    function renderAlert(message, className){

        //Set Dom vairables for where the alert will be placed and create a new alert component
        const body = document.getElementById('body');
        const title = document.getElementById('ajax-title');
        const alert = document.createElement('div');
        alert.id = "alert";
        alert.className = "alert center-text " + className;
        alert.appendChild(document.createTextNode(message));

        //Check that an alert is not already displayed
        if(document.getElementById("alert")){
            document.getElementById('alert').remove();
            body.insertBefore(alert, title);
            setTimeout(() =>{
            alert.remove();
            }, 3000);
        }else{
            body.insertBefore(alert, title);
            setTimeout(() =>{
            alert.remove();
            }, 3000);
        }
    };


    //Pointer function that renders the fetched data from the coronavirus API to the body
    const renderAPI = () =>{

        //Create DOM object for display list
        const dataArea = document.getElementById('data');

        if(apiData === ""){
            dataArea.innerHTML = "<p className='lead'>No AJAX Fetch Has Been Made Yet!</p>";
        }else{
              //Retreive all unique keys from return object of API
            const keys = Object.keys(apiData);

            //Loop through each key and append the list item to the innerHTML variable
            let innherHtml = "";
            keys.map((key,i) =>{
                if(key !== "source"){
                    innherHtml+= `
                    <p className="lead" key=${i}>${key}: <strong>${apiData[key]}</strong></p>
                `
                }
            })

            //Append the innerHTML as a child of the list
            dataArea.innerHTML = innherHtml;
        }
    };

    //Life cycle method that calls everytime the data hook changes (every AJAX call)
    useEffect(() =>{
        renderAPI();
    }, [renderAPI]);


    return(
        <div className="ajax-body">
            <div className="container text-center" id="body">
                <h1 className="display-4 mt-3 mb-3" id="ajax-title">AJAX API Fetch (Coronavirus API)</h1>
                <br/>
                <br/>

                <button className="btn btn-success mb-5" onClick={e => handleClick(e)}>Fetch!</button>

                <h3 className="mb-3" id="data-title">Here is the Retrieved Data!</h3>
                <div className="container text-center" id="data">
 
                </div>
            </div>
        </div>
    )
}

export default AJAXButton;