/**
 * Created by guojingfeng on 2016/12/20.
 */
var data = mockData;

//  通过类名和ID获取DOM对象的工具函数
function g( string ) {
  return (string.substring(0,1) == ".") ? document.getElementsByClassName(string.substring(1)) : document.getElementById(string.substring(1));
}
/**
 * 画廊模板生成函数
 */
(function createTemplate() {
  var template = g(".wrap")[0].innerHTML;// 获取模板字符串
  var html = [];//  生成的HTML数组
  var element;//  根据模板生成的元素
  for (var s in data){
    element = template.replace(/\{\{index\}\}/ig, s)
                           .replace(/\{\{src\}\}/ig, data[s].fileName)
                           .replace(/\{\{title\}\}/ig, data[s].title)
                           .replace(/\{\{desc\}\}/ig, data[s].desc)
    html.push(element)
  }
  g(".wrap")[0].innerHTML = html.join('')
  positionResort(getRandom([0,html.length-1]))
})()

/**
 * 重新排布所有图片的位置，并根据索引生成居中图片
 * @param index 元素的索引位置
 */
function positionResort( index ){
  var container = g(".wrap")[0];
  var _elements = g('.photo-stack')
  var elements = [];//  图片数组对象

  for (var i = 0; i < _elements.length; i++){
    //  去除已有的居中类名   /\s*photo-stack-center\s*/  同时去除多余的空格
    _elements.className = _elements[i].className.replace(/\s*photo-stack-center\s*/,' ')
    elements.push(_elements[i])
  }
  //  选定居中的图片
  elements[index].className += ' photo-stack-center'

  //  元素的宽度和高度
  var photoWidth = elements[0].offsetWidth,
      photoHeight = elements[0].offsetHeight,
      wrapWidth = container.offsetWidth,
      wrapHeight = container.offsetHeight;
  //  左边位置限定
  var leftPosition = {
    left: [0 - photoWidth/2, wrapWidth/2 - photoWidth/2*3],//  [最小值,最大值]
    top: [0 - photoHeight/2, wrapHeight + photoHeight/2]
  }
  //  右边位置限定
  var rightPosition = {
    left: [wrapWidth/2 + photoWidth/2, wrapWidth + photoWidth/2],//  [最小值,最大值]
    top: leftPosition.top,//  与左半部分高度一致
  }
  //  中间上边部分的两边特殊位置,待定

  elements.splice(index,1)//  去除中间图片的对象
  for (var j = 0,k = elements.length/2; j < elements.length; j++){
    if (j < k){// 左半部分图片位置
      elements[j].style.left = getRandom(leftPosition.left) + 'px'
      elements[j].style.top = getRandom(leftPosition.top) + 'px'
    }else {
      elements[j].style.left = getRandom(rightPosition.left) + 'px'
      elements[j].style.top = getRandom(rightPosition.top) + 'px'
    }
  }
}

/**
 * 返回一个给定范围的随机数
 * @param array 给定范围的数组
 * @returns {number}  随机数
 */
function getRandom( array ) {
  var min = Math.min(array[0],array[1]);//  获取数组中较小值
  var max = Math.max(array[0],array[1])//  获取数组中较大值

  return Math.ceil(Math.random()*(max-min) + min)
}
