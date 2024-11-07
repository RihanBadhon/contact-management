'use strict';

class Contact {
  constructor(name, city, email) {
    this._name = name;
    this._city = city;
    this._email = email;
  }
  // Private value
  get name() {         
    return this._name;
  }

  get city() {         
    return this._city;
  }

  get email() {        
    return this._email;
  }
}

const contactList = []; // Initialized an empty array

function addContact() {
  let contactInfo = document.getElementById("contact-info").value.trim();
  let [name, city, email] = contactInfo.split(",");
  let input = document.getElementById("input")
  // I can reassign these variables later in the function if needed
 
  if (contactList.length >= 12) {  // This operator checks if 'contactList.length'
    return;                       // is greater than or equal to 12
  }   

  if (!name || !city || !email) {  // This if statement with a logical '||' condition
    input.innerText = "Please Enter Name, City, and Email.";
    return;
  }

  if (!email.includes("@")) {     // This code checks if the email string 
                                  // contains an "@" symbol, which is a basic 
                                  // check for validating an email address.
                                  // check for validating an email address.
    input.innerText = "Please enter a valid email.";
    return;
  }

  const contact = new Contact(name, city, email);
  contactList.unshift(contact);
  listContacts();
  updateCount();

  const inputField = document.getElementById("contact-info");
  inputField.value = "";
  inputField.placeholder = "Contact info (name, city, email)";
}

function deleteContact(index) {
  if (index >= 0 && index < contactList.length) {
    contactList.splice(index, 1);
    listContacts();
    updateCount();
  }
}

function listContacts() {
  const contactListDiv = document.querySelector(".contact-list");
  contactListDiv.innerHTML = "";
    

  for (let i = 0; i < contactList.length; i++) {
    const contact = contactList[i];

    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact");

    const contactP = document.createElement("p");
    contactP.textContent = `Name: ${contact.name}, City: ${contact.city}, Email: ${contact.email}`;
    /* 
      This line above is setting the text content of a <p> element (contactP) to a 
      string that contains the values of a contact's name, city, and email, 
      which are stored in the contact object. It uses template literals to dynamically
      insert the values of those properties into the string.

      also prints the output in a single paragraph

    */

    contactDiv.appendChild(contactP);

    contactDiv.addEventListener("click", function () {
      deleteContact(i);
    });

    contactListDiv.appendChild(contactDiv);
  }
}

function updateCount() {
  let countDiv = document.getElementById("count");
  countDiv.textContent = `Number of contacts: ${contactList.length}`;
}

 const addButton = document.querySelector("button");
addButton.addEventListener("click", addContact);