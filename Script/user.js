
class user
{
    constructor(firstName, lastName, address, email, age, userName, password) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.age = age;
        this.userName = userName;
        this.password = password;
    }
}

// for all employees
class employee extends user
{
    constructor(userObject)
    {
        let {firstName, lastName, address, email, age, userName, password, attend, id} = userObject;

        super(firstName, lastName, address, email, age, userName, password);
        this.attend = attend;
        this.id = id;
    }
}

class admin extends user
{
    constructor(userObject)
    {
        let {firstName, lastName, address, email, age, userName, password} = userObject;

        super(firstName, lastName, address, email, age, userName, password);

        this.id = 1;
    }
}

export {employee, admin};

