 var ros = new ROSLIB.Ros({
     url: 'ws://192.168.3.222:9090'
 });

 ros.on('connection', function() {
     console.log('Connected to websocket server.');
     //document.getElementById('btn_connect_robot').firstChild.data = "Connected";
     connected = 1
 });

 ros.on('error', function(error) {
     console.log('Error connecting to websocket server: ', error);
     //document.getElementById('btn_connect_robot').firstChild.data = "Connection error";
 });

 ros.on('close', function() {
     console.log('Connection to websocket server closed.');
     //document.getElementById('btn_connect_robot').firstChild.data = "Disconnected";
     connected = 0;
 });

 var gps_listener = new ROSLIB.Topic({
     ros: ros,
     name: '/gps',
     messageType: 'std_msgs/String'
 });

 var audio_listener = new ROSLIB.Topic({
     ros:ros,
     name:'/audio/audio',
     messageType: 'audio_common_msgs/AudioData'
 }
 );

var parameter_listener = new ROSLIB.Topic({
     ros: ros,
     name: '/parameters',
     messageType: 'std_msgs/String'
 });

 var publisher_job = new ROSLIB.Topic({
     ros: ros,
     name: '/job',
     messageType: 'std_msgs/String'
 });

// Define objects for communication 
function ControlObject (bearing) {
    this.bearing           = bearing;
}

function CommunicateObject(url, robot_id, control_id)
{
     this.url            = url; 
     this.robot_id       = robot_id;
     this.control_id     = control_id; 
}

var publisher_control = new ROSLIB.Topic({
     ros: ros,
     name: '/control',
     messageType: 'std_msgs/String'
});

var publisher_init_job = new ROSLIB.Topic(
{
     ros:ros, 
     name:"/init_job",
     messageType: 'std_msgs/String'

});

 var publisher_communicate = new ROSLIB.Topic({
     ros: ros,
     name: '/communicate',
     messageType: 'std_msgs/String'
 });


  var publisher_command = new ROSLIB.Topic({
     ros: ros,
     name: '/keyboard',
     messageType: 'std_msgs/String'
 });


 function publish_job(str) {
     var twist = new ROSLIB.Message({
         data: str
     });
     publisher_job.publish(twist);
 }

 function publish_command(str) {
     var command = new ROSLIB.Message({
         data: str
     });
     publisher_command.publish(command);
 }

// Init robot to it's original position, all the parameters are set to correct state 

 function init_robot()
 {
     //publish_command("Init");
     console.log('Init robot to starting state');
 }


 function execute() {
     publish_command('Demo');
     console.log('Perform demo job');
 }

 function forward() {
     publish_command('Forward');
     console.log('Robot forwarding ');
 }

function pause() {
     publish_command('Pause');
     console.log('Pause robot');
 }


function resume() {
     publish_command('Resume');
     console.log('Resume Robot ');
 }

 function backward() {
     publish_command('Back');
     console.log('Robot backwarding');
 }

 function on_off(){
     publish_command('Switch');
     console.log('Eanble/Distable robot');
 }

 function left_turn() {
     publish_command('Turn_West');
     console.log('Left turn');
 }

 function right_turn() {
     publish_command('Turn_East');
     console.log('Right turn');
 }

 function turn_and_move(bearing)
 {
     var control_object = new ControlObject(bearing);
     var json = JSON.stringify(control_object);
     console.log(json)
     var twist = new ROSLIB.Message({
         data: json
     });
     publisher_control.publish(twist);
 }

// Start communicate with the robot, send the necessary information to the robot to start video calls
 function start_communicate(url, robot_id, control_id)
 {
     var comm_object = new CommunicateObject(url, robot_id, control_id);
     var json = JSON.stringify(comm_object); 
     console.log(json)
     var twist = new ROSLIB.Message({
         data: json
     });
     publisher_communicate.publish(twist);
 }