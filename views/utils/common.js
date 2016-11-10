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
   
    // div �� �׿��� ���� ȭ�� ���� 
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
     // 6���� �ζ� ��ȣ�� ������ �迭
      var lotto = new Array(6);
     // ��÷�� �ζǹ�ȣ�� ����
      var count = 0;
     // ��ȣ�ߺ� ������ ����
     var mFlag = true;
     // 6���� �ζǹ�ȣ�� ���������� �ݺ�
     while(count < 6)
     {
       var number;
       // ������ȣ ����
       number = parseInt(Math.random()*45)+1
       // �ߺ�Ȯ��
       for(var i=0; i<count; i++)
          if(lotto[i] == number) mFlag = false;
       // �ߺ��� ��ȣ�� �ƴϸ� �ζ� ��ȣ�迭�� �߰�
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