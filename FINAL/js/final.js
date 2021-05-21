var objLoading = function(){
  createSkeleton();
  createVolcano();
  createDemon();
  createTreeScene();
  createZombie();

};

var ambientLightOn = function (){
	lights['ambient'] = new THREE.AmbientLight(0xffffff,0.5);
	scene.add(lights['ambient']);
}

var hemisphereLightOn = function(){
	lights['hemisphere'] = new THREE.HemisphereLight(0xcce0ff, 0xffffff, 1);
	scene.add(lights['hemisphere']);
}

var directionalLightOn = function () {
	let light = new THREE.DirectionalLight(0xffffff,1);
	light.castShadow = true;
	light.shadow.mapSize.width = 4096;
	light.shadow.mapSize.height = 4096;
	light.shadow.camera.left = 1000;
	light.shadow.camera.bottom = 1000;
	light.shadow.camera.right = -1000
	light.shadow.camera.top = -1000;

	light.position.y = 200;
	light.position.x = 100;
	light.target = ground;


	scene.add(light);
	scene.add(light.target)

	lights['directional'] = light;
}

var spotLightOn = function(){
	let spot = new THREE.SpotLight(0xffffff, 0);
	spot.angle = 0.3;
	spot.castShadow = true;

	spot.position.z = 40;
	spot.position.y = 15;

	spot.shadow.distance = 20;
	spot.shadow.penumbra = 30;
	spot.shadow.angle = 25;
	
	spot.target.position.set(0,5,0);

	lights['spot'] = spot;
	scene.add(spot);
}

var pointLightOn = function (){
	let point = new THREE.PointLight(0xffffff, 3, 200);
	lights['point'] = point;
	point.castShadow = true;
	point.position.y=10;
	point.position.z = 10;

	scene.add(point);
}

var godSaysLightsOn = function (){
	//hemisphereLightOn();
	directionalLightOn();
	//spotLightOn();
	//pointLightOn();
	ambientLightOn();
}


var createGui = function (){
	const gui = new dat.GUI();

	let fazScala = gui.add(parametrosGUI, 'scalarPuppet').min(0.1).max(2).step(0.1).name("Scale");
	fazScala.onChange(function (parametro){
			elementos[parametrosGUI.modelGui].scale.x = parametro;
			elementos[parametrosGUI.modelGui].scale.y = parametro;
			elementos[parametrosGUI.modelGui].scale.z = parametro;
		}
	);

	let intensidadeLuz = gui.add(parametrosGUI, 'ambientLight').min(0).max(2).step(0.1).name("Ambient Light");
	intensidadeLuz.onChange(function (parametro){
			lights['ambient'].intensity = parametro;
		}
	);

	let sunLight = gui.add(parametrosGUI, 'sunLight').min(0).max(2).step(0.1).name("Sun Light");
	sunLight.onChange(function (parametro){
			lights['directional'].intensity = parametro;
		}
	);

	let opcoes = ['Demon', 'Zombie'];
	comboChange = gui.add(parametrosGUI, 'geometrias').options(opcoes).name("Objetos").setValue("Demon");
	comboChange.onChange(function(parametro){
			if (parametro == 'Demon'){
				camera.lookAt(elementos["dem"].position);
				parametrosGUI.modelGui = "dem";
			} else if (parametro == 'Zombie') {
				camera.lookAt(elementos['zbm'].position);
				parametrosGUI.modelGui = "zbm";
			}
		}
	);

	let folderPosition = gui.addFolder("Position");

	let positionX = folderPosition.add(parametrosGUI, 'positionX').min(0).max(600).step(15).name("Position X");
	positionX.onChange(function (parametro){
		lights['directional'].position.x = parametro;
		}
	);
	let positionY = folderPosition.add(parametrosGUI, 'positionY').min(0).max(600).step(15).name("Position Y");
	positionY.onChange(function (parametro){
		lights['directional'].position.y = parametro;
		}
	);
	let positionZ = folderPosition.add(parametrosGUI, 'positionZ').min(0).max(600).step(15).name("Position Z");
	positionZ.onChange(function (parametro){
			lights['directional'].position.z = parametro;
		}
	);

	let colorFolder = gui.addFolder('Coloros');
	let sColor = colorFolder.addColor(parametrosGUI, 'skyColor').name("Dollie's Color");
	sColor.onChange(function (parametro){
			elementos["skl"].traverse( function (child){
				if (child.isMesh){
					child.material.color = new THREE.Color(parametro);
				}
			}
		);  
		}
	);

	let gColor = colorFolder.addColor(parametrosGUI, 'groundColor').name("Ground");
	gColor.onChange(function (parametro){
			ground.material.color.setHex(parametro.replace("#", "0x"));
		}
	);

	animationFolderDemon  = gui.addFolder('Animations Demon');
	animationFolderZombie = gui.addFolder('Animations Zombie');

	gui.open();
}

var init = function (){
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xcce0ff);
	
	
//	Camera em perspectiva
	camera = new THREE.PerspectiveCamera(
						50, // view angle
						window.innerWidth/window.innerHeight, //aspect ratio
						1, //near
						500 //far
					);
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
		
	camera.position.z = 50;
	camera.position.x = 0;
	camera.position.y = 1.7;
	
	createGui();

	objLoading();

	animation();

	
	//criar um piso.
	let textureLoad = new THREE.TextureLoader();
	let groundTexture = textureLoad.load("assets/texturas/terrain/lava.jpg"); //busca a imagem
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping; //quero que ela se repita
	groundTexture.encoding = THREE.sRGBEncoding; //padrão cores, sempre que existir será informado
	groundTexture.repeat.set(25,25); //número de vezes que ela vai se repetir dentro do nosso chão
	
	let materialGround = new THREE.MeshLambertMaterial({map: groundTexture});
	materialGround.normalMap = textureLoad.load("assets/texturas/terrain/lava.jpg"); //busca a normal, que da noção básica de profundidade
	
	
	ground = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(1000,1000),
		materialGround
	);
	ground.receiveShadow = true;//chao recebe as sombras.
	ground.rotation.x = - Math.PI/2;
	ground.position.y-=7.5;
	scene.add(ground);
	godSaysLightsOn();

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.zoomSpeed = 0.5;

	scene.fog = new THREE.Fog(0xcce0ff, 100, 500);

	document.addEventListener('keydown', apertouButao);
	document.addEventListener('keyup', soltouBotao);

};

var soltouBotao = function(e){

	if (e.keyCode == 82){ //r
		key_r = false;
	}
	if (e.keyCode == 32){ //espaço
		key_space = false;
	}
	if (e.keyCode == 81){ //espaço
		setAction(animationActionsDemon[4]);
		demonVelocity = 0.05;
	}
	if (e.keyCode == 38){ //douwn
		keys['down'] = false;
		setAction(animationActionsDemon[0]);
		demonVelocity = 0.2;
	}
	if (e.keyCode == 40){ // UP
		keys['up'] = false;
		setAction(animationActionsDemon[0]);
		demonVelocity = 0.2;		
	}
}

var apertouButao =  function(e){
	console.log(e.keyCode);

	if (e.keyCode == 82){ //r
		key_r = true;
	}
	if (e.keyCode == 32){ // space
		if (comboChange.getValue() == 'Demon') {
			setAction(animationActionsDemon[0]);
			demonVelocity = 0.5;
		}
	}

	if (e.keyCode == 81){ // q
		key_q = true;		
	}

	if (e.keyCode == 38){ //douwn
		keys['down'] = true;
		if (comboChange.getValue() == 'Demon') {
		  setAction(animationActionsDemon[3]);
		  demonVelocity = 0.4;
		}
	}
	if (e.keyCode == 40){ // UP
		if (comboChange.getValue() == 'Demon') {
		  setAction(animationActionsDemon[3]);
		  demonVelocity = 0.4;
		}
		keys['up'] = true;
	}
	if (e.keyCode == 37){ //left
		if (comboChange.getValue() == 'Demon') {
		  charD.rotation.y += 0.1;
			sentido(-1);
		}
	}
	if (e.keyCode == 39){ // right
		if (comboChange.getValue() == 'Demon') {
		  charD.rotation.y -= 0.1;
			sentido(1);
		}		
	}
}

var count =0; 

var animation = function (k=0){
	requestAnimationFrame(animation); 

	let delta = clock.getDelta();
	

	if (loadFinishedD && loadFinishedZ){
		mixer.update(delta);
		mixerZ.update(delta);

		if (keys['up'] == true){
			charD.position.z+= demonVelocity*sentidoz[posicaoSentido];
			charD.position.x+= demonVelocity*sentidox[posicaoSentido];
		}else if(keys['down'] == true){
			charD.position.z-= demonVelocity*sentidoz[posicaoSentido];
			charD.position.x-= demonVelocity*sentidox[posicaoSentido];
		}
	}

	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function sentido(direcao){
	if (direcao == -1){
		if(posicaoSentido == 0){
			posicaoSentido = 63;
		}
		else{
			posicaoSentido -=  1;
		}
	}
	else{
		if(posicaoSentido == 63){
			posicaoSentido = 0;
		}
		else{
			posicaoSentido +=  1;
		}
	}

}

window.onload = this.init