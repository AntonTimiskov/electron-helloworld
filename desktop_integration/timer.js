var time = new Date();

setInterval(function(){
  time = new Date();
}, 100);

module.exports.getTime = function(){

  return time;
}
