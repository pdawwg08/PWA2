// Javascript Document
$( document ).ready(function() {
	
$('#tabs p').hide().eq(0).show();
$('#tabs p:not(:first)').hide();
$('#tabs-nav li').click(function(e) {
    e.preventDefault();
    $('#tabs p').hide();
    $('#tabs-nav .current').removeClass('current');
    $(this).addClass('current');
    var clicked = $(this).find('a:first').attr('href');
    $('#tabs ' + clicked).fadeIn('fast');
}).eq(0).addClass('current');

$('.masterTooltip').hover(function(){
    var title = $(this).attr('title');
    $(this).data('tipText', title).removeAttr('title');
    $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow')
}, function() {
    $(this).attr('title', $(this).data('tipText'));
    $('.tooltip').remove();
}).mouseover(function(e) {
    var mousex = e.pageX + 20;
    var mousey = e.pageY + 10;
    $('.tooltip')
        .css({top:mousey, left: mousex })
});

$('.modalClick').on('click', function(event){
    console.log("Modal was clicked");
    event.preventDefault();
    $('#overlay')
        .fadeIn()
        .find('#modal')
        .fadeIn();
});
$('.close').on('click', function(event){
    event.preventDefault();
    $('#overlay')
        .fadeOut()
        .find('#modal')
        .fadeOut();
});

$('.masterTooltip').hover(function(){
    var title = $(this).attr('title');
    $(this).data('tipText',title).removeAttr('title');
    $('<p class="tooltip"></p>')
    .text(title)
    .appendTo('body')
    .fadeIn('slow');
}, function() {
    $(this).attr('title', $(this).data('tipText'));
    $('.tooltip').remove();
}).mousemove(function(e) {
    var mousex = e.pageX + 20;
    var mousey = e.pageX + 10;
    $('tooltip')
    .css({ top: mousey, left: mousex })
});
    
    $('#signinButton').click(function(){
        var user = $('#user').val();
        var pass = $('#pass').val();
        console.log("This notifies you if the password is working");
        $.ajax({
            url:'xhr/login.php',
            type: 'post',
            dataType: 'json',
            data: {
                username: user,
                password: pass
            },
            success:function(response){
               console.log("Test User");
                if (response.error){
                    alert(response.error);
                }else{
                    window.location.assign('admin.html')
                };
            }
        });
    });
    
    $('#logOut').click(function(e){
        e.preventDefault;
        $.get('xhr/logout.php', function(){
            window.location.assign('index.html')
        })
    });
    
    $('#register').on('click', function(){
        var firstname= $('#first').val(),
            lastname= $('#last').val(),
            username= $('#userName').val(),
                email= $('#email').val(),
            password= $('#password').val();
        console.log(firstname+' '+lastname+' '+username+' '+email+' '+password);
        
        $.ajax({
            url: 'xhr/register.php',
            type: 'post',
            dataType: 'json',
            data: {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password
            },
            
            success: function(response){
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign('admin.html');
                }
            }
        });
    });
    
    
    $('.projectsbtn').on('click', function(e) {
        e.preventDefault();
        window.location.assign('projects.html');
    });
    $('#dashboard').on('click', function(e) {
        e.preventDefault();
        window.location.assign('admin.html');
    });
    
    
    $.getJSON("xhr/check_login.php", function(data){
        console.log(data);
        $.each(data, function(key, val){
            console.log(val.first_name);
            $(".userid").html("Welcome User: "+ val.first_name);
        })
    });
    
    $('#addButton').on('click', function(){
        var projName = $('#projectName').val(),
            projDesc = $('#projectDescription').val(),
            projDue = $('#projectDueDate').val(),
            status = $('input[name = "status"]:checked').prop("id");
        $.ajax({
            url: "xhr/new_project.php",
            type: "post",
            dataType: "json",
            data: {
                projectName: projName,
                projectDescription: projDesc,
                dueDate: projDue,
                status: status
            },
            success: function(response){
                console.log('Testing for success');
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign("projects.html");
                };
            }
        });
    });
    
    
    var projects = function(){
        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                if(response.error){
                    console.log(response.error);
                }else{
                    for(var i=0, j=response.projects.length; i < j; i++){
                        var result = response.projects[i];
                        $(".projects").append("<div style='border:1px solid black' class='ui-state-default'>" +" <input class='projectid' type='hidden' value='" + result.id + "'>" + "Project Name: " + result.projectName +"<br>" + "Project Description: " + result.projectDescription + "<br>" + "Project Status: " + result.status + "<br>" + "<button class='deletebtn'>Delete</button>" + "<button class='editbtn'>Edit</button>" +"</div> <br>");
                    };
                    $('.deletebtn').on('click', function(){
                        console.log('test delete');
                        $.ajax({
                            url: 'xhr/delete_project.php',
                            data: {
                                projectID: result.id
                            },
                            type: "post",
                            dataType: "json",
                            success: function(response){
                                console.log('Testing for success');
                                if(response.error){
                                    alert(response.error);
                                }else{
                                   window.location.assign("projects.html");
                                };
                            }
                         });
                    });
                }
            }
        })
    }

projects();
    
$(".mydatepicker").datepicker();
    
$("#sortable").sortable();
$("#sortable").disableSelection();

$("input[type=submit], button")
.button()
.click(function(event){
    event.preventDefault();
});
    
    
});