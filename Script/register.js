import {saveEmployeeData, employees, newEmployees, saveNewEmpData} from "./retrieve_user.js";
import { employee } from "./user.js";
import { validAddress, validEmail, validName, validAge, generateRandomNumber, isUniquePassword, isUniqueEmail, isUniqueUsername } from './functionality.js'

window.addEventListener('load', function() {
    let firstname = document.getElementById("firstname");
    let lastname = document.getElementById("lastname");
    let address = document.getElementById("address");
    let email = document.getElementById("email");
    let age = document.getElementById("age");

    validInput(firstname, validName);
    validInput(lastname, validName);
    validInput(address, validAddress);
    validInput(email, validEmail);
    validInput(age, validAge);

    document.forms[0].addEventListener('submit', function(event) {

        if(!validName(firstname.value) || !validName(lastname.value) || !validAddress(address.value) || !validEmail(email.value) || !validAge(age.value) || !isUniqueEmail(email.value, email))
            event.preventDefault();
        else {
            event.preventDefault();
            let randomUsername;
            do{
                randomUsername = `${firstname.value}${lastname.value}${generateRandomNumber(900, 100)}`;
            }while(!isUniqueUsername(randomUsername));
            let randomPassword;
            do{
                randomPassword = `${generateRandomNumber(10000000, 99999999)}`;
            }while(!isUniquePassword(randomPassword));

            let newid = newId();

            newEmployees.push(new employee(convertIntoObject(firstname.value, lastname.value, address.value, email.value, age.value, randomUsername, randomPassword, false, newid)));
            saveNewEmpData(newEmployees);
 
            setTimeout('location.replace("../HTML/waiting.html")', 500);
        }
    })

})


function validInput(inputname, isvalid) {
    inputname.addEventListener('blur', function() {
        if(inputname.id=="email") {
            if(!isUniqueEmail(employees, inputname.value, -1) || !isUniqueEmail(newEmployees, inputname.value, -1)) {
                inputname.nextElementSibling.textContent = "Exist Email"
                if(!inputname.classList.contains("is-invalid")) inputname.classList.add("is-invalid");
            }
            else if(!isvalid(inputname.value)) {
                inputname.nextElementSibling.textContent = "Invalid Email";
                if(!inputname.classList.contains("is-invalid")) inputname.classList.add("is-invalid");
            }
            else {
                inputname.nextElementSibling.textContent = "Invalid Email";
                if(inputname.classList.contains("is-invalid")) inputname.classList.remove("is-invalid");
                
                inputname.classList.add("is-valid");
            }
        }
        else {
            if(!isvalid(inputname.value)) {
                if(!inputname.classList.contains("is-invalid")) inputname.classList.add("is-invalid");
            }
            else {
                if(inputname.classList.contains("is-invalid")) inputname.classList.remove("is-invalid");
                
                inputname.classList.add("is-valid");
            }
        }
    })
}


function convertIntoObject(firstname, lastname, address, email, age, randomUsername, randomPassword, attend, id)
{
    return {
        "firstName": firstname,
        "lastName": lastname,
        "address": address,
        "email": email,
        "age": age,
        "userName": randomUsername,
        "password": randomPassword,
        "attend": attend,
        "id": id
    }
}

function newId() 
{
    let max = 0;
    for(let i=0; i<employees.length; i++)
    {
        max = Math.max(max, employees[i].id);
    }
    for(let i=0; i<newEmployees.length; i++)
    {
        max = Math.max(max, newEmployees[i].id);
    }
    return max+1;
}