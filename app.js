// use "npm init -y" to open a josn file
//Next we use "npm i express" to add express to the project
//now we can start the file. start by including express
const express = require('express')
//now we will call express and save it as a const variable
const app = express();
//import the util.js file and the function we want to use here
const { updateElement, getIndexById, getElementById, createElement } = require('./utils');
//now we need a port - declare a vairable to process the enviornment for the port then give it a number
const PORT = process.env.PORT || 8080;
//this line references the public subfolder to run the index.html
app.use(express.static('Public'));
//at this point we need to have a goal in mind to continue
//we will use this to navigate multiple pages on a website so this firt get function will pull the homepage
app.get('/', (req, res, next) => {
    console.log('This is used for debugging and makings sure this get function was called');
    // now we can add a res.send() function to determien what we send back.
    //this get function is the default for teh homepage so we really dont need anything
    // res.status(404).send(); is an error send method norammly used as an else statement for when thinsg dont work
});
app.get('/pathArray', (req, res, next) => {
    //respond and send the array that is request
    res.send(pathArray);
});
app.get('/pathArray:id', (req, res, next) => {
    //respond and send the element of the array that is request
    //req.params.id will parse the id from the request that is sent to the server. we can use this as a variable in this function
    //we use the getElementById function from our utils file to simplify the process
    //it will take the req.params.id and the array and return the elemnt that matches the id[I think]
    const requestedElement = getElementById(req.params.id, pathArray);
    //ensure the requestedElement is valid
    if (requestedElement) {
        //now send it back because we know it is valid
        res.send(requestedElement);
      } else {
          //on the off chance it is invalid for whatever reason, raise a 404 error
        res.status(404).send();
      }
});
//put is the update function path
//here we will take teh path:id and replace it withthe input
app.put('/pathArray/:id', (req, res, next) => {
    //first we need to take the incoming req and find the index of teh array it is apart of -> then save as a variable
    const pathArrayIndex = getIndexById(req.params.id, pathArray);
    if (expressionIndex !== -1) {
        //this function is the important one. it will take the input and update it to the 
        //element of the array efectively doing all of the work
        updateElement(req.params.id, req.query, pathArray);
        //dont forget the add teh index for the array before we accidentaly return the whole array
        res.send(pathArray[pathArrayIndex]);
      } else {
        res.status(404).send();
      }
});
//this is where we can create new content for the page
app.post('/pathArray', (req, res, next) => {
    //first we take in the data and let express parse the info for us.
    //We will use the createElement which we took from codecademy and is based off of the expressions
    //update this when you understand the function behind createElement
    const recievedPathArray = createElement(pathArray, req.query);
    //now we do our if and else statements to determine what to send back based on what we recieved.
    if(recievedPathArray){
        //here we push the recieved info to the end of the array
        pathArray.push(receivedErecievedPathArrayxpression);
        //now it is added to the array, we only want to send the more recent item
        res.status(201).send(recievedPathArray);
      }
      else {
        res.status(400).send();
      }
});

app.delete('/pathArray/:id', (req, res, next) => {
    //first get the index from the req.params.id and find it in the pathArray
    const pathArrayIndex = getIndexById(req.params.id, pathArray);
    if(pathArrayIndex !== -1){
        //splice out the index and only the index we found
        pathArray.splice(pathArrayIndex, 1);
        //Servers often send a 204 No Content status code if deletion occurs without error.
        res.status(204).send();
    } else{
        res.status(404).send('Unable to find the request.');
    }
});


//now let us set up the listen 'function' which will stay at the end of teh file. add everything else above this line
app.listen(PORT, () => {
    //add a console log for making sure it works and other development/bug fixing
    console.log('Port is running on 8080.')
});