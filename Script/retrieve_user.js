import { employee, admin } from "./user.js";

let fleg_First_time = 1;

let employees = [];
let newEmployees = [];
let admins = [];
let securityMan = {};

if (localStorage.getItem("employees") === null) {
    saveEmployeeData(employees);
}
else {
    let employeeArr = JSON.parse(localStorage.getItem("employees"));
    employeeArr.forEach(object => {
        employees.push(new employee(object));
    });
}

if (localStorage.getItem("admins") === null) {
    saveEmployeeData(admins);
}
else {
    let adminsArr = JSON.parse(localStorage.getItem("admins"));
    adminsArr.forEach(object => {
        admins.push(new admin(object));
    });
}

if (localStorage.getItem("new_employees") === null) {
    saveEmployeeData(newEmployees);
}
else {
    let newEmployeeArr = JSON.parse(localStorage.getItem("new_employees"));
    newEmployeeArr.forEach(object => {
        newEmployees.push(new employee(object));
    });
}
if (localStorage.getItem("securityMan") === null) {
    saveEmployeeData(securityMan);
}
else {
    securityMan = new employee (JSON.parse(localStorage.getItem("securityMan")));
}

if(admins.length==0) {
    admins = [{
        "firstName": "mohamed",
        'lastName': "ahmed",
        'address': 'Cairo',
        'email': 'adminstrator426@yahoo.com',
        'age': '35',
        'userName': 'AdminFEMASA',
        'password': '54197531',
        'id':1
    }];
}

securityMan = {
    "firstName": "Aly",
    'lastName': "Galal",
    'address': 'Tanta',
    'email': 'AlyGalal756@yahoo.com',
    'age': '40',
    'userName': 'security756124',
    'password': '20475131',
    'attend': false,
    'id':1
}

/* if(employees.length==0 && fleg_First_time==1) {
    employees.push({
        "firstName": "nada",
        'lastName': "gamal",
        'address': 'Cairo',
        'email': 'nadagghan552@yahoo.com',
        'age': '35',
        'userName': 'nadagamal754',
        'password': '48519625',
        'attend': false,
        'id':1
    })
    fleg_First_time = 0;
} */

saveEmployeeData(employees);
saveAdminData(admins);
saveSecurityData(securityMan);
saveNewEmpData(newEmployees);


export function saveEmployeeData(employees) {
    localStorage.setItem("employees", JSON.stringify(employees));
}

export function saveNewEmpData(newEmployees) {
    localStorage.setItem("new_employees", JSON.stringify(newEmployees));
}

export function saveAdminData(admins) {
    localStorage.setItem("admins", JSON.stringify(admins));
}

export function saveSecurityData(admins) {
    localStorage.setItem("securityMan", JSON.stringify(securityMan));
}

export { employees, admins, securityMan, newEmployees }

