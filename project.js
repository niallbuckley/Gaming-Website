(function() {
  
  var canvas;
  var context;
  var width;
  var height;
  var interval_id;
  var player = {
    x: 250,
    y: 350,
    size: 25,
    yChange: 10
  };
  var obstacle = {
    size : 25,
    x : 300,
    y : 120
  };  
  var obstaclelist = [];
  var moveRight = false;
  var moveLeft = false;
  
  var Imageready = false;
  
  var counter = 0
 
  var bulletsImage = new Image();
  
  
  var turnspot = {
    x : 0,
    y : 0
    
  };
  
  bulletsImage.onload = function(){
    Imageready = true;}
    
  bulletsImage.src = "bullet.png"
  
  var jetpackImage = new Image();
  
  jetpackImage.onload = function(){
    Imageready = true;}
 
  jetpackImage.src = "jetpack.png";
      
  var ps = []; 
  var xChange = getRandomNumber(-10, 10);
  
    
  document.addEventListener('DOMContentLoaded', init, false);
  
  function init() {   
        canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;
	    window.addEventListener("keydown", activate, false);
        interval_id = window.setInterval(draw, 60);
    }
    
    
  function draw() {
       context.clearRect(0, 0, width, height);
         if (obstaclelist.length < 10) {
            var p = {
                x : width, 
                y : getRandomNumber(0, height), 
                size : 10,
                xChange : getRandomNumber(-10, -1), 
                yChange : 0 
	    };
	    obstaclelist.push(p);
	 }
	 
	counter++;
	console.log(counter);
	
	
	for (var i = 0; i < obstaclelist.length; i += 1) {
             context.drawImage(bulletsImage, obstaclelist[i].x, obstaclelist[i].y);
	     if (collides(obstaclelist[i],player)){
             window.alert("Game Over!");
	         stop(); 
	    }
    }
    
    for (var i = 0; i < obstaclelist.length; i += 1) {
            obstaclelist[i].x = obstaclelist[i].x + obstaclelist[i].xChange;
            obstaclelist[i].y = obstaclelist[i].y + obstaclelist[i].yChange;
            if (obstaclelist[i].x <= -obstaclelist[i].size) {
                obstaclelist[i].x = width;
            }
	}
	
	for (var i = 0; i < ps.length; i += 1) {
            if (collides(ps[i])) {
                window.alert("Game Over!");
                stop();
            }
    }
        
        
    drawplayer();
    player.y = player.y + player.yChange;
	
	
    if (player.yChange < 10){
	    player.yChange += 1;
	    console.log(99);
	}
	
    if (moveRight) {
	    turnspot.x = player.x;
	    turnspot.y = player.y;
            player.x += 10;  
	    player.yChange = -10;
	    moveRight = false;
    }
    
    if (moveLeft) {
	    turnspot.x = player.x;
	    turnspot.y = player.y;
	    player.x -= 10;
	    player.yChange = -10;
	    moveLeft = false;
	}
        
	if (player.x+player.size > width) {
	    window.alert("Game Over!");
        stop();
	}
	if (player.x < 0) {
	    window.alert("Game Over!");
        stop();
	    
	}
	if (player.y < 0) {
        window.alert("Game Over!");
	    stop();
	}
	if (player.y+player.size > height) {
        window.alert("Game Over!");
	    stop();
	}
  }
  
  function activate(event) {
      var ekeyCode = event.keyCode;
      if (ekeyCode === 39) {
	   moveUp = false
	   moveLeft = false
	   moveRight = true
	   moveDown = false
      }  else if (ekeyCode === 37) {
	    moveLeft = true
	    moveRight = false
	    moveDown = false
	    moveUp = false
      }
    
  }
  function drawplayer(){
    if(Imageready){
    context.drawImage(jetpackImage, player.x, player.y);}
  }    
  
      
  function collides(p,player) {
        if (player.x + player.size < p.x ||
            p.x + p.size < player.x ||
            player.y > p.y + p.size ||
            p.y > player.y + player.size) {
            return false;
        } else {
            return true;
        }
   }
    
      
   function stop() {
        clearInterval(interval_id);
   }
   
   function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
   
})();
