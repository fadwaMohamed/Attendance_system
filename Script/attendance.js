import { employees, saveEmployeeData } from "./retrieve_user.js";
import { isInputEmpty, isEmployeeExist } from "./functionality.js";
import { reportsEmp, saveReports, allEmpReports } from "./reports.js"


console.log(employees)
window.addEventListener('load', function() {
    let username = document.getElementById("username");

    username.addEventListener('keyup', function() {
        let userIndex = isEmployeeExist(username.value);
        if(userIndex != -1 && employees[userIndex].attend) {
            username.nextElementSibling.style.opacity = 0;
            departureUI();
        }
        else {
            attendanceUI();
        }
    })

    document.forms[0].addEventListener('submit', function(event) {
        let userIndex = isEmployeeExist(username.value);
        if(userIndex == -1) {
            event.preventDefault();

            isInputEmpty(username);
            username.nextElementSibling.textContent = "Invalid Username";
            username.nextElementSibling.style.opacity = 1;
            setTimeout('username.nextElementSibling.style.opacity = 0;', 4000)
            username.parentElement.style.height = "65%";
        }
        else {
            event.preventDefault();

            username.nextElementSibling.style.opacity = 0;
            username.parentElement.style.height = "60%";

            // check if attended before or not

            // attendance
            if(employees[userIndex].attend == false) {
                if(!attendedBefore(userIndex)) {
                    employees[userIndex].attend = true;
                    saveEmployeeData(employees);
                    username.value = "";
                    checkNewEmp(userIndex);
                }
                else {
                    username.nextElementSibling.style.opacity = 1;
                    username.nextElementSibling.textContent = "already attended today!!";
                    setTimeout('username.nextElementSibling.style.opacity = 0;', 4000);
                    username.parentElement.style.height = "65%";
                }
            }
            // departure
            else {
                employees[userIndex].attend = false;
                saveEmployeeData(employees);
                username.value = "";
                attendanceUI();
                departEmp(userIndex);
            }

        }
    })

    // auto departure at 3:30
    let now = new Date();
    let milliSeconds = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 30, 0, 0) - now;
    if (milliSeconds < 0) {
        milliSeconds += 86400000;
    }
    setTimeout(function() {
        for(let i=0; i<employees.length; i++)
        {
            if(employees[i].attend) {
                employees[i].attend = false;
                saveEmployeeData(employees);
                departEmp(i);
            }
        }
    }, milliSeconds);

})

// attended before in the same day
function attendedBefore(userIndex) 
{
    let userId = employees[userIndex].id;
    for(let i=0; i<reportsEmp.reportNo; i++)
    {
        if(allEmpReports[i].id == userId) {
            let last_date = allEmpReports[i].reportsArr.at(-1).date;
            if(new Date().getFullYear() == last_date[0] && new Date().getMonth() == last_date[1] && new Date().getDate() == last_date[2])
                return 1;
        }
    }
    return 0;
}

// first time to attend or not
function checkNewEmp(userIndex)
{
    let userId = employees[userIndex].id;
    let flag = 0;
    for(let i=0; i<reportsEmp.reportNo; i++)
    {
        // not first time (has reports before)
        if(allEmpReports[i].id == userId) {
            allEmpReports[i].addTodayReport();
            flag = 1;
        }
    }
    if(!flag)
        allEmpReports.push(new reportsEmp({"id":userId, }, 0));

    saveReports(allEmpReports);
}

// departure of employee
function departEmp(userIndex)
{
    let userId = employees[userIndex].id;
    for(let i=0; i<reportsEmp.reportNo; i++)
    {
        if(allEmpReports[i].id == userId) {
            // .at() >> allow negative index to arrays
            let excuseFlag = document.getElementById("excuse").checked;
            allEmpReports[i].reportsArr.at(-1).end_day(excuseFlag);
        }
    }
    saveReports(allEmpReports);
}

function attendanceUI()
{
    document.getElementById("departure").style.opacity = 0;
    document.querySelector("input[type='submit']").value = "Confirm Attendance";
}

function departureUI()
{
    document.getElementById("departure").style.opacity = 1;
    document.querySelector("input[type='submit']").value = "Confirm Departure";
    document.getElementById("excuse").checked = false;
}