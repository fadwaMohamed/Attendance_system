import { employees, newEmployees, saveNewEmpData, saveEmployeeData } from './retrieve_user.js'
import { employee } from './user.js';


window.addEventListener('load', function() {

    let section = this.document.getElementById("notifications");

    if(newEmployees.length != 0) {
        for(let i=0; i<newEmployees.length; i++)
        {
            let div1 = document.createElement("div");
            div1.setAttribute('id', 'notification');
            let h3 = document.createElement("h3");
            h3.innerText = 'New Registration';
            div1.appendChild(h3);
            let h4 = document.createElement("h4");
            h4.innerText = 'New employee with the following data: ';
            div1.appendChild(h4);

            let div2 = document.createElement("div");
            div2.setAttribute('class', 'data');
            div2.setAttribute('id', `${newEmployees[i].id}`);
            addInfo(newEmployees[i], div2);
            div1.appendChild(div2);

            section.appendChild(div1);
        }
    }

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

    let div3 = document.createElement("div");
    div3.setAttribute('class', 'ok');
    div3.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    div.appendChild(div3);
    div3 = document.createElement("div");
    div3.setAttribute('class', 'no');
    div3.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    div.appendChild(div3);
}