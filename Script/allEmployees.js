import { employees, saveEmployeeData } from './retrieve_user.js'
import { reportsEmp, allEmpReports, saveReports } from './reports.js'
import { validAddress, validEmail, validName, validAge, generateRandomNumber, isUniquePassword, isUniqueEmail } from './functionality.js'


let color1 = '#f3f3f3';
let color2 = '#fff';
let color3 = 'rgb(99, 93, 93)';

let flag = {"firstName":0,
            "lastName":0,
            "address":0,
            "email":0,
            "age":0,
            "userName":0};


window.addEventListener('load', function() {

    let tBody = document.getElementById("allEmployees").children[1]
    for(let i=0; i<employees.length; i++)
    {
        addRowReport(tBody, employees[i], employees);
    }

    // delete employee
    let delete_emp = document.getElementsByClassName("delete");
    for(let n=0; n<employees.length; n++)
    {
        delete_emp[n].addEventListener("click", function() {
            if(confirm("are you sure?")) {
                let currenttr = this.parentNode.parentNode;
                
                let index = ([].slice.call(currenttr.parentNode.children).indexOf(currenttr));

                for(let i=0; i<allEmpReports.length; i++)
                {
                    if(allEmpReports[i]['id'] == currenttr.id) allEmpReports.splice(i, 1);
                }

                employees.splice(index, 1);
                currenttr.remove();
                saveEmployeeData(employees);
                saveReports(allEmpReports);
            }
        });
    }

    // edit employee data
    let update_emp = document.getElementsByClassName("edit");
    for(let n=0; n<employees.length; n++)
    {
        update_emp[n].addEventListener("click", function() {
            let currenttr = this.parentNode.parentNode;
            var index = ([].slice.call(currenttr.parentNode.children).indexOf(currenttr));
            
            // display inputs
            let inp = 0;
            for(let j in employees[0])
            {
                if(j == "userName") break;

                currenttr.children[inp].querySelector("input").style.backgroundColor = color1;
                currenttr.children[inp].querySelector("input").style.display = "inline";
                currenttr.children[inp].querySelector("input").value = employees[index][j];
                if(inp==0) currenttr.children[inp].querySelector("input").focus();
                inp++;
                
            }

            // select three buttons (update 0, save 1, cancel 2)
            let buttons = currenttr.children[7].children;
            // hide update button
            buttons[0].style.display = "none";
            // display save, cancel buttons
            buttons[1].style.display = "inline";
            buttons[2].style.display = "inline";              
        });
    }

    let error_mes = document.getElementById("error");
    ////// save button
    let savebuttons = document.getElementsByClassName("save");
    for(let n=0; n<employees.length; n++){
        savebuttons[n].addEventListener("click", function() {
            let currenttr = this.parentNode.parentNode;                          
            let valid_flag = 1;
            let index = ([].slice.call(currenttr.parentNode.children).indexOf(currenttr));
            let inp=0;
            for(let j in employees[0])
            {
                if(j == 'userName') break;

                let currentcell =  currenttr.children[inp];
                if(!valid(currentcell.querySelector("input").value, j, index)){
                    error_mes.style.display = "block";
                    error_mes.innerText = "invalid ".concat(j);
                    currentcell.querySelector("input").focus();
                    valid_flag = 0;
                    break;
                }
                inp++;
            }
            
            // case all data valid
            if(valid_flag==1){
                error_mes.style.display = "none";
                inp=0;
                for(let j in employees[0])
                {
                    if(j == "userName") break;

                    let currentcell =  currenttr.children[inp];
                    let newvalue = currentcell.querySelector("input").value;
                    // update array
                    employees[index][j] = newvalue;
                    // update table
                    currentcell.querySelector("span").innerText = newvalue;
                    // clear and hide input
                    currentcell.querySelector("input").value = "";
                    currentcell.querySelector("input").style.display = "none";
                    // change buttons
                    let buttons = currenttr.children[7].children;
                    buttons[0].style.display = "inline";
                    buttons[1].style.display = "none";
                    buttons[2].style.display = "none";

                    currenttr.children[inp].style.backgroundColor = color2;
                    inp++;
                    
                }
                // save changes
                saveEmployeeData(employees);
            }
        });
    }
    
    ////// cancel button
    let cancelbuttons = document.getElementsByClassName("cancel")
    for(let n=0; n<employees.length; n++){
        cancelbuttons[n].addEventListener("click", function() {
            let currenttr = this.parentNode.parentNode;
            // change buttons
            let buttons = currenttr.children[7].children;
            buttons[0].style.display = "inline";
            buttons[1].style.display = "none";
            buttons[2].style.display = "none";
            // hide any error message
            error_mes.style.display = "none";
            // hide input & show old data
            for(let inp=0; inp<5; inp++)
            {
                currenttr.children[inp].querySelector("input").value = "";
                currenttr.children[inp].querySelector("input").style.display = "none";
                currenttr.children[inp].style.backgroundColor = color2;
            }
        });          
    }

    // chande password of any employee
    for(let i=0; i<employees.length; i++)
    {
        document.getElementsByClassName("changePass")[i].addEventListener('click', function() {
            let randomPassword;
            do{
                randomPassword = `${generateRandomNumber(10000000, 99999999)}`;
            }while(!isUniquePassword(randomPassword));

            employees[i].password = randomPassword;
            alert(`this is the new password ${randomPassword}`);
            saveEmployeeData(employees);
        })
    }

    // sorting buttons (th)
    let allth = document.getElementsByTagName("thead")[0].children[0].children;
    allth = [].slice.call(allth).slice(0,6);
    for(let n=0; n<allth.length; n++)
    {
        allth[n].addEventListener("click", function() {
            let currentid = this.id;

            function sorting_asc(property) {
                return function(a, b) {
                    let A = (typeof a[property] === 'string') ? a[property].toUpperCase() : a[property];
                    let B = (typeof b[property] === 'string') ? b[property].toUpperCase() : b[property];
                    if ( A < B ) return -1
                    else if ( A > B ) return 1
                    else return 0
                }
            }
            function sorting_des(property) {
                return function(a, b) {
                    let A = (typeof a[property] === 'string') ? a[property].toUpperCase() : a[property];
                    let B = (typeof b[property] === 'string') ? b[property].toUpperCase() : b[property];
                    if ( A > B ) return -1
                    else if ( A < B ) return 1
                    else return 0
                }
            }
            
            // sort 
            if(flag[currentid]==0){
                flag[currentid] = 1;
                employees.sort(sorting_asc(currentid));
            } 
            else {
                flag[currentid] = 0;
                employees.sort(sorting_des(currentid));
            }

            saveEmployeeData(employees);
            displaytable();
        });
    }
})

function valid(text, j, n){
    if(j=="firstName" || j=="lastName") return validName(text);
    else if(j=="address") return validAddress(text);
    else if(j=="age") return validAge(text);
    else return (validEmail(text) && isUniqueEmail(employees, text, n));
}

function addRowReport(tBody, currentEmp) 
{
    let newTr = document.createElement("tr");
    newTr.setAttribute('id', currentEmp['id']);
    let newTd;
    for(var j in currentEmp)
    {
        if(j == 'password') break;

        newTd = document.createElement("td");
        let newSpan = document.createElement("span");
        newSpan.innerText = currentEmp[j];
        newTd.appendChild(newSpan);
        // create hidden input
        var newinput = document.createElement("input");
        newinput.setAttribute("type", "text");
        newinput.setAttribute("class", j);
        newTd.appendChild(newinput);
        
        newTr.appendChild(newTd);
    }
    // change password
    newTd = document.createElement("td");
    newTd.setAttribute('class', 'buttons');
    createbutton('New', newTd, 'changePass');
    newTr.appendChild(newTd);
    // edit
    newTd = document.createElement("td");
    newTd.setAttribute('class', 'buttons');
    createbutton(`<i class="fa fa-pencil" aria-hidden="true"></i>`, newTd, 'edit');
    createbutton(`<i class="fa fa-check" aria-hidden="true"></i>`, newTd, 'save');
    createbutton(`<i class="fa fa-times" aria-hidden="true"></i>`, newTd, 'cancel');
    newTr.appendChild(newTd);
    // delete
    newTd = document.createElement("td");
    newTd.setAttribute('class', 'buttons');
    createbutton(`<i class="fa fa-trash" aria-hidden="true"></i>`, newTd, 'delete');
    newTr.appendChild(newTd);

    let newDiv = document.createElement("div");
    newDiv.setAttribute('id', "error");
    newTr.appendChild(newDiv);

    tBody.appendChild(newTr);

}

function createbutton(value, parent, classname){
    let button = document.createElement("button");
    button.innerHTML = value;
    button.setAttribute("class", classname)
    parent.appendChild(button);
}

// display data after sorting
function displaytable(){
    let alltr = document.querySelectorAll("tr");
    for(let i=0; i<employees.length; i++){
        let inp=0;
        for(let j in employees[i])
        {
            if(j == 'password') break;

            alltr[i+1].children[inp].children[0].innerText = employees[i][j];
            inp++;
        }
    }
}