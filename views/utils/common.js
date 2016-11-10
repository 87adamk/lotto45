function mobileResize() {
    var myWidth = 0, myHeight = 0;

    if( typeof( window.innerWidth ) == 'number' ) {
      //Non-IE
      myWidth = window.innerWidth;
      myHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
      //IE 6+ in 'standards compliant mode'
      myWidth = document.documentElement.clientWidth;
      myHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
      //IE 4 compatible
      myWidth = document.body.clientWidth;
      myHeight = document.body.clientHeight;
    }
   
    // div 에 쌓여진 영역 화면 조정 
    var deviceWidth = myWidth;
    document.getElementById('main').style.width = deviceWidth + "px";
  }

  function bubbleSort(array)
  {
      var swapped;
      do {
          swapped = false;
          for (var i=0; i < array.length-1; i++) {
              if (array[i] > array[i+1]) {
                  var temp = array[i];
                  array[i] = array[i+1];
                  array[i+1] = temp;
                  swapped = true;
              }
          }
      } while (swapped);
  }

  function makeNumber() {
     // 6개의 로또 번호를 저장할 배열
      var lotto = new Array(6);
     // 추첨된 로또번호의 갯수
      var count = 0;
     // 번호중복 방지용 변수
     var mFlag = true;
     // 6개의 로또번호를 얻을때까지 반복
     while(count < 6)
     {
       var number;
       // 랜덤번호 추출
       number = parseInt(Math.random()*45)+1
       // 중복확인
       for(var i=0; i<count; i++)
          if(lotto[i] == number) mFlag = false;
       // 중복된 번호가 아니면 로또 번호배열에 추가
       if(mFlag)
       {
            lotto[count] = number;
            count++;
       }
       mFlag = true;
     } 

     bubbleSort(lotto);

     for(var i=0; i<6; i++) {

        var id = "number_field_"+(i+1);
        $("#"+id).attr("src", "http://www.nlotto.co.kr/img/common/ball_"+lotto[i]+".png");
     }
  }