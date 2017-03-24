  var openVideo = function(e,ee,marker){
  	// connect robot let robot open the webbrowser
  	robot_id = "robot_1"; 
  	control_id = "robot_2"
  	url = "http://192.168.3.222/peerjstest/examples/index2.html"
  	start_communicate(url, robot_id, control_id)
  	// open a web page 
    window.open('http://192.168.3.222/peerjstest/examples/index.html', 'newwindow','height=490,width=660,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
 }