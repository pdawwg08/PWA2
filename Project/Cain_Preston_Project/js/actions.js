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
    });
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
            }
        }
    });
});