// for the size
const size1 = document.querySelector("#size_1").value;

/** The following is for the radio buttons for the color of the product **/
const color1 = document.querySelector("#color_1");
const color2 = document.querySelector("#color_2");
const image = document.querySelector(".js-product");
const productName = document.querySelectorAll(".product-name");


// Change image of product based on user selected color
function changeColor(color) {
    if (color == color1 && image.getAttribute('src') == "images/star-wars-2369316_640.jpg") {
        image.src = "images/star-wars-2908139_640.jpg";
        productName[0].innerHTML = "Light Saber " + size1 + " " + color1.value;
        productName[1].innerHTML = "Light Saber " + size1 + " " + color1.value;
    }
    else if (color == color2 && image.getAttribute('src') == "images/star-wars-2908139_640.jpg") {
        image.src = "images/star-wars-2369316_640.jpg";
        productName[0].innerHTML = "Light Saber " + size1 + " " + color2.value;
        productName[1].innerHTML = "Light Saber " + size1 + " " + color2.value;
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
const address2Field = document.querySelector('#address_2');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
const zipCodeField = document.querySelector('#zip-code');
const countryField = document.querySelector('#country');
const fieldArray = [nameField, emailField, addressField, address2Field, cityField, stateField,
                    zipCodeField];


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
    let validateAddress2 = new CheckValidity(address2Field, 'text');
    let validateCity = new CheckValidity(cityField, 'text');
    let validateState = new CheckValidity(stateField, 'text');
    let validateZipCode = new CheckValidity(zipCodeField, 'text');
    
    const validateArray = [validateName, validateEmail, validateAddress, validateAddress2,
                           validateCity, validateState, validateZipCode];
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

// Order Summary Shipping Address Fields
const name = document.querySelector("#js-name");
const address1 = document.querySelector("#js-address");
const address2 = document.querySelector("#js-address2");
const city = document.querySelector("#js-city");
const state = document.querySelector("#js-state");
const zip = document.querySelector('#js-zip');
const country = document.querySelector('#js-country');


// Event Listeners for input fields
nameField.addEventListener('keyup', function(e) {typeAddress(e, name);}, false);
addressField.addEventListener('keyup', function(e) {typeAddress(e, address1);}, false);
address2Field.addEventListener('keyup', function(e) {typeAddress(e, address2);}, false);
cityField.addEventListener('keyup', function(e) {typeAddress(e, city);}, false);
stateField.addEventListener('keyup', function(e) {typeAddress(e, state);}, false);
zipCodeField.addEventListener('keyup', function(e) {typeAddress(e, zip);}, false);

// Only show country if user changes the selected option
countryField.addEventListener('change', function() { country.textContent = countryField.value; });


// Function to update address field as user types
function typeAddress(event, field) {
    const key = event.key;

    if (key.length === 1) {
        field.textContent += key;
    } else if (event.keyCode == 8) {
        field.textContent = field.textContent.slice(0, -1);
    }
}















