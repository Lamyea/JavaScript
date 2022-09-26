<head>

	<title>Assignment #4 </title>



<head>



<body>



  

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js"></script>

    <script src="https://unpkg.com/three@0.85.0/examples/js/controls/OrbitControls.js"></script>

    <script src="https://unpkg.com/three@0.85.0/examples/js/controls/TransformControls.js"></script>

	<script type="text/javascript">



	//setting the size of scene

	var WIDTH = 700, HEIGHT = 500;

    //Setting camera attribute 

	var VIEW_ANGLE = 15, ASPECT = WIDTH / HEIGHT, NEAR = 1, FAR = 1000;

    //creating a WebGL renderer, camera, and a scene

    var scene = new THREE.Scene();

    //start the renderder

	var renderer = new THREE.WebGLRenderer({antialias: true});

    scene.background = new THREE.Color( 0xf0f0ff );

	var clock = new THREE.Clock()

    //setting the camera perspective

	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE,ASPECT,NEAR,FAR);        

    camera.position.y = -200;

    camera.position.z = 100;

    

	scene.add(camera)

    renderer.setPixelRatio( window.devicePixelRatio );

	renderer.setSize(WIDTH, HEIGHT);

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type = THREE.PCFShadowMap;



      // attach the render-supplied DOM element

      

	document.body.appendChild(renderer.domElement);    

    //setting cameraControls  

    var camc = new THREE.OrbitControls(camera, renderer.domElement);

	camc.addEventListener( 'mousemove', renderer );

    

   



    //creating plane to show shadow 

     var planeGeometry = new THREE.PlaneGeometry(300,200,20);

     var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xFF660F });  

     var plane = new THREE.Mesh(planeGeometry, planeMaterial);

     // make the plane recieve shadow from the cube

     plane.receiveShadow = true;

     plane.position.z = -10;

     plane.position.x = -10;

     plane.rotation.x = Math.PI / 10;

     scene.add(plane);  

      

     cntrl = new THREE.TransformControls(camera,renderer.domElement);

     



    //creating first object which is colored with a texture



    var texture = new THREE.TextureLoader().load( 'data:image/jpeg;base64,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' );

    var cen =  new THREE.SphereGeometry(6,50,50);

    var mat1 = new THREE.MeshBasicMaterial({ map: texture });

    sphere = new THREE.Mesh(cen, mat1);

    sphere.position.z = 0;

    sphere.position.x = -30;

    sphere.receiveShadow = true;

    sphere.flatshading = true;

    sphere.castShadow =true;

    scene.add(sphere);

    

    //creating secong object which demonstrates transparency. there is a image showing

    var cube = new THREE.BoxGeometry( 8, 8, 8 );

    var mat2 = new THREE.MeshLambertMaterial( { map: texture, transparent: true, opacity: 0.4} );

    var cube1 = new THREE.Mesh(cube, mat2 );

    cube1.position.x = -12;

    cube1.overdraw = true;

    cube1.receiveShadow = true;

      cube1.flatshading = true;

    cube1.castShadow =true;

    scene.add(cube1);  //adding cube1 to canvas

      

     // creating third object which has solid basic color (green color) 

     var mat3 = new THREE.MeshPhongMaterial({color: 0x006600});

     var cube2 = new THREE.Mesh(cube, mat3);  // to set the mesh of cube

     cube2.castShadow = true;  //for shadow

     cube2.receiveShadow = false;

     cube2.flatshading = true;

     cube2.position.x = 5;

     scene.add(cube2);    // adding cube to scene



      

     // creating final object which demonstrates the reflection of the local light source. 

     var mat4 = new THREE.MeshStandardMaterial( { ambient: 0xffffff, color:0x00090ff, specular: 0xffffff, shininess: 10, wireframe: false,  } );

     var cube3 = new THREE.Mesh(cube, mat4 );

     cube3.position.x = 22;

     cube3.overdraw = true;

     cube3.receiveShadow = true;

     cube3.rotation.x = Math.PI/8; 

     cube3.castShadow =true;

     scene.add(cube3);

    

      

      

    var light = new THREE.PointLight( 0xffffff, 1, 200 );  // creating the light point

    light.position.set(7, 5,30 );

    light.castShadow = true; 

    scene.add( light );  //adding the light to screen

    var ambientLight = new THREE.AmbientLight(0xffffff, 1);

    scene.add(ambientLight);

      

    var spotLight = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI/2, 1 );

    spotLight.position.set( -10, -20, -100 );

    spotLight.target.position.set( 0, -30, 0 );

    spotLight.intensity = 1.5

    spotLight.castShadow = true;

    spotLight.shadowMapWidth = 130;

    spotLight.shadowMapHeight = 130;

    spotLight.shadowDarkness = 0.7;

    spotLight.shadowCameraFov = 40;

      

    //defines boundary of box of light

    spotLight.shadowCameraNear = 2;

    spotLight.shadowCameraFar = 5;

    spotLight.shadowCameraLeft = -0.5;

    spotLight.shadowCameraRight = 0.5;

    spotLight.shadowCameraTop = 0.5;

    spotLight.shadowCameraBottom = -0.5;

    scene.add(spotLight);



	// to animate the program

           function animate() {

               camc.update();

               renderer.render(scene, camera);

               requestAnimationFrame(animate);

               

            }

           animate();

	</script>

  </body>

</html>

