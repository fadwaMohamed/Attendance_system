import {saveEmployeeData, employees, newEmployees, saveNewEmpData} from "./retrieve_user.js";
import { employee } from "./user.js";
import { validInput, validAddress, validEmail, validName, validAge, generateRandomNumber, isUniquePassword, isUniqueEmail, isUniqueUsername } from './functionality.js'

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
        console.log(isUniqueEmail(employees, email.value))
        if(!validName(firstname.value) || !validName(lastname.value) || !validAddress(address.value) || !validEmail(email.value) || !validAge(age.value) || !isUniqueEmail(employees, email.value) || !isUniqueEmail(newEmployees, email.value))
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