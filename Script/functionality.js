import { newEmployees, employees, securityMan, admins } from "./retrieve_user.js";


// for any type of users (employee && admin)
function isPasswordRight(indexOfUser, itsPassword, userType) 
{
    if(indexOfUser != -1 && userType[indexOfUser].password == itsPassword)
        return 1; 
    return 0;
}// for security man
function isPasswordRightSecurity(usernameToCheck, itsPassword) 
{
    if(securityMan.userName == usernameToCheck && securityMan.password == itsPassword)
        return 1; 
    return 0;
}

function isInputEmpty(inputType)
{
    if(inputType.value == "") {
        inputType.focus();
        if(!inputType.classList.contains("empty")) inputType.classList.add("empty");
        return 1;
    }
    else {
        if(inputType.classList.contains("empty")) inputType.classList.remove("empty");
        return 0;
    }
}

function isEmployeeExist(usernameToCheck)
{
    for(let i=0; i<employees.length; i++)
    {
        if(employees[i].userName == usernameToCheck)
            return i;
    }
    return -1;  // not exist
}

function isAdminExist(usernameToCheck)
{
    for(let i=0; i<admins.length; i++)
    {
        if(admins[i].userName == usernameToCheck)
            return i;
    }
    return -1;  // not exist
}


function validName(name) {
    return name.match(/^[a-zA-Z]{3,15}$/);
}
function validAddress(address) {
    return address.match(/^[a-zA-Z0-9-\s\,]{3,50}$/);
}
function validEmail(email) {
    return email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
}
function validAge(age) {
    return age.match(/^[2-5][0-9]$|^60$/);
}

function generateRandomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isUniqueEmail(employee, inputToCheck, j) {
    for(let i=0; i<employee.length; i++) {
        if(i==j) continue;
        if(employee[i].email == inputToCheck) return 0;
    }
    return 1;
}
function isUniqueUsername(inputToCheck) {
    for(let i=0; i<employees.length; i++)
        if(employees[i].userName == inputToCheck) return 0;
    return 1;
}
function isUniquePassword(inputToCheck) {
    for(let i=0; i<employees.length; i++)
        if(employees[i].password == inputToCheck) return 0;
    return 1;
}

function validInput(inputname, isvalid, j=-1) {
    inputname.addEventListener('keyup', function() {
        if(inputname.id=="email" || inputname.id == "Email") {
            if(!isUniqueEmail(employees, inputname.value, j) || !isUniqueEmail(newEmployees, inputname.value, j)) {
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

export { validInput, isAdminExist, isEmployeeExist, isInputEmpty, isPasswordRight, isPasswordRightSecurity, validAddress, validEmail, validName, validAge, generateRandomNumber, isUniquePassword, isUniqueEmail, isUniqueUsername };