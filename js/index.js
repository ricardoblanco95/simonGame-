
$(document).ready(function(){
  var count = 1;
  var auxCount = 0;
  var colorCount = 0;
  var showCount = 0;
  var alternate = false;
  var idColorArr = [];
  var idHighArr = [];
  var colorArr = ['green','red','blue','yellow'];
  var highColorArr = ['rgb(104,232,98)','rgb(254,82,82)','rgb(0,171,232)','rgb(250,250,84)'];
  var sounds = [new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')];
  var on = false;
  var strict = false;
  var goOn = false;
  var showColors = false;
  var onlyColors = false;
  var strictConfirm = false;
  var randomColor;
  var resetVar = function(){
    count = 1;
    auxCount = 0;
    colorCount = 0;
    showCount = 0;
    alternate = false;
    idColorArr = idColorArr.slice(0,0);
    idHighArr = idHighArr.slice(0,0);
    on = false;
    //strict = false;
    goOn = false;
    showColors = false;
    onlyColors = false;
    clearInterval(randomColor);
    $('#green').css('background-color','rgb(44,232,38)');
    $('#red').css('background-color','rgb(254,22,22)');
    $('#blue').css('background-color','rgb(0,11,232)');
    $('#yellow').css('background-color','rgb(249,249,0)');
    $('.count').text('  ');
    //$('.strict').css('background-color', 'grey');
  };
  var numberFormat = function(num){
    if(num.toString().length===1){
      return '0'+num;
    }else{
      return num;
    }
  };
  var myInterval = function(){
    if(alternate){
      if(showColors){
        if(showCount<idColorArr.length){
          $('#green').css('background-color','rgb(44,232,38)');
          $('#red').css('background-color','rgb(254,22,22)');
          $('#blue').css('background-color','rgb(0,11,232)');
          $('#yellow').css('background-color','rgb(249,249,0)');
          $('#'+idColorArr[showCount]).css('background-color', idHighArr[showCount]);
          switch(idColorArr[showCount]){
                case 'green': sounds[0].play(); break;
                case 'red': sounds[1].play(); break;
                case 'blue': sounds[2].play(); break;
                case 'yellow': sounds[3].play(); break;
                                 }
          showCount++;
          alternate=!alternate;
        }else{
         //alert('ok');
         $('#green').css('background-color','rgb(44,232,38)');
         $('#red').css('background-color','rgb(254,22,22)');
         $('#blue').css('background-color','rgb(0,11,232)');
         $('#yellow').css('background-color','rgb(249,249,0)');
         showColors = false;
         showCount = 0;
    }
      }else if(auxCount<count && showColors === false && onlyColors === false){
        auxCount++;
        $('#green').css('background-color','rgb(44,232,38)');
        $('#red').css('background-color','rgb(254,22,22)');
        $('#blue').css('background-color','rgb(0,11,232)');
        $('#yellow').css('background-color','rgb(249,249,0)');
        var match = Math.floor(4*Math.random());
        $('#'+colorArr[match]).css('background-color', highColorArr[match]);
        sounds[match].play();
        idColorArr.push(colorArr[match]);
        idHighArr.push(highColorArr[match]);
        alternate=!alternate;
      }else{
        goOn = true;
        colorCount = 0;
        //showCount = 0;
        $('#green').css('background-color','rgb(44,232,38)');
        $('#red').css('background-color','rgb(254,22,22)');
        $('#blue').css('background-color','rgb(0,11,232)');
        $('#yellow').css('background-color','rgb(249,249,0)');
        onlyColors = false;
        clearInterval(randomColor);
        //clearInterval(showColors);
        //alert(idColorArr);
      }
    }else{
      $('#green').css('background-color','rgb(44,232,38)');
      $('#red').css('background-color','rgb(254,22,22)');
      $('#blue').css('background-color','rgb(0,11,232)');
      $('#yellow').css('background-color','rgb(249,249,0)');
      alternate=!alternate;
    }
  };
  
  
  $(document).on('click','.start',function(){
    if(on){
      var aux = alternate;
      resetVar();
      alternate = aux;
      on = true;
      $('.count').text(numberFormat(count));
      randomColor = setInterval(function(){myInterval()}, 500);
    }
  });
  
  $(document).on('click','#green,#red,#blue,#yellow',function(){
    //alert($(this).attr('id')===idColorArr[colorCount]);
    if(on){
      switch($(this).attr('id')){
        case 'green': sounds[0].play(); break;
        case 'red': sounds[1].play(); break;
        case 'blue': sounds[2].play(); break;
        case 'yellow': sounds[3].play(); break;
                                }
      }
    if(goOn){
      if($(this).attr('id')===idColorArr[colorCount]){
        colorCount++;
        //alert(colorCount);
        if(colorCount===idColorArr.length){
          count++;
          if(count<20){
              colorCount = 0;
              showColors = true;
              $('.count').text(numberFormat(count));
              randomColor = setInterval(function(){myInterval()}, 500);
            }else{
              count=1;
              alert('Count limit reached.','Congratulations to you and your memory! You reach the count limit!');
              var aux = alternate;
              resetVar();
              alternate = aux;
              on = true;
              $('.count').text('--');
            }
          }
          
       }else{
        //alert('ok');
        showColors = true;
        onlyColors = true;
        if(strict){
          var aux = alternate;
          resetVar();
          alternate = aux;
          on = true;
          $('.count').text(numberFormat(count));
          alert('Wrong sequence (Strict Mode enabled).\nWhoops! You picked the wrong color. Starting from "1" again!');
        }else{
          alert('Wrong sequence.\nWhoops! You picked the wrong color!');
        }
        //goOn = false;
        colorCount = 0;
        randomColor = setInterval(function(){myInterval()}, 500);
      }
    }
  });
  
  $(document).on('click','.strict',function(){
    if(on){
      strict=!strict;
      if(strict){
        $(this).css('background-color', 'yellow');
          if(!strictConfirm){
            $('body').append('<div id="strictDialog" title="About Strict Mode"><p>Once in this mode, if you choose a wrong color in the sequence the counter resets to 1 and the game starts over again. </br></br> </p><input type="checkbox" id="checkStrict" /><span> Don\'t show this message again.</span></div>');
            $("#strictDialog").dialog({
            modal: true,
            width: 450,
            height: 350,  
            resizable: false,
            show: 'fold',
            open: function(event, ui) {
      $(this).closest('.ui-dialog').find('.ui-dialog-titlebar-close').hide();
    }, 
            buttons: [{
                text: "I Understand!",
                click : function (){
                  //alert($('#myCheckbox').prop('checked'));
                  if($('#checkStrict').prop('checked')){
                    strictConfirm = true;
                  }
                  $(this).remove();
                }

            }]
         });
        }
      }else{
        $(this).css('background-color', 'grey');
      }
    }
  });
  
  $(document).on('click','#on,#off',function(){
    var onFunc = function(){
      if(!on){
        on = true; 
        $('#on').css('background-color', 'rgb(66,66,255)'); 
        $('#off').css('background-color','black');
        $('.count').text('--');
      }
    };
    var offFunc = function(){
      on = false;
      strict = false;
      $('#on').css('background-color','black'); 
      $('#off').css('background-color','rgb(66,66,255)');
      $('.strict').css('background-color', 'grey');
      resetVar();
    };
    $(this).attr('id')==='on' ? onFunc() : offFunc();
  });
  
  //Events for click and hold a color.
  $('#green,#blue,#red,#yellow')
  .mouseup(function() {
    //goOn = true;
    if(on){
      switch($(this).attr('id')){
        case 'green': $(this).css('background-color','rgb(44,232,38)'); break;
        case 'red': $(this).css('background-color','rgb(254,22,22)'); break;
        case 'blue': $(this).css('background-color','rgb(0,11,232)'); break;
        case 'yellow': $(this).css('background-color','rgb(249,249,0)'); break;  
                               };
    }
  })
  .mousedown(function() {
    //goOn = false;
    if(on){
      switch($(this).attr('id')){
        case 'green': $(this).css('background-color','rgb(104,232,98)'); break;
        case 'red': $(this).css('background-color','rgb(254,82,82)'); break;
        case 'blue': $(this).css('background-color','rgb(0,171,232)'); break;
        case 'yellow': $(this).css('background-color','rgb(250,250,84)'); break;  
                               };
    }
  });
  
});