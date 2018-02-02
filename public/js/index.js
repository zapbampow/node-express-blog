$(document).ready(function(){

    // When clicking the reply under a comment, gets the link's value(comment author's name), and autofills that into the comment textarea
    $('a.reply').click(function() {
        var replyValue = $(this).attr("value");
        $('#comment-text').html("@" + replyValue);
    })
    
    // Search functionality for search bar
    // $('#search-bar').keypress(function(e){
    //     var keycode = (e.keyCode ? e.keyCode : e.which);
        
    //     if(keycode == '13') {
    //         console.log()
    //     }
    // })
    
})

    
