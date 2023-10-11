const arrowBtn = document.querySelector('.con1_txt'),
      con1Wrap = document.querySelector('.login_con1_wrap'),
      con2Wrap = document.querySelector('.login_con2_wrap')


arrowBtn.onclick = function(){
  con1Wrap.style = 'display:none';
  con2Wrap.style = 'display:block';
  var typingBool2 = false; 
  var typingIdx2=0; 

  // 타이핑될 텍스트를 가져온다 
  var typingTxt2 = $(".typing_txt2").text(); 

  typingTxt2=typingTxt2.split(""); // 한글자씩 자른다. 

  if(typingBool2==false){ 
    // 타이핑이 진행되지 않았다면 
    typingBool2=true;     
    var tyInt2 = setInterval(typing2,100); // 반복동작 
  } 

  function typing2(){ 
    if(typingIdx2<typingTxt2.length){ 
      // 타이핑될 텍스트 길이만큼 반복 
      $(".typing2").append(typingTxt2[typingIdx2]);
      // 한글자씩 이어준다. 
      typingIdx2++; 
    } else{ 
      //끝나면 반복종료 
      clearInterval(tyInt2); 
    } 
  }
};