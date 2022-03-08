import { employees } from './retrieve_user.js'
import { reportsEmp, allEmpReports, displayDate, displayTime } from './reports.js'


window.addEventListener('load', function() {

    let employeeId = localStorage.getItem('currentId')[0];
    let employeeIndex = localStorage.getItem('currentId')[2];


    let reportIndex;
    for(let i=0; i<reportsEmp.reportNo; i++)
    {
        if(employeeId==allEmpReports[i].id) {
            reportIndex = i;
            break;
        }
        reportIndex = -1;
    }

    let currentEmpReport
    if(allEmpReports.length!=0)
        currentEmpReport= allEmpReports[reportIndex].reportsArr;
    else
        currentEmpReport = []

    // display user's name in the nav bar
    document.getElementById("headerName").innerHTML =  `${employees[employeeIndex].firstName} ${employees[employeeIndex].lastName}`;

    // monthly reports
    this.document.querySelector("input[type='month']").addEventListener("change", function() {
        console.log(this.value);

        // remove previous date displayed in table
        document.getElementsByTagName('tbody')[0].innerHTML = '';

        if(this.value.length > 0) {
            let dateArr = this.value.split("-");
            
            let curYear = dateArr[0];

            // reports for that month
            let flag = 0;
            let noLate = 0;
            let noExcuse = 0;
    
            let tBody = document.getElementsByTagName("tbody")[0];
    
            for(let j=0; j<currentEmpReport.length; j++)
            {
                // dateArr[1] >> month
                if(currentEmpReport[j]['date'][0] == curYear && currentEmpReport[j]['date'][1] == dateArr[1])
                {
                    displayMonthlyData(1, 0);
                    flag = 1;
                    if(currentEmpReport[j]['excuse']) noExcuse++;
                    if(currentEmpReport[j]['late'][2] < 0) noLate++;
                    addRowReport(j, tBody, currentEmpReport);
                }
            }
    
            document.getElementById("lates").innerText = noLate;
            document.getElementById("excuses").innerText = noExcuse;
    
            if(!flag) {
                displayMonthlyData(0, 1);
            }
        }
        else {
            displayMonthlyData(0, 0);
        }

    })

    // daily reports
    this.document.querySelector("input[type='date']").addEventListener("change", function() {
        console.log(this.value);

        if(this.value.length > 0) {
            let dateArr = this.value.split("-");
            
            let curYear = dateArr[0];
            let curMonth = dateArr[1];
            let curDay = dateArr[2];

            // display report of selected day
            let flag = 0;

            for(let i=0; i<currentEmpReport.length; i++)
            {
                if(curDay==currentEmpReport[i]['date'][2] && curMonth==currentEmpReport[i]['date'][1] && curYear==currentEmpReport[i]['date'][0]) {
                    displayDailyData(1, 0);
                    document.getElementById("checkIn").innerText = displayTime(currentEmpReport[i]['attend_time']);
                    document.getElementById("checkOut").innerText = displayTime(currentEmpReport[i]['depart_time']);
                    document.getElementById("late").innerHTML = currentEmpReport[i]['late'][2]<0 ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-xmark"></i>`;
                    document.getElementById("excuse").innerHTML = currentEmpReport[i]['excuse'] ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-xmark"></i>`;
                    flag = 1;
                }
            }
            if(!flag) {
                displayDailyData(0, 1);
            }
        }
        else {
            displayDailyData(0, 0);
        }
    })

    // log out
    document.getElementsByClassName("logOut")[0].addEventListener("click", function() {
        localStorage.removeItem("currentId");
        setTimeout('location.replace("../HTML/login.html")', 1000);
    })

})

// show & hide data in daily report
function displayDailyData(p1, p2)
{
    document.getElementById("dayReport").style.opacity = p1;
    document.getElementsByClassName("noReport")[0].style.opacity = p2;
}

// table in monthly report
function addRowReport(i, tBody, currentEmpReport) 
{
    let newTr = document.createElement("tr");
    // date
    let newTd = document.createElement("td");
    newTd.innerText = displayDate(currentEmpReport[i]['date']);
    newTr.appendChild(newTd);
    // attendance time
    newTd = document.createElement("td");
    newTd.innerText = displayTime(currentEmpReport[i]['attend_time']);
    newTr.appendChild(newTd);
    // departure time
    newTd = document.createElement("td");
    newTd.innerText = displayTime(currentEmpReport[i]['depart_time']);
    newTr.appendChild(newTd);
    // late
    let late = currentEmpReport[i]['late'][2]
    newTd = document.createElement("td");
    newTd.innerHTML = late<0 ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-xmark"></i>`;
    newTr.appendChild(newTd);
    // excuse
    newTd = document.createElement("td");
    newTd.innerHTML = currentEmpReport[i]['excuse'] ? `<i class="fa-solid fa-check"></i>` : `<i class="fa-solid fa-xmark"></i>`;
    newTr.appendChild(newTd);

    tBody.appendChild(newTr);
}
// show & hide table in monthly report
function displayMonthlyData(p1, p2)
{
    document.getElementById("wrapperTable").style.opacity = p1;
    document.getElementsByClassName("noReport")[1].style.opacity = p2;
}
