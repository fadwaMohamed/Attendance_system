window.addEventListener('load', function() {

    document.getElementById("menu").addEventListener('click', function() {
        document.getElementsByTagName("aside")[0].style.display = 'block';
    })

    document.getElementsByClassName("close")[0].addEventListener('click', function() {
        document.getElementsByTagName("aside")[0].style.display = 'none';
    })

    // to close aside if width > 900px
    window.addEventListener('resize', function() {
        if(window.innerWidth>900) document.getElementsByTagName("aside")[0].style.display = 'none';
    })
    // all employees
    for(let i=0; i<2; i++)
        document.getElementsByClassName("allR")[i].addEventListener('click', function() {
            if(location.pathname != '/HTML/allEmployees.html') 
                setTimeout('location.href= "../HTML/allEmployees.html"', 200);
        })
    // full reports
    for(let i=0; i<2; i++)
        document.getElementsByClassName("fullR")[i].addEventListener('click', function() {
            if(location.pathname != '/HTML/fullReport.html') 
                setTimeout('location.href= "../HTML/fullReport.html"', 200);
        })
    // late reports
    for(let i=0; i<2; i++)
        document.getElementsByClassName("lateR")[i].addEventListener('click', function() {
            if(location.pathname != '/HTML/lateReport.html') 
                setTimeout('location.href= "../HTML/lateReport.html"', 200);
        })
    // excuse reports
    for(let i=0; i<2; i++)
        document.getElementsByClassName("excuseR")[i].addEventListener('click', function() {
            if(location.pathname != '/HTML/excuseReport.html') 
                setTimeout('location.href= "../HTML/excuseReport.html"', 200);
        })
    // notifications (new employees)
    document.getElementsByClassName("fa-bell")[0].addEventListener('click', function() {
        if(location.pathname != '/HTML/notifications.html') 
            setTimeout('location.href= "../HTML/notifications.html"', 200);
    })
    // log out 
    document.getElementsByClassName("fa-sign-out")[0].addEventListener('click', function() {
        setTimeout('location.replace("../HTML/login.html")', 200);
    })

});
