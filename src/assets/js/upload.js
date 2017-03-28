var _this = this

function createXmlHttpRequest(){
  if (window.ActiveXObject) { //如果是IE浏览器
    return new ActiveXObject("Microsoft.XMLHTTP")
  } else if (window.XMLHttpRequest) { //非IE浏览器
    return new XMLHttpRequest();
  }
}

function uploadComplete(evt){
   $('.xs').text('上传成功')
   $('.xs').stop().animate({'top': '10px'}, 300)
   setTimeout(function(){
      $('.xs').stop().animate({'top': '-50px'}, 300)
   },1500)
    var obj = JSON.parse(evt.target.responseText).obj
    if (obj) {
      $('#hiddens').val(obj)
      $('#url').val(obj)
    }
}

function uploadFailed(evt) {
   $('.xs').text('上传失败')
   $('.xs').stop().animate({'top':'10px'}, 300)
   setTimeout(function(){
     $('.xs').stop().animate({'top':'-50px'}, 300)
   }, 1500)
}

module.exports = function uploadFile(f, type, fn){
  var url1 = 'https://apl-docs.oss-cn-beijing.aliyuncs.com'
  var file = document.getElementById(f.id).files[0]
  var k = file.name.substr(file.name.lastIndexOf('.'))
  //.doc.docx.ppt.pptx.xls.xlsx.txt.rtf.ppt.bmp.png.jpg.jpeg.zip.prt.stp.dxf.dwg.sch.pcb.dsn.brd
  if (type === 1) {
    // 上传头像
    if(!/.(png|jpg|jpeg)$/.test(k)){
       $('.xs').text('文件格式有误')
       $('.xs').stop().animate({'top': '10px'}, 300)
       setTimeout(function(){
          $('.xs').stop().animate({'top':'-50px'}, 300)
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
            var xhr = createXmlHttpRequest()
            xhr.addEventListener("load", uploadComplete, false)
            xhr.addEventListener("error", uploadFailed, false)
            xhr.open('POST', url1, true)
            xhr.send(fd)
            setTimeout(function() {
              fn && fn()
            }, 3000)
          }
       })
     }
  } else {
    if(!/.(doc|docx|ppt|pptx|xls|xlsx|txt|rtf|ppt|bmp|png|jpg|jpeg|zip|prt|stp|dxf|dwg|sch|pcb|dsn|brd)$/.test(k)){
       $('.xs').text('文件格式有误')
       $('.xs').stop().animate({'top': '10px'}, 300)
       setTimeout(function(){
          $('.xs').stop().animate({'top':'-50px'}, 300)
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
            var xhr = createXmlHttpRequest()
            xhr.addEventListener("load", uploadComplete, false)
            xhr.addEventListener("error", uploadFailed, false)
            xhr.open('POST', url1, true)
            xhr.send(fd)
            setTimeout(function() {
              fn && fn()
            }, 3000)
          }
       })
     }
  }
}
