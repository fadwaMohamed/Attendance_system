window.addEventListener('load', function() {

    // all employees
    document.getElementsByClassName("allR")[0].addEventListener('click', function() {
        if(location.pathname != '/HTML/allEmployees.html') 
            setTimeout('location.href= "../HTML/allEmployees.html"', 200);
    })
    // full reports
    document.getElementsByClassName("fullR")[0].addEventListener('click', function() {
        if(location.pathname != '/HTML/fullReport.html') 
            setTimeout('location.href= "../HTML/fullReport.html"', 200);
    })
    // late reports
    document.getElementsByClassName("lateR")[0].addEventListener('click', function() {
        if(location.pathname != '/HTML/lateReport.html') 
            setTimeout('location.href= "../HTML/lateReport.html"', 200);
    })
    // excuse reports
    document.getElementsByClassName("excuseR")[0].addEventListener('click', function() {
        if(location.pathname != '/HTML/excuseReport.html') 
            setTimeout('location.href= "../HTML/excuseReport.html"', 200);
    })
        
    // notifications (for new employees)
    document.getElementsByClassName("notification")[0].addEventListener('click', function() {
        if(location.pathname != '/HTML/notifications.html') 
            setTimeout('location.href= "../HTML/notifications.html"', 200);
    })
    // log out 
    document.getElementsByClassName("logOut")[0].addEventListener('click', function() {
        setTimeout('location.replace("../HTML/login.html")', 200);
    })

});
