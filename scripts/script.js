/***** Radio Button Events *****/

/** The following is for the radio buttons for the color of the product **/
const color1 = document.querySelector("#color_1");
const color2 = document.querySelector("#color_2");
const image = document.querySelector(".js-product");
const productName = document.querySelectorAll(".product-name");

// for the product size
const size1 = document.querySelector("#size_1").value;


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

color1.addEventListener('click', () => { changeColor(color1); }, false);
color2.addEventListener('click', () => { changeColor(color2); }, false);


/***** Form Validation *****/

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
        // Consider removing
        /*
        if (this.type == 'text' && this.input.id !="zip-code" && !this.input.value.match(/[A-Z]/g)) {
            this.addError('Must have at least one uppercase letter');
        }
        */
        if ((this.input.id === "address_1" || this.input.id === "city") &&
            !this.input.value.match(/[a-z]/g)) {
            this.addError('Must have at least one lowercase letter');
        }
        
        if (this.input.id === "address_1" && !this.input.value.match(/[0-9]/g)) {
            this.addError('Must have at least one number');    
        }
        
        if (this.input.id == "zip-code" && !this.input.value.match(/(^\d{5}(?:[-\s]\d{4})?$)/)) {
            this.addError('Must be a 5 or 9 digit zipcode');
        } 
        
        // Check for blanks
        if (this.input.value === "") {
            this.addError('Please do not leave this blank');
        } 
        
        return this.errors;        
    }
}

/* input fields */
const submit = document.querySelector('button');
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');
const addressField = document.querySelector('#address_1');
const address2Field = document.querySelector('#address_2');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
const zipCodeField = document.querySelector('#zip-code');
const countryField = document.querySelector('#country');
const fieldArray = [nameField, emailField, addressField, cityField, stateField,
                    zipCodeField];


// Validate input on submit function
function submitEvent(event) {
    event.preventDefault();
    let errors = document.querySelectorAll('.error');
    
    // if there is at least one error, clear all
    if (errors[0]) {
        errors.forEach( function(err) {
            err.remove();
        });
    }
    
    // Create an instance of the CheckValidity class for each input except Country
    let validateName = new CheckValidity(nameField, 'text');
    let validateEmail = new CheckValidity(emailField, 'email');
    let validateAddress = new CheckValidity(addressField, 'text');
    let validateCity = new CheckValidity(cityField, 'text');
    let validateState = new CheckValidity(stateField, 'text');
    let validateZipCode = new CheckValidity(zipCodeField, 'text');
    
    const validateArray = [validateName, validateEmail, validateAddress, 
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
            });
        }
        
        else {
            // If the input field passes validation, add to counter
            counter++;
            // If all fields pass validation, show completed order
            if (counter === validateArray.length) {
                
                // show completed screen
                showCompletion();
            }
        }
    }
}


// On submit event validate all input before continuing
submit.addEventListener('click', submitEvent, false);


/***** Shipping Summary Event *****/

// Event Listeners for input fields
nameField.addEventListener('keyup', typeAddress, false);
addressField.addEventListener('keyup', typeAddress, false);
address2Field.addEventListener('keyup', typeAddress, false);
cityField.addEventListener('keyup', typeAddress, false);
stateField.addEventListener('keyup', typeAddress, false);
zipCodeField.addEventListener('keyup', typeAddress, false);

// Only show country if user changes the selected option
countryField.addEventListener('change', function() { country.textContent = countryField.value; });


// Function to update address field as user types
function typeAddress(event) {
    const key = event.key;
    // <p> ids in Order Summary shipping address are the same as in Shipping Details <input>
    //  but prefixed with "js-"
    const id = "#js-" + event.target.id;
    const field = document.querySelector(id);

    // Update summary text
    field.textContent = event.target.value;
}


/***** On successful validation, show completed screen *****/

/* for the sections to later hide them on successful validation */
const productSection = document.querySelector(".product");
const shippingSection = document.querySelector(".shipping-details");
const summarySection = document.querySelector(".order-summary");


/* to insert content when order is completed */
const form = document.querySelector("form");
const price = document.querySelector(".price").textContent;
const shippingPrice = document.querySelector(".shipping-cost").textContent;
const total = document.querySelector(".total-price").textContent;


// first hide the existing sections
function showCompletion() {  
    productSection.classList.add("hidden");
    shippingSection.classList.add("hidden");
    summarySection.classList.add("hidden");
    
    // use user input to show results
    let content = "<article class='complete' role='article'>";
    
    content += "<h1>Order Completed</h1>";
    content += "<h2>Order Summary</h2>";
    
    content += "<div class='name-price'>";
    content += "<p class='product-name'>" + productName[0].textContent + "</p>";
    content += "<p class='price'>" + price + "</p>";
    content += "</div><hr>";
    
    content += "<div class='shipping'>";
    content += "<p>Shipping</p>";
    content += "<p class='shipping-cost'>" + shippingPrice + "</p>";
    content += "</div>";
    
    content += "<div class='total'>";
    content += "<p><strong>Total</strong></p>";
    content += "<p class='total-price'><strong>" + total + "</strong></p>";
    content += "</div><hr>";
    
    content += "<h2>Shipping Address</h2>";
    content += "<address class='address'>";
    content += "<p id='js-name'>" + nameField.value + "</p>";
    
    content += "<div class='address-row'>";
    content += "<p id='js-address'>" + addressField.value + "</p>";
    content += "<p id='js-address2'>" + address2Field.value + "</p>";
    content += "</div>";

    content += "<div class='address-row'>";
    content += "<p id='js-city'>" + cityField.value + "</p>";
    content += "<p id='js-state'>" + stateField.value + "</p>";
    content += "<p id='js-zip'>" + zipCodeField.value + "</p>";
    content += "</div>";
    
    content += "<p id='js-country'>" + countryField.value + "</p>";  
    content += "</address>";
    
    content += "<img src='images/circle-check.svg' alt='Order Success'>";
    content += "</article>";
    
    
    form.insertAdjacentHTML('afterend', content);
}













