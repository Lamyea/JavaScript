<head>
	<title>Assighnment 2.js</title>

<head>

<body>

    <script src="https://code.jquery.com/jquery-3.1.0.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.1/dat.gui.min.js"></script>
	<script src="https://unpkg.com/three@0.85.0/examples/js/controls/OrbitControls.js"></script>
	<script type="text/javascript">

	// set the scene size
	var WIDTH = 600, HEIGHT = 500;
	// set some camera attributes
	var VIEW_ANGLE = 70, ASPECT = WIDTH / HEIGHT, NEAR = 1, FAR = 1000;
    var scene = new THREE.Scene();
	// create a WebGL renderer, camera, and a scene
    var renderer = new THREE.WebGLRenderer({antialias: true});
    // start the renderer

	renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

	// attach the render-supplied DOM element

	document.body.appendChild(renderer.domElement);
	
    scene.background = new THREE.Color( 0xf0f0ff );
	var clock = new THREE.Clock();
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE,ASPECT,NEAR,FAR);
	// the camera starts at 0,0,0 so pull it back
     camera.position.z = 40;
       camera.position.y= 15;
	// add the camera to the scene
	scene.add(camera)
    // create a point light
    var light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 5, 20, 9 );
    light.castShadow = true; 
    
      scene.add( light );

    var ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
      
	// set up the camera controls.  Please keep in mind that what this does is move the entire scene around.

	// because the entire scene is moving the position of the camera and lights in relation to objects within 

	// the scene doesn't change so the lighting on the surface of the object(s) will not change either

	var cameraControls = new THREE.OrbitControls(camera, renderer.domElement);

	cameraControls.addEventListener( 'mousemove', renderer );

    cameraControls.autoRotate = true;  
     var planeGeometry = new THREE.PlaneGeometry(180,40,180);
     var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xFF660F });  
     var plane = new THREE.Mesh(planeGeometry, planeMaterial);
     // make the plane recieve shadow from the cube
     plane.receiveShadow = true;
     plane.rotation.x = -0.3 * Math.PI;
     plane.position.y = -20;
     scene.add(plane);  
    
     var mat = new THREE.MeshPhongMaterial({color: 0x006600});
     var geo = new THREE.BoxGeometry(5,5,5);
      
    // Create the mesh with the geometry and the material
     var cube = new THREE.Mesh(geo, mat); 
     cube.castShadow = true; //default is false
     cube.receiveShadow = false;
    // Add the cube to the scene 
     scene.add(cube);
      
  
    
   
      // Creates variable with the edge measurements so that
      // the cube bounces back correctly
      var edge = 20;
      
      // Defines variables for velocity (how fast the cube moves) and time
      // (how many timesteps)
      var velX = 1, velY = .6;
      var time = 0.25;
     
    // Create the variable for the cube rotation AND motion 
     var render = function () {
          
    // Define how fast the cube will rotate
      cube.rotation.x += 0.01; 
      cube.rotation.y += 0.01;
    // Define how the cube translates in the scene
      cube.position.x += velX * time;
      cube.position.y += velY * time;
       
    // Check if the cube reached one of the edges and in that case
    // make it bounce back (by making it move in the opposite
    // direction) and change color.
       if (cube.position.x >= edge || cube.position.x <= -edge)
         {velX = -velX;
          mat.color.setHex( Math.random() * 0xFA45FF);
         }
      
       if (cube.position.y >= edge || cube.position.y <= -edge)
         {velY = -velY;
         mat.color.setHex( Math.random() * 0xDA75FF);
         }
      renderer.render(scene, camera);
    };
      
  

    

	// Standard functions for rendering the scene.  Notice how we have the animate function 

	// which submits a call to requestAnimationFrame to call animate.   This creates a loop

	// that will render the scene again whenever something within the scene changes.

	// add the camera
	scene.add(camera);
    
 
	// draw!
    function animate() {
        requestAnimationFrame(animate);
	    render();
    }
    function render() {
        cameraControls.update();
	    renderer.render(scene, camera);
    }
    animate();
	</script>
  </body>
</html>