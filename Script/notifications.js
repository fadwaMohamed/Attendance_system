import { employees, newEmployees, saveNewEmpData, saveEmployeeData } from './retrieve_user.js'
import { employee } from './user.js';


window.addEventListener('load', function() {

    let section = this.document.getElementById("notifications");

    // if there are new employees
    if(newEmployees.length != 0) {
        for(let i=0; i<newEmployees.length; i++)
        {
            let div1 = document.createElement("div");
            div1.setAttribute('class', 'card');
            let div2 = document.createElement("div");
            div2.setAttribute('class', 'card-header');

            let h5 = document.createElement("h5");
            h5.innerText = 'New Registration';
            div2.appendChild(h5);
            let h6 = document.createElement("h6");
            h6.innerText = 'New employee with the following data: ';
            div2.appendChild(h6);

            div1.appendChild(div2);

            let div3 = document.createElement("div");
            div3.setAttribute('class', 'card-body');
            div3.setAttribute('id', `${newEmployees[i].id}`);
            addInfo(newEmployees[i], div3);

            div1.appendChild(div3);

            section.appendChild(div1);
        }
    }

    // if there aren't new employees
    noNotification(section);

    for(let i=0; i< newEmployees.length; i++)
    {
        document.getElementsByClassName("ok")[i].addEventListener('click', function() {
            let index = this.parentNode.id;
            for(let j=0; j< newEmployees.length; j++)
            {
                if(index == newEmployees[j].id) {
                    sendEmail(newEmployees[j]);
                    employees.push(new employee(newEmployees[j]));
                    newEmployees.splice(j, 1);
                }
            }
            this.parentNode.parentNode.remove();
            saveEmployeeData(employees);
            saveNewEmpData(newEmployees);
            noNotification(section);
        })
    }
    
    for(let i=0; i< newEmployees.length; i++)
    {
        document.getElementsByClassName("no")[i].addEventListener('click', function() {
            let index = this.parentNode.id;
            for(let j=0; j< newEmployees.length; j++)
            {
                if(index == newEmployees[j].id) {
                    newEmployees.splice(j, 1);
                }
            }
            this.parentNode.parentNode.remove();
            saveEmployeeData(employees);
            saveNewEmpData(newEmployees);
            noNotification(section);
        })
    }

});


function sendEmail(employee) {
    let emailMessage = {
        from_name: "ABC Company",
        to_name: `${employee.firstName} ${employee.lastName}`,
        employee_email: employee.email,
        user_name: employee.userName,
        _password: employee.password,
    };
    
    emailjs.send("service_jl7cndu", "template_al6ygep", emailMessage)
        .then(function() {
            console.log("success");
        }, function() {
            console.log("fail");
        })
}

function noNotification(section)
{
    if(newEmployees.length == 0) {
        let div = document.createElement("div");
        div.setAttribute("id", "noNotification");
        div.innerText = 'No Notification';
        section.appendChild(div);
    }
}

function addInfo(newemployee, div)
{
    let p = document.createElement("p");
    p.innerText = `First name: ${newemployee['firstName']}.`;
    div.appendChild(p);
    p = document.createElement("p");
    p.innerText = `Last name: ${newemployee['lastName']}.`;
    div.appendChild(p);
    p = document.createElement("p");
    p.innerText = `Address: ${newemployee['address']}.`;
    div.appendChild(p);
    p = document.createElement("p");
    p.innerText = `Email: ${newemployee['email']}.`;
    div.appendChild(p);
    p = document.createElement("p");
    p.innerText = `Age: ${newemployee['age']}.`;
    div.appendChild(p);

    let button = document.createElement("button");
    button.setAttribute('class', 'ok');
    button.innerHTML = 'Confirm';
    div.appendChild(button);
    button = document.createElement("button");
    button.setAttribute('class', 'no');
    button.innerHTML = 'Ignore';
    div.appendChild(button);
}