require(['jquery', 'module1', 'math', 'underscore', 'modernizr'], function ($, m1, math, _, mo) {
  m1.init();
  math.add(5, 8);
  // jquery
  console.log($);
  // modernizr
  console.log(mo);

  // underscore
  console.info(_.map([1, 2, 3], function (num) {
    return num * 3;
  }));

  $('#testBtn').click(function () {
    $.ajax({
      url: '/rest/hh/121',
      type: 'get',
      dataType: 'json',

      success: function (result) {

        console.log(result);

        $('#data-box').val(JSON.stringify(result));
      }
    });
  })

  $('#testBtn1').click(function () {
    $.ajax({
      url: '/rest/other',
      type: 'get',
      data: {
        id: 232322
      },
      dataType: 'json',
      success: function (result) {
        console.log(result);
        $('#data-box').val(JSON.stringify(result));
      }
    });
  })

  $('#testBtn2').click(function () {
    $.ajax({
      url: '/rest/login',
      type: 'post',
      data: {
        account: 'zjzhome1',
        password: '123456'
      },
      dataType: 'json',
      success: function (result) {
        console.log(result);
        $('#data-box').val(JSON.stringify(result));
      }
    });
  })

  $('#testBtn3').click(function () {
    $.ajax({
      url: '/rest/com',
      type: 'get',
      dataType: 'json',
      success: function (result) {
        console.log(result);
        $('#data-box').val(JSON.stringify(result));
      }
    });
  })

  $('#testBtn4').click(function () {
    $.ajax({
      url: '/api/v1/topics',
      type: 'get',
      beforeSend: function () {
        $('.tips').show();
      },
      complete: function () {
        $('.tips').hide();
      },
      success: function (result) {
        console.log(result);
        $('#data-box').val(JSON.stringify(result));
      }
    });
  })


});