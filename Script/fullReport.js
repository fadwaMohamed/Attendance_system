import { employees } from './retrieve_user.js'
import { reportsEmp, allEmpReports, displayDate } from './reports.js'
/* import { addRowReport } from './lateReport.js' */

let month;
let year;
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let tBody = document.getElementById("TableL_E").children[1];

window.addEventListener('load', function() {
    let today = new Date();
    month = today.getMonth();
    year = today.getFullYear();

    displayFullReport(month, year);

    // change calendar (month + year)
    document.getElementsByClassName('fa-angle-left')[0].addEventListener('click', function() {
        removeDisplayedReport();
        month--;
        if(month==-1) {
            month = 11;
            year--;
        }
        displayFullReport(month, year);
    })
    document.getElementsByClassName('fa-angle-right')[0].addEventListener('click', function() {
        removeDisplayedReport();
        month++;
        if(month==12) {
            month = 0;
            year++;
        }
        displayFullReport(month, year);
    })

});

function displayFullReport(month, year)
{
    // display date
    document.getElementById("todayDate").innerText = `${monthNames[month]} ${year}`;

    for(let i=0; i<employees.length; i++)
    {
        if(allEmpReports.length) {
            document.getElementById("TableL_E").style.display = 'table';
            ////////////// date > statDate for each employee
            let reportIndex;
            for(let n=0; n<reportsEmp.reportNo; n++)
            {
                if(employees[i].id == allEmpReports[n].id) {
                    reportIndex = n;
                    break;
                }
                reportIndex = -1;
            }

            if(reportIndex != -1) {
                let flag = 0;
                let currentEmpReport = allEmpReports[reportIndex].reportsArr;
                let noTimes1 = 0;
                let noTimes2 = 0;
                for(let j=0; j<currentEmpReport.length; j++)
                {
                    // choose month and year of report
                    if(currentEmpReport[j].date[0] == year && currentEmpReport[j].date[1] == month) {
                        if(currentEmpReport[j]['late'][2] < 0) noTimes1++;
                        if(currentEmpReport[j]['excuse']) noTimes2++;
                        flag = 1;
                    }
                }
                if(flag) {
                    document.getElementById("TableL_E").style.display = 'table';
                    addRowReport(tBody, employees[i], noTimes1==0 ? '--': noTimes1, noTimes2==0 ? '--': noTimes2);
                    document.getElementById("noData").style.display = 'none';
                }
                else {
                    document.getElementById("noData").style.display = 'block';
                    document.getElementById("TableL_E").style.display = 'none';
                }
            }
        }
        else {
            document.getElementById("TableL_E").style.display = 'none';
            document.getElementById("noData").style.display = 'block';
        }
                
    }
}

function removeDisplayedReport()
{
    while(tBody.children.length >0)
    {
        tBody.children[0].remove();
    }
}

function addRowReport(tBody, currentEmp, noTimes1, noTimes2) 
{
    let newTr = document.createElement("tr");
    newTr.setAttribute('id', currentEmp['id']);
    // name
    let newTd = document.createElement("td");
    newTd.innerText = `${currentEmp['firstName']} ${currentEmp['lastName']}`;
    newTr.appendChild(newTd);
    // time of lates
    newTd = document.createElement("td");
    newTd.innerText = noTimes1;
    newTr.appendChild(newTd);
    // time of excuses
    newTd = document.createElement("td");
    newTd.innerText = noTimes2;
    newTr.appendChild(newTd);

    tBody.appendChild(newTr);
}
