import { employees, newEmployees, saveEmployeeData } from './retrieve_user.js'
import { reportsEmp, allEmpReports, saveReports } from './reports.js'
import { validInput, validAddress, validEmail, validName, validAge, generateRandomNumber, isUniquePassword, isUniqueEmail } from './functionality.js'


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
        addRowEmployee(tBody, employees[i], employees);
    }

    // delete employee
    let clickedTr = null;
    let delete_emp = document.getElementsByClassName("delete");
    for(let n=0; n<employees.length; n++)
    {
        delete_emp[n].addEventListener("click", function() {
            clickedTr = this.parentNode.parentNode;
        });
    }
    // delete modal 
    document.getElementById("delete").addEventListener("click", () => {
        // close modal
        $('#modalDelete').modal('hide');
        
        let index = ([].slice.call(clickedTr.parentNode.children).indexOf(clickedTr));

        for(let i=0; i<allEmpReports.length; i++)
        {
            if(allEmpReports[i]['id'] == clickedTr.id) allEmpReports.splice(i, 1);
        }

        employees.splice(index, 1);
        clickedTr.remove();
        saveEmployeeData(employees);
        saveReports(allEmpReports);
    });

    // edit employee data
    let firstname, lastname, address, email, age, updateIndex, inputs;
    let update_emp = document.getElementsByClassName("edit");
    for(let n=0; n<employees.length; n++)
    {
        update_emp[n].addEventListener("click", function() {

            //delete previous validation box
            inputs = document.querySelectorAll("#editEmployee input");
            inputs.forEach((inp) => {
                inp.classList.remove("is-invalid");
                inp.classList.remove("is-valid");
            })

            let currenttr = this.parentNode.parentNode;
            updateIndex = ([].slice.call(currenttr.parentNode.children).indexOf(currenttr));
            // put current employee data in the modal
            firstname = document.getElementById("Firstname");
            lastname = document.getElementById("Lastname");
            address = document.getElementById("Address");
            email = document.getElementById("Email");
            age = document.getElementById("Age");
            
            // put employee data in modal
            let inp = 0;
            for(let j in employees[0])
            {
                if(j == "userName") break;
                inputs[inp].value = employees[updateIndex][j];
                inp++;
            }

            // keyup validation
            validInput(firstname, validName);
            validInput(lastname, validName);
            validInput(address, validAddress);
            validInput(email, validEmail, updateIndex);
            validInput(age, validAge);
        });
    }
    ////// save updated data
    document.getElementById("save").addEventListener("click", function() {
        if(validName(firstname.value) && validName(lastname.value) && validAddress(address.value) && validEmail(email.value) && validAge(age.value) && isUniqueEmail(employees, email.value, updateIndex) && isUniqueEmail(newEmployees, email.value, updateIndex))
        {
            // update employee data
            let inp = 0;
            for(let j in employees[0])
            {
                if(j == "userName") break;
                employees[updateIndex][j] = inputs[inp].value;
                inp++;
            }
            // save changes
            saveEmployeeData(employees);
            displaytable();

            $('#editEmployee').modal('hide');
        }
    });

    // change password of any employee
    let clickedPass = -1;
    for(let i=0; i<employees.length; i++)
    {
        clickedPass = i;
    }
    // modal password
    document.getElementById("changePassword").addEventListener('click', () => {
        // close modal
        $('#modalPassword').modal('hide');
        $('#modalPassInfo').modal('show');

        let randomPassword;
        do{
            randomPassword = `${generateRandomNumber(10000000, 99999999)}`;
        }while(!isUniquePassword(randomPassword));

        employees[clickedPass].password = randomPassword;
        saveEmployeeData(employees);

        $('#modalPassInfo #newPassInfo').text(`This is the new password: ${randomPassword}`);
    })

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

function addRowEmployee(tBody, currentEmp) 
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
        newTr.appendChild(newTd);
    }
    // change password
    createbutton('New', newTr, 'changePass', '#modalPassword');
    // edit
    createbutton(`<i class="fa-solid fa-pen-to-square"></i>`, newTr, 'edit', '#editEmployee');
    // delete
    createbutton(`<i class="fa-solid fa-trash-can"></i>`, newTr, 'delete', '#modalDelete');

    tBody.appendChild(newTr);

}

function createbutton(value, parent, classname, modalId){
    let newTd = document.createElement("td");
    newTd.setAttribute('data-bs-toggle', 'modal');
    newTd.setAttribute('data-bs-target', modalId);
    let button = document.createElement("button");
    button.innerHTML = value;
    button.setAttribute("class", classname)
    newTd.appendChild(button);
    parent.appendChild(newTd);
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