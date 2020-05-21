import React, {useState, useEffect} from 'react';
import '../css/contact.css';
import REST from './RESTAPI';

function Contact(){
    //Create Hooks for dynamicly changing inputs
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    //Function that handles submiting the contact form
    //Checks to see if all of the inputs are filled and then checks if a duplicate exists in the localstorage database
    //Otherwise pushes the form to the database
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(email === "" || phone === ""){ //If the fields are empty, display a warning and do not submit
            renderAlert('Please fill in all of the fields before submiting!', 'alert-danger');
        }else{ //If the fields are not empty, validate them on server side (Local Storage)

            //If the localstorage is empty, store contact without validation since no duplicates exist
            if(localStorage.getItem('Contacts') === null){

                //Create a new contacts array and an object that holds the contacts phone number and email
                let contactArr = [];
                const contactObj = {
                    phone_number: phone,
                    email_address: email
                };
                contactArr.push(contactObj);

                //Stringify the array to be stored as a key:value pair in the local storage table
                contactArr = JSON.stringify(contactArr);

                //Set the key and value and return an alert
                localStorage.setItem('Contacts', contactArr);
                renderAlert('Your Form was Succesfully submited', 'alert-success');

                //Clear hooks and form input
                document.getElementById('email-input').value = "";
                document.getElementById('phone-input').value = "";
                setEmail('');
                setPhone('');
            }else{

                //Set a variable for the current localstorage array
                let contactsArr = JSON.parse(localStorage.getItem('Contacts'));

                //Check to see if a duplicate exists
                let duplicate = contactsArr.find(contact => {

                    //Assure that all inputs and saved data are lowercase and do not contain spaces for matching purposes
                    let contact_phone = contact.phone_number.toString().replace(/\s/g, '');
                    let contact_email = contact.email_address.toLowerCase();
                    if(contact_email === email.toLowerCase() || contact_phone === phone.toString().replace(/\s/g, '')){
                        return contact;
                    }
                });

                //If no duplicate was found create an object for the contact and push it to the array
                //Finally set the localstorage to the new array and render an alert
                if(duplicate !==  undefined){
                    renderAlert('A Contact was found with the same phone number or email! Try Again!', 'alert-danger');
                }else{
                    const contactObj = {
                        phone_number: phone,
                        email_address: email
                    }
                    contactsArr.push(contactObj);

                    contactsArr = JSON.stringify(contactsArr);

                    localStorage.setItem('Contacts', contactsArr);
                    renderAlert('Your Form was Succesfully submited', 'alert-success');

                    //Clear the hooks and the form input
                    document.getElementById('email-input').value = "";
                    document.getElementById('phone-input').value = "";
                    setEmail('');
                    setPhone('');
                }
            }
        }   
    }

    //Function handeling the display of alerts
    function renderAlert(message, className){
        //Set Dom vairables for where the alert will be placed and create a new alert component
        const inputDiv = document.getElementById('contact-body');
        const inputForm = document.getElementById('contact-form');
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
    }


    return(
        <div className="contact-body">
            <div className="container text-center">
                <h1 className="display-4 mt-2" id="contact-title">Contact Form</h1>
                <br/>
                <br/>

                <div className="card bg-dark mb-5">
                    <div className="card-body text-center justify-content-center mt-3" id="contact-body">
                        <form id="contact-form">
                            <div className="form-group mb-3">
                                <label for="email-input">Email Address</label>
                                <input type="email" id="email-input" className="form-control" onChange={e => setEmail(e.target.value)}></input>
                            </div>
                            <div className="form-group mb-3">
                                <label for="phone-input">Phone Number</label>
                                <input type="phone" id="phone-input" className="form-control" onChange={e => setPhone(e.target.value)}></input>
                            </div>
                            <button className="btn btn-success" onClick={e => handleSubmit(e)}>Submit!</button>
                        </form>
                    </div>
                </div>
                <br/>
                <br/>
            </div>
        </div>
    )
}

export default Contact;