import { employees } from './retrieve_user.js'
import { reportsEmp, allEmpReports, displayDate, displayTime } from './reports.js'

let day;
let month;
let year;

window.addEventListener('load', function() {

    let employeeId = localStorage.getItem('currentId')[0];
    let employeeIndex = localStorage.getItem('currentId')[2];

    // at start display employee data
    display("none", "none", "grid"); 
    displayPersonalData(employeeIndex);

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

    document.getElementsByTagName("header")[0].innerHTML =  `<h1>Welcome &nbsp;&nbsp; <span>${employees[employeeIndex].firstName} ${employees[employeeIndex].lastName}</span></h1>`;

    this.document.getElementById("pData").addEventListener('click', function() {
        display("none", "none", "grid"); 
    })

    let yearElement = document.getElementById("year");
    this.document.getElementById("mReport").addEventListener('click', function() {
        document.getElementById("tempHead").style.display = 'none';
        display("block", "none", "none");
        document.getElementById("monthly1").style.display = 'grid';
        document.getElementById("monthly2").style.display = 'none';
        document.getElementsByClassName("calendarHead")[0].style.display = 'flex';
        if(document.getElementsByTagName('tbody')[0]) document.getElementsByTagName('tbody')[0].remove();
    })
    // add event to each month
    let allArticleMonths = document.getElementsByClassName("calendar");
    for(let i=0; i<12; i++)
    {
        allArticleMonths[i].addEventListener('click', function(event) {
            // is there data for that month
            let flag = 0;
            document.getElementById("monthly1").style.display = 'none';
            document.getElementById("monthly2").style.display = 'block';
            let curYear = yearElement.innerText;
            let noLate = 0;
            let noExcuse = 0;
            let table = document.getElementById("monthlyTable");
            let tBody = document.createElement("tbody");
            // change header
            document.getElementById("tempHead").style.display = 'block';
            document.getElementById("tempHead").innerHTML = `${this.innerText} &nbsp;&nbsp; ${curYear}`;
            document.getElementsByClassName("calendarHead")[0].style.display = 'none';
            for(let j=0; j<currentEmpReport.length; j++)
            {
                if(currentEmpReport[j]['date'][0] == curYear && currentEmpReport[j]['date'][1]==i)
                {
                    isThereDataDisplay('block', 'none');
                    flag = 1;
                    if(currentEmpReport[j]['excuse']) noExcuse++;
                    if(currentEmpReport[j]['late'][2] < 0) noLate++;
                    addRowReport(j, tBody, currentEmpReport);
                }
            }
            table.appendChild(tBody)
            document.getElementById("lates").innerText = noLate;
            document.getElementById("excuses").innerText = noExcuse;

            if(!flag) {
                isThereDataDisplay('none', 'flex');
            }
        })
    }
    // change calendar year (monthly)
    document.getElementsByClassName('fa-angle-left')[0].addEventListener('click', function() {
        yearElement.innerText = parseInt(yearElement.innerText)-1;
    })
    document.getElementsByClassName('fa-angle-right')[0].addEventListener('click', function() {
        yearElement.innerText = parseInt(yearElement.innerText)+1;
    })
    // back button monthly report
    this.document.getElementById("back").addEventListener('click', function() {
        document.getElementById("tempHead").style.display = 'none';
        document.getElementsByClassName("calendarHead")[0].style.display = 'flex';
        document.getElementById("monthly1").style.display = 'grid';
        document.getElementById("monthly2").style.display = 'none';
        document.getElementsByTagName('tbody')[0].remove();
    })

    this.document.getElementById("dReport").addEventListener('click', function() {
        display("none", "block", "none"); 
        startDailyReport(currentEmpReport);
    })

    // change calendar (daily)
    document.getElementsByClassName('fa-angle-left')[1].addEventListener('click', function() {
        day--;
        if(day == 0) {
            month--;
            if(month in [0, 2, 4, 6, 7, 9, 11]) day=31;
            else if(month in [3, 5, 8, 10]) day = 30;
            else if(month == 1) day=28;
            else {
                month = 11;
                year--;
            }
        }
        displayDailyReport(year, month, day, currentEmpReport);
    })
    document.getElementsByClassName('fa-angle-right')[1].addEventListener('click', function() {
        day++;
        if((day==32 && month in [0, 2, 4, 6, 7, 9, 11]) || (day==29 && month==1) || (day==31 && month in [3, 5, 8, 10])) {
            day = 1;
            month++;
            if(month==12) {
                month = 0;
                year++;
            }
        }
        displayDailyReport(year, month, day, currentEmpReport);
    })

    document.getElementById("logOut").addEventListener("click", function() {
        localStorage.removeItem("currentId");
        setTimeout('location.replace("../HTML/login.html")', 1000);
    })
})

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
    newTd.innerHTML = late<0 ? `<i class="fa fa-check" aria-hidden="true"></i>` : `<i class="fa fa-times" aria-hidden="true"></i>`;
    newTr.appendChild(newTd);
    // excuse
    newTd = document.createElement("td");
    newTd.innerHTML = currentEmpReport[i]['excuse'] ? `<i class="fa fa-check" aria-hidden="true"></i>` : `<i class="fa fa-times" aria-hidden="true"></i>`;
    newTr.appendChild(newTd);

    tBody.appendChild(newTr);
}

function startDailyReport(currentEmpReport)
{
    let today = new Date();
    day = today.getDate();
    month = today.getMonth();
    year = today.getFullYear();
    displayDailyReport(year, month, day, currentEmpReport);
}
// display report of selected day
function displayDailyReport(year, month, day, currentEmpReport)
{
    let flag = 0;
    let dailyHeader = document.getElementById("todayDate");
    dailyHeader.innerText = displayDate([year, month, day]);
    for(let i=0; i<currentEmpReport.length; i++)
    {
        if(day==currentEmpReport[i]['date'][2] && month==currentEmpReport[i]['date'][1] && year==currentEmpReport[i]['date'][0]) {
            document.getElementsByClassName("noReport")[1].style.display = 'none';
            document.getElementById("dayReport").style.display = 'flex';
            document.getElementById("checkIn").innerText = displayTime(currentEmpReport[i]['attend_time']);
            document.getElementById("checkOut").innerText = displayTime(currentEmpReport[i]['depart_time']);
            document.getElementById("late").innerHTML = currentEmpReport[i]['late'][2]<0 ? `<i class="fa fa-check" aria-hidden="true"></i>` : `<i class="fa fa-times" aria-hidden="true"></i>`;
            document.getElementById("excuse").innerHTML = currentEmpReport[i]['excuse'] ? `<i class="fa fa-check" aria-hidden="true"></i>` : `<i class="fa fa-times" aria-hidden="true"></i>`;
            flag = 1;
        }
    }
    if(!flag) {
        document.getElementById("dayReport").style.display = 'none';
        document.getElementsByClassName("noReport")[1].style.display = 'flex';
    }
}
// display one and hide others
function display(p1, p2, p3) 
{
    document.getElementById("monthly").style.setProperty("display", p1, "important");
    document.getElementById("daily").style.setProperty("display", p2, "important");
    document.getElementById("data").style.setProperty("display", p3, "important");
}

function displayPersonalData(employeeIndex) 
{
    document.getElementById("firstName").innerText = employees[employeeIndex].firstName;
    document.getElementById("lastName").innerText = employees[employeeIndex].lastName;
    document.getElementById("address").innerText = employees[employeeIndex].address;
    document.getElementById("email").innerText = employees[employeeIndex].email;
    document.getElementById("age").innerText = employees[employeeIndex].age;
}

// 
function isThereDataDisplay(p1, p2)
{
    document.getElementById("wrapperTable").style.display = p1;
    document.getElementById("wrapperTable").nextElementSibling.style.display = p1;
    document.getElementById("wrapperTable").nextElementSibling.nextElementSibling.style.display = p1;
    document.getElementsByClassName("noReport")[0].style.display = p2;
}
