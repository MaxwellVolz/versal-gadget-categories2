//global vars
var textArray = [];
var textArrayObjs = [];
var learnerState = true;
var wordCount = 0;

var player = new VersalPlayerAPI();
player.on('attributesChanged', function (attrs) {
    console.log('attributesChanged', attrs);

});

player.on('editableChanged', function (editableObj) {
    if (editableObj.editable) {
        //Author State
        refreshBtn();
        learnerState = false;
        $(".catBtn,.catBtn2,.killBtn,#insertWordBtn").show();
        $("textarea").removeAttr("readOnly");
        $("textarea").attr("onclick", "this.focus();this.select()");
        // $("textarea").prop("onclick", null);
        $("#draggable, #draggable1, #draggable2, #draggable3, #draggable4, #draggable5").draggable("option", "cancel", "button");
    } else {
        //Learner State
        learnerState = true;
        $(".catBtn,.catBtn2,.killBtn,#insertWordBtn").hide();
        $("textarea").attr("readOnly", true);
        $("textarea").editable = false;

        $('textarea').mouseover(function () {
            $(this).css({cursor: 'default'});
        });
        //$("textarea").prop("onclick", null);
        //$("textarea").prop("onclick", "this.focus();this.select()");
        $("#draggable, #draggable1, #draggable2, #draggable3, #draggable4, #draggable5").draggable("option", "cancel", "text");
        saveBank();
    }
});

// send this command to receive initial events
player.startListening();

// continuously watch for changes in height
player.watchBodyHeight();

// save a textarea


// change textarea when attributes change
player.on('attributesChanged', function (attrs) {


    if (attrs) {
        //textarea.value = attrs.textareaValue;
        loadBank(attrs);
        //textArrayObj[2].value = attrs.word2x
        //textarea.value = textArray[0];

    }
});

$('body').on('click', 'div.catBtn', function () {
    if ($(this).parent().hasClass("cat1")) {
        $(this).html("2").parent().removeClass("cat1").addClass("cat2");
    }
    else {
        $(this).html("1").parent().removeClass("cat2").addClass("cat1");
    }
});
$(window).bind("load", function () {


    $(function () {
        //Make drag class draggable
        $(".drag").draggable({
            revert: "invalid",
            cancel: "text",
            snap: ".snapper",
            snapMode: "inner"});

        //Category 1 stickiness
        $("#droppable>.snapper").droppable({
            accept: ".cat1",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {
                $(this).addClass("ui-state-highlight");
                checkWin();
            }
        });

        //Category 2 stickiness
        $("#droppable2>.snapper").droppable({
            accept: ".cat2",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {
                //$(this).append("#droppable2");
                $(this).addClass("ui-state-highlight");
                checkWin();
            }
        });

        //Toggle categories for word bank

        $("div#insertWordBtn").click(function () {
            //$( ".inner" ).prepend( "<p>Test</p>" );
            if (!learnerState && wordCount < 5) {
                ++wordCount;
                var newCard = $("<div class='drag cat1'><div class='catBtn' id='word'" + wordCount + ">1</div><textarea id='dragText'>New</textarea><div class='killBtn'>&#x2716;</div></div>");
                newCard.css({opacity:"0",top:"-100px"}).insertAfter("#insertWordBtn").animate({
                    top: "0px",
                    opacity: "1"}
                    , 1000 );
                //newCard.attr("readonly",true);

                myVar = setTimeout(function () {
                    refreshBtn();
                }, 300);
                console.log(wordCount);
            }
        })

        $('#insertWordBtn').mouseover(function(){
            $(this).css({cursor: 'default'});
        });


    });
});

function refreshBtn() {

    //$(".catBtn").attr("cursor","default");

    $('.catBtn, .killBtn').mouseover(function () {
        $(this).css({cursor: 'default'});
    });

    $(".killBtn").click(function () {
        --wordCount;
        $(this).delay(200).fadeOut(1000);
        $(this).parent().animate({
            "opacity": "0",
            "top":"-100px"
        }, {
            "complete": function () {
                $(this).remove();
            }
        });

        console.log("killed one!");
        wordCheck();
        console.log(wordCount);
    });
    $(".drag").draggable({
        revert: "invalid",
        cancel: "text",
        snap: ".snapper",
        snapMode: "inner"});


}


function wordCheck() {
    wordCount = 0;
    if ($('.drag')) {
        $('.drag').each(function () {
            ++wordCount;
        });
    }
    else {
        wordCount = 0;
    }

}

//find and save textareas
function saveBank() {

    //empty array
    textArray = [];

    $('textarea').each(function () {
        textArrayObjs.push(this);
        textArray.push(this.value);

    });


}

function loadBank(attrs) {
    //alert(player.attr("word1x"));
    //alert(textArrayObjs[1].value);


}

function checkWin() {
    var x = 0;
    $('.ui-state-highlight').each(function () {
        ++x;
        if (x >= 6) {
            //catHeader depreciated
            //$("#catHeader>textarea").val("Great Job!");
        }

    });
    x = 0;
}




