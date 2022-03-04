import { employees, admins } from "./retrieve_user.js";
import { isEmployeeExist, isInputEmpty, isPasswordRight, isAdminExist, isPasswordRightSecurity } from "./functionality.js"

window.addEventListener('load', function() {
    let username = document.getElementById("username");
    let password = document.getElementById("password");

    document.forms[0].addEventListener('submit', function(event) {
        let indexOfEmployee = isEmployeeExist(username.value);
        let indexOfAdmin = isAdminExist(username.value);

        if(isPasswordRight(indexOfEmployee, password.value, employees)) {
            event.preventDefault();

            password.nextElementSibling.style.display = "none";
            password.parentElement.style.height = "70%";
        
            localStorage.setItem("currentId", [employees[indexOfEmployee].id, indexOfEmployee]);
            setTimeout('location.replace("../HTML/profilePage.html")', 1000);
    
        }
        else if(isPasswordRight(indexOfAdmin, password.value, admins)) {
            event.preventDefault();

            password.nextElementSibling.style.display = "none";
            password.parentElement.style.height = "70%";

            setTimeout('location.replace("../HTML/allEmployees.html")', 1000);
        }
        else if(isPasswordRightSecurity(username.value, password.value)) {
            event.preventDefault();

            password.nextElementSibling.style.display = "none";
            password.parentElement.style.height = "70%";

            setTimeout('location.replace("../HTML/Attendance.html")', 1000);
        }
        else {
            event.preventDefault();

            isInputEmpty(password);
            isInputEmpty(username);
            password.nextElementSibling.style.display = "inline";
            password.parentElement.style.height = "80%";
        }
    })

})
