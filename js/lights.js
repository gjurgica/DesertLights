let scene,camera,renderer,plane,light;
let ADD = 0.008,theta = 0;

window.addEventListener("resize",function(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/this.innerHeight;
    camera.updateProjectionMatrix();
});


let createGeometry = function(){
    let texture = new THREE.TextureLoader().load('./images/sand.jpg');
    let geometry = new THREE.BoxGeometry(1000, 1, 1000);
    let material = new THREE.MeshLambertMaterial({map:texture});

    plane = new THREE.Mesh(geometry,material);
    plane.position.y = -1;
    plane.receiveShadow = true;

    scene.add(plane);
    scene.add(createPyramid(0,0,0,30,35));
    scene.add(createPyramid(10,0,-20,35,40));
    scene.add(createPyramid(30,0,-30,25,30));
    scene.add(createPyramid(-15,0,-15,35,40));
};

let createPyramid = function(x,y,z,width,height){
let texture = new THREE.TextureLoader().load('./images/pyramid.jpg');
let geometry = new THREE.CylinderGeometry(0,width,height,4);
let material = new THREE.MeshLambertMaterial({map:texture});
let pyramid = new THREE.Mesh(geometry,material);
pyramid.position.set(x,y,z);
pyramid.castShadow = true;
pyramid.receiveShadow = true;
return pyramid;
}
let init = function(){
    scene = new THREE.Scene();
    let sky = new THREE.TextureLoader().load('./images/sky.jpg');
    scene.background = sky;
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set(0,10,40);

    light = new THREE.DirectionalLight(0xffffff,1);
    light.castShadow = true;
    light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50,1,10,2500));
    light.shadow.bias = 0.0001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 1024;
    light.position.set(10,20,0);
    scene.add(light);

    createGeometry();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    document.body.appendChild( renderer.domElement );
};

let mainLoop = function() {
    light.position.x = 20 * Math.sin(theta);
    light.position.y = 20* Math.cos(theta);
    theta += ADD;
     renderer.render(scene,camera);
     requestAnimationFrame(mainLoop);
 };
 init();
 mainLoop();