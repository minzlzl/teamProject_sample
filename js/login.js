const arrowBtn = document.querySelector('.con1_txt>figure:nth-of-type(2)>img'),
      con1Wrap = document.querySelector('.login_con1_wrap'),
      con2Wrap = document.querySelector('.login_con2_wrap')


arrowBtn.onclick = function(){
  con1Wrap.style = 'display:none';
  con2Wrap.style = 'display:block';
};