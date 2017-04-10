var _this = this

function createXmlHttpRequest(){
  if (window.ActiveXObject) { //如果是IE浏览器
    return new ActiveXObject("Microsoft.XMLHTTP")
  } else if (window.XMLHttpRequest) { //非IE浏览器
    return new XMLHttpRequest();
  }
}

module.exports = function uploadFile(f, type, fn){
  var file = document.getElementById(f.id).files[0]
  var filename = file.name
  $('#filename').val(filename)
  var k = file.name.substr(file.name.lastIndexOf('.'))
  //.doc.docx.ppt.pptx.xls.xlsx.txt.rtf.ppt.bmp.png.jpg.jpeg.zip.prt.stp.dxf.dwg.sch.pcb.dsn.brd
  if (type === 1) {
    // 上传头像
    var url1 = 'https://apl-static.oss-cn-beijing.aliyuncs.com'
    if(!/.(png|jpg|jpeg|gif|ico)$/.test(k)){
       $('.xs').text('文件格式有误')
       $('.xs').stop().animate({'top': '10px'}, 100)
       setTimeout(function(){
          $('.xs').stop().animate({'top':'-53px'}, 200)
       }, 1500)
       return false
     } else {
        var fd = new FormData()
        $.ajax({
          url:'/main/api/v1/sts_info',
          success:function(e){
            e.key=e.key + k
            for(var i in e){
               fd.append(i,e[i])
            }
            fd.append("file", file)

            $.ajax({
              url: 'https://apl-static.oss-cn-beijing.aliyuncs.com',
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
                $('.xs').stop().animate({'top':'10px'}, 100)
                setTimeout(function(){
                  $('.xs').stop().animate({'top':'-53px'}, 200)
                }, 1500)
              }
            })
          }
       })
     }
  } else {
    var url1 = 'https://apl-docs.oss-cn-beijing.aliyuncs.com'
    if(!/.(doc|docx|ppt|pptx|xls|xlsx|txt|rtf|ppt|bmp|png|jpg|jpeg|zip|prt|stp|dxf|dwg|sch|pcb|dsn|brd|pdf)$/.test(k)){
       $('.xs').text('文件格式有误')
       $('.xs').stop().animate({'top': '10px'}, 100)
       setTimeout(function(){
          $('.xs').stop().animate({'top':'-53px'}, 200)
       }, 1500)
       return false
     } else {
        var fd = new FormData()
        $.ajax({
          url:'/main/api/v1/sts_info',
          success:function(e){
            e.key=e.key + k
            for(var i in e){
               fd.append(i,e[i])
            }
            fd.append("file", file)
            $.ajax({
              url: 'https://apl-static.oss-cn-beijing.aliyuncs.com',
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
                $('.xs').stop().animate({'top':'10px'}, 100)
                setTimeout(function(){
                  $('.xs').stop().animate({'top':'-53px'}, 200)
                }, 1500)
              }
            })
          }
       })
     }
  }
}
