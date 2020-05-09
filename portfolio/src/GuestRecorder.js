import React, {useEffect, useState} from 'react';
import './GuestBook.css'
import config from './config.js'

const firebase = require('firebase');

function GuestRecorder(props) {
    const [data, setData] = useState([])
    const [shouldRender, setShouldRender] = useState(true)
    var dataSet = []

    console.log(props.info)

    var info = props.info

    // if (info !== "")
    // {
    //     updateBook();
    // }
    //

    // 1. Retrieve Data & Submit Data -- on retrieve always (2)
    // 2. Render GuestBook
    // 3. Render GuestForm -- onSubmit always pass into (1)
    //

    // @TODO submit data to firebase
    function updateBook()
    {
        console.log("updateBook");
        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }
        var test = {name:"Ying", message: "yur", anon: false}
        var jsonBody = JSON.stringify(test);
        // Send Data to Firebase
        firebase.database().ref('GuestBook').push().set(jsonBody)
        // setShouldRender(!shouldRender) //-- run when submitting to form

        info = "";

    }


    // callback function for useEffect
    // basically runs the callback when shouldRender changes
    useEffect(() => {

        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }

        //get a reference to the database
        let ref = firebase.database().ref('GuestBook')

        dataSet = [];

        //retrieve its data
        ref.on('value', snapshot => {
             //this is your call back function
        		 //state will be a JSON object after this
             //set your apps state to contain this data however you like
             // const state = snapshot.val()
             snapshot.forEach(function (childSnapshot) {
                 console.log(childSnapshot.val().anon);
                 if (childSnapshot.val().anon === false)
                 {
                     dataSet.push(childSnapshot.val());
                 }
             });
             console.log(dataSet);
             setData(dataSet);
        })

    }, [shouldRender]) // only run once when shouldRender changes

    return (
        <div className="guest-book-display">
        {
            data.map((item, index) => (
                <div key={item} className="guest-book-content">
                    <h3 className="guest-book-name">{item.name} <br></br>{item.bio}</h3>
                    <p key = {index} className="guest-book-body">
                            {item.message}</p>
                </div>

            ))
        }
        </div>
    )

}

export default GuestRecorder;