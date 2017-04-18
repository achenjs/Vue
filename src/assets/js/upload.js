//  限制大小。  图片5M，文件100M

function createXmlHttpRequest(){
  if (window.ActiveXObject) { //如果是IE浏览器
    return new ActiveXObject("Microsoft.XMLHTTP")
  } else if (window.XMLHttpRequest) { //非IE浏览器
    return new XMLHttpRequest()
  }
}

function upload (obj, fn) {
  var fd = new FormData()
  var t = new Date().getTime()
  $.ajax({
    url:'/main/api/v1/sts_info?time=' + t,
    success:function(e){
      e.key = e.key + obj.k
      e["x:filename"] = obj.filename
      for(var i in e){
         fd.append(i, e[i])
      }
      fd.append("file", obj.file)

      $.ajax({
        url: obj.url,
        data: fd,
        processData: false,
        cache: false,
        async: false,
        contentType: false,
        type: 'post',
        success: function(result) {
          var obj = result.obj
          if (obj) {
            $('#hiddens').val(obj)
            $('#url').val(obj)
            $('.xs').text('上传成功')
            $('.xs').stop().animate({'top': '10px'}, 100)
            setTimeout(function(){
               $('.xs').stop().animate({'top': '-53px'}, 200)
            },1500)
            fn && fn()
          }
        },
        error: function(err) {
          $('.xs').text('上传失败')
          $('.xs').stop().animate({'top': '10px'}, 100)
          setTimeout(function(){
            $('.xs').stop().animate({'top': '-53px'}, 200)
          }, 1500)
        }
      })
    }
  })
}

module.exports = function uploadFile(f, type, fn){
  var file = document.getElementById(f.id).files[0]

  var size = file.size / 1024 / 1024

  var filename = file.name

  $('#filename').val(filename)
  // document.getElementById('#filename').value = filename

  var k = file.name.substr(file.name.lastIndexOf('.'))
  if (type === 1) {
    // 上传头像
    var URL = 'https://apl-static.oss-cn-beijing.aliyuncs.com'
    if (size > 5) {
      $('.xs').text('文件大小超过5M')
      $('.xs').stop().animate({'top': '10px'}, 100)
      setTimeout(function(){
         $('.xs').stop().animate({'top': '-53px'}, 200)
      }, 1500)
      return false
    } else if(!/.(png|jpg|jpeg|gif|ico)$/.test(k)){
       $('.xs').text('文件格式有误')
       $('.xs').stop().animate({'top': '10px'}, 100)
       setTimeout(function(){
          $('.xs').stop().animate({'top': '-53px'}, 200)
       }, 1500)
       return false
     } else {
        upload({k: k, file: file, filename: filename, url: URL}, fn)
     }
  } else {
    var URL = 'https://apl-docs.oss-cn-beijing.aliyuncs.com'
    if (size > 100) {
      $('.xs').text('文件大小超过100M')
      $('.xs').stop().animate({'top': '10px'}, 100)
      setTimeout(function(){
         $('.xs').stop().animate({'top':'-53px'}, 200)
      }, 1500)
      return false
    } else if(!/.(doc|docx|ppt|pptx|xls|xlsx|txt|rtf|ppt|bmp|png|jpg|jpeg|zip|prt|stp|dxf|dwg|sch|pcb|dsn|brd|pdf)$/.test(k)){
       $('.xs').text('文件格式有误')
       $('.xs').stop().animate({'top': '10px'}, 100)
       setTimeout(function(){
          $('.xs').stop().animate({'top':'-53px'}, 200)
       }, 1500)
       return false
     } else {
        upload({k: k, file: file, filename: filename, url: URL}, fn)
     }
  }
}
