<!DOCTYPE html>
<html>

<head>


    <title>Programming Assignment Unit 5 </title>


</head>

<body>
    <div id="object">
        
    </div>




</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.5/dat.gui.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js"></script>
<script src="https://unpkg.com/three@0.85.0/examples/js/controls/OrbitControls.js"></script>
<script src="https://unpkg.com/three@0.85.0/examples/js/controls/TransformControls.js"></script>
<script src="https://cdn.rawgit.com/mrdoob/three.js/master/examples/js/Detector.js"></script>
<script src="https://code.jquery.com/jquery-1.11.3.js"></script>
<script type="text/javascript">
  
    // first setting the size of the scene
    var WIDTH = 450, HEIGHT = 430;
  
    // setting the camera attribute for the scene
    var VIEW_ANGLE = 50, ASPECT = WIDTH / HEIGHT, NEAR = 1, FAR = 2000;
  
    // Attaching DOM element. 
   
    var $object = $('#object');
    
  //creating renderer to render everything
    var renderer = new THREE.WebGLRenderer({antialias: true});
  
  //enabling the shadow for the object
    renderer.shadowMap.enabled = true;
  
  //making the shadow softer which won't show pixel at the background
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  
    
    var scene = new THREE.Scene();
  //setting the background
    scene.background = new THREE.Color(0xf0f0ff);
    var clock = new THREE.Clock();
  
  
    //setting the camera
    var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.z = 190;
    scene.add(camera)
    
    
    //setting the camera controls
    var cameraCntrls = new THREE.OrbitControls(camera, renderer.domElement);
//fixing the objects and plane
    cameraCntrls.enabled = false;
  
    //setting the rendersize 
    renderer.setSize(WIDTH, HEIGHT);
    // putting to DOM element
    $object.append(renderer.domElement);

  //now creating the plane
    var planeGeometry = new THREE.PlaneBufferGeometry(310, 310, 35, 35);
    var planeMaterial = new THREE.MeshStandardMaterial({color: 0x4E4E62, side: THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, -220);
  //code to receive shadow in plane
    plane.receiveShadow = true;
  //adding the plane to the scene
    scene.add(plane);

    // create a point light and add to scene
    var light = new THREE.SpotLight(0xffffff);
  //casting shadow 
    light.castShadow = true;
    light.position.set(27, 27, 225);
    scene.add(light);
    light.shadow.mapSize.height = 500;
    light.shadow.mapSize.width = 400; 
     

   //starting to create methane molecule
    var methane = new THREE.Object3D();
   
    //creating the carbon for the model
    var carbonGeometry = new THREE.SphereBufferGeometry(22, 30, 30); 
    var carbonMaterial = new THREE.MeshStandardMaterial({color: 0xCC0000});
    var carbon = new THREE.Mesh(carbonGeometry, carbonMaterial);
    carbon.castShadow = true;
    carbon.receiveShadow = true;
    methane.add(carbon);
  
  //creating hydrogen
    var hydrogenGeometry = new THREE.SphereBufferGeometry(10, 20, 20);
    hydrogenGeometry.translate(0, 30, 0);
    var hydoMaterial = new THREE.MeshStandardMaterial({color: 0x5DB6FF});
    var hydrogen = new THREE.Mesh(hydrogenGeometry, hydoMaterial);
    hydrogen.castShadow = true;
    hydrogen.receiveShadow = true;
    var bondGeometry = new THREE.CylinderGeometry(3.5, 3.5, 20, 18);
    bondGeometry.translate(0, 15, 0);
    var bondMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
    var bond = new THREE.Mesh(bondGeometry, bondMaterial);
    bond.castShadow = true;
    bond.receiveShadow = true;
  
  //creating model to combine everything
   
    var model = new THREE.Object3D();
    model.add(hydrogen);
    model.add(bond);
   
    var first = model.clone();
    first.position.setY(15);
    methane.add(first);
    var second = model.clone();
    second.position.setY(-12);
    second.position.setZ(12);
    second.rotateX(Math.PI * 3 / 4);
    methane.add(second);
    var third = model.clone();
    third.position.setX(10);
    third.position.setY(-10);
    third.position.setZ(-10);
    third.rotateZ(Math.PI * 4 / 3);
    third.rotateX(Math.PI * 7/4);
    methane.add(third);

    var fourth = model.clone();
    fourth.rotateZ(Math.PI * 2 / 3);
    fourth.rotateX(Math.PI * 7 / 4);
    fourth.position.setX(-10);
    fourth.position.setZ(-10);
    fourth.position.setY(-10);
    methane.add(fourth);
  //adding the whole object into the scene
    scene.add(methane);
  
  //I commented below code as it does not require but it makes the methane object fun
  //if you want, you can watch the transform control of methane
  //for scaling the methane 
    //controls = new THREE.TransformControls(camera,renderer.domElement);
    //        controls.attach(methane);
	//		scene.add(controls)


    //Using mouse to rotate the molecule only not the plane
  
    var dragobject = false;
    var initialMousePosition = {x: 0, y: 0, z: 0};
    const toDegrees = (angle) => {return angle * (180 / Math.PI);};
    const toRadians = (angle) => {return angle * (Math.PI / 180);};
  //renderarea
    const renderArea = renderer.domElement;
  //setting the eventlistener
    renderArea.addEventListener('mousedown', (e) => {dragobject = true; });
    renderArea.addEventListener('mousemove', (e) => {var deltaMove = { x: e.offsetX - initialMousePosition.x, y: e.offsetY - initialMousePosition.y, z: e.offsetZ - initialMousePosition.z};
        if (dragobject) {
            let deltaRotationQuaternion = new THREE.Quaternion().
            setFromEuler(
                new THREE.Euler(toRadians(deltaMove.y * 1), toRadians(deltaMove.x * 1), 0, 'XYZ')
            );
            methane.quaternion.multiplyQuaternions(deltaRotationQuaternion, methane.quaternion);
        }
        initialMousePosition = {x: e.offsetX, y: e.offsetY, z: e.offsetZ  };
    });
    document.addEventListener('mouseup', (e) => {dragobject = false; });
  
//animating the whole things into the scene
    function animate() {
        requestAnimationFrame(animate);
        render();
    }
    function render() {
        cameraCntrls.update();
        renderer.render(scene, camera);
    }
    animate();
</script>

</html>  