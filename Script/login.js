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

            document.getElementById("invalid").style.opacity = 0;
        
            localStorage.setItem("currentId", [employees[indexOfEmployee].id, indexOfEmployee]);
            setTimeout('location.replace("../HTML/profilePage.html")', 1000);
    
        }
        else if(isPasswordRight(indexOfAdmin, password.value, admins)) {
            event.preventDefault();

            document.getElementById("invalid").style.opacity = 0;

            setTimeout('location.replace("../HTML/allEmployees.html")', 1000);
        }
        else if(isPasswordRightSecurity(username.value, password.value)) {
            event.preventDefault();

            document.getElementById("invalid").style.opacity = 0;

            setTimeout('location.replace("../HTML/Attendance.html")', 1000);
        }
        else {
            event.preventDefault();

            isInputEmpty(password);
            isInputEmpty(username);
            document.getElementById("invalid").style.opacity = 1;
        }
    })

})
