
// report of each employee at one day
class reportDay
{
    constructor(arrDay) {
        let {date=[new Date().getFullYear(), new Date().getMonth(), new Date().getDate()], attend_time=[new Date().getHours(), new Date().getMinutes()], late=lateTime(attend_time), depart_time=[], excuse=false} = arrDay;

        this.date = date;
        this.attend_time = attend_time;
        this.late = late;
        this.depart_time = depart_time;
        this.excuse = excuse;
    }
    end_day(excuseFlag) {
        this.depart_time = [new Date().getHours(), new Date().getMinutes()];
        this.excuse = excuseFlag;
        return this.excuse;
    }
}

// array of all reports to each employee
class reportsEmp
{
    static reportNo = 0;
    constructor(object, i) {
        let {id, reportsArr} = object;
        this.id = id;
        this.reportsArr = [];
        if(i) {
            reportsArr.forEach(object => {
                this.reportsArr.push(new reportDay(object))
            });
        }
        else
            this.reportsArr.push(new reportDay({}));

        reportsEmp.reportNo++;
    }
    addTodayReport() {
        this.reportsArr.push(new reportDay({}));
    }
}


///////////////////////// retrieve all reports
let allEmpReports = [];

if (localStorage.getItem("reports") === null) {
    saveReports(allEmpReports);
}
else {
    let oldReports = JSON.parse(localStorage.getItem("reports"));
    oldReports.forEach(object => {
        allEmpReports.push(new reportsEmp(object, 1));
    });
}

saveReports(allEmpReports);


////////////////// 

function lateTime(cTime)
{
    let late = (8-cTime[0])*60 + (30-cTime[1]);
    return [Math.abs(parseInt(late/60)), Math.abs(late%60), late/late]; // -1 && 7 hours >> late
}

function displayTime(timeArr, m='am')
{
    if(timeArr.length==0) return `don't depart yet`;
    else{
        if(timeArr[0]>12) m = 'pm';
        return `${timeArr[0]>12?timeArr[0]-12:timeArr[0]} : ${timeArr[1]} ${m}`;
    }
}

function displayDate(dateArr)
{
    return `${dateArr[2]}/${dateArr[1]+1}/${dateArr[0]}`;
}

///////////////

/* function excuseTime(cTime)
{
    let excuse = (15-cTime[0])*60 + (30-cTime[1]);
    return [Math.abs(parseInt(excuse/60)), Math.abs(excuse%60), excuse/excuse]; // 1 && 7 hours ok // less than 7 hours && 1 >> not ok
} */


function saveReports(allEmpReports)
{
    localStorage.setItem("reports", JSON.stringify(allEmpReports));
}

export {reportsEmp, saveReports, allEmpReports, displayTime, displayDate}
