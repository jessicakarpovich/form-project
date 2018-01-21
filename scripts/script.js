/** The following is for the radio buttons for the color of the product **/
const color1 = document.querySelector("#color_1");
const color2 = document.querySelector("#color_2");
const image = document.querySelector(".js-product");


// Change image of product based on user selected color
function changeColor(color) {
    if (color == color1 && image.getAttribute('src') == "images/star-wars-2369316_640.jpg") {
        image.src = "images/star-wars-2908139_640.jpg";
    }
    else if (color == color2 && image.getAttribute('src') == "images/star-wars-2908139_640.jpg") {
        image.src = "images/star-wars-2369316_640.jpg"
    }
}

color1.addEventListener('click', function() { changeColor(color1) }, false);
color2.addEventListener('click', () => { changeColor(color2) }, false);


/** Form Validation **/

// Class to check input validity
class CheckValidity {
    constructor(input, type) {
        this.input = input;
        this.type = type;
        this.errors = [];
    }
    
    addError(message) {
        this.errors.push(message);
    }
    
    getMessages() {
        const status = this.input.validity;
        
        if (status.typeMismatch) {
            this.addError('Entry does not match the field type');
        }
        
        if (status.tooLong) {
            this.addError('Entry is too long');
        }
        
        if (status.tooShort) {
            this.addError('Entry is too short');
        }
        
        // For text inputs with capital letters, not email
        if (this.type == 'text' && this.input.id !="zip-code" && !this.input.value.match(/[A-Z]/g)) {
            this.addError('Must have at least one uppercase letter');
        }
        
        if (this.input.id == "zip-code" && !this.input.value.match(/(^\d{5}(?:[-\s]\d{4})?$)/)) {
            this.addError('Must be a 5 or 9 digit zipcode');
        } 
        
        // Check for blanks
        if (this.input.value == "") {
            this.addError('Please do not leave this blank');
        } 
        
        return this.errors;        
    }
}

// input fields
const submit = document.querySelector('button');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const addressField = document.querySelector('#address_1');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
const zipCodeField = document.querySelector('#zip-code');
const fieldArray = [nameField, emailField, addressField, cityField, stateField, zipCodeField];


// On submit event validate all input before continuing
submit.addEventListener('click', submitEvent, false);


// Validate input on submit function
function submitEvent(event) {
    event.preventDefault();
    let errors = document.querySelectorAll('.error');
    
    // if there is at least one error, clear all
    if (errors[0]) {
        errors.forEach( function(a) {
            a.remove();
        })
    }
    
    // Create an instance of the CheckValidity class for each input except Country
    let validateName = new CheckValidity(nameField, 'text');
    let validateEmail = new CheckValidity(emailField, 'email');
    let validateAddress = new CheckValidity(addressField, 'text');
    let validateCity = new CheckValidity(cityField, 'text');
    let validateState = new CheckValidity(stateField, 'text');
    let validateZipCode = new CheckValidity(zipCodeField, 'text');
    
    const validateArray = [validateName, validateEmail, validateAddress, validateCity, validateState,
                           validateZipCode];
    let counter = 0;
    
    // loop through all inputs and check for errors
    for (let i = 0; i < validateArray.length; i++) {  
        // Store this classes error messages
        let errorMessages = validateArray[i].getMessages();

        
        // If there are errors,
        if (errorMessages.length > 0) {   
            
            errorMessages.forEach( (err) => {
                fieldArray[i].insertAdjacentHTML('afterend', '<p class="error">' + err + '</p>');
            })
        }
        
        else {
            // If the input field passes validation, add to counter
            counter++;
            // If all fields pass validation, show completed order
            if (counter === validateArray.length) {
                alert('It worked!');
            }
        }
    }
}



nameField.addEventListener('keypress', typeAddress, false);


// Order Summary Shipping Address Fields
const name = document.querySelector("#js-name");


function typeAddress(event) {
    const key = event.key;
    console.log(key);
    if (key.length === 1) {
        name.textContent += key;
    } else if (event.keyCode == 8) {
        name.textContent = name.textContent.slice(0, -1);
    }
}















