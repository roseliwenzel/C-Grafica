var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo
var controls; //controle do mouser

var parametrosGUI = {};
var animationFolder;

var elementos = [];

var ground;
var geometriaA;

var lights =[];

var wolfVelocity = 0.05;

//variaveis para animação
var mixer;
var modelReady = false;
var animationActions = Array();
var activeAction;
var lastAction;
var loadFinished;
var clock = new THREE.Clock();


//Var para add a camera com o lobo
var char;

var charBounding;
var charHelper;

var staticBounding = [];

var objLoading = function(){
	loader = new THREE.OBJLoader();

	//carregando Ovelha
	let loaderFBX = new THREE.FBXLoader();
	loaderFBX.load(
		'assets/Sheep.fbx',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['ove'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshLambertMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/UVSheep.png")}
						);
						child.castShadow = true;
						child.receiveShadow = true;
					}
				}
			);

			 obj.scale.y = 0.02;
			 obj.scale.z = 0.02;
			 obj.scale.x = 0.02;

			obj.position.y = -7.6;
			obj.position.x = -10;
			obj.position.z = 0;

			//obj.rotation.x-=1.35;
			scene.add(new THREE.BoxHelper(obj, 0xffff00));

			scene.add(obj);

			obj.children[0].geometry.computeBoundingBox();
			let objBox = new THREE.Box3().setFromObject(obj.children[0]);
			staticBounding.push(objBox);
			console.log("Carregou Ovelha");

		},//Oque acontece quando terminar!
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},//O que acontece enquanto esta carregando
		function(error){
			console.log(" Deu merda!: "+ error);
		}//o que acontece se der merda.
	);

	//Load do Wolf
	loaderFBX.load(
		'assets/wolf/Wolf.fbx',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['wolf'] = obj;

			let animation;

			mixer = new THREE.AnimationMixer(obj);
			animation = mixer.clipAction(obj.animations[0]);
			animationActions.push(animation);

			animation = mixer.clipAction(obj.animations[1]);
			animationActions.push(animation);

			animation = mixer.clipAction(obj.animations[2]);
			animationActions.push(animation);

			animation = mixer.clipAction(obj.animations[3]);
			animationActions.push(animation);

			animation = mixer.clipAction(obj.animations[4]);
			animationActions.push(animation);

			animation = mixer.clipAction(obj.animations[5]);
			animationActions.push(animation);

			activeAction = animation;

			//adiciona as animações a GUI
			animationFolder.add(parametrosGUI, "idle");
			animationFolder.add(parametrosGUI, "sit");
			animationFolder.add(parametrosGUI, "run");
			animationFolder.add(parametrosGUI, "walk");
			animationFolder.add(parametrosGUI, "creep");
			animationFolder.add(parametrosGUI, "seiNao");

			
			obj.traverse( function (child){
					
					if (child instanceof THREE.Mesh){
						//child.material = new THREE.MeshStandardMaterial();
						child.material.map = new THREE.TextureLoader().load("assets/wolf/Wolf_Body.jpg");
						
						child.material.shininess = 0;
						child.castShadow = true;
						child.receiveShadow = true;
						console.log("Aqui lol");
					}
				}
			);

			 obj.scale.y = 0.1;
			 obj.scale.z = 0.1;
			 obj.scale.x = 0.1;

			obj.position.y = -7.5;

			char = new THREE.Group();
			char.add(camera);
			char.add(obj);
			
			obj.rotation.y-= Math.PI;
			charHelper =  new THREE.BoxHelper(obj, 0xff0000);
			scene.add(charHelper);

			charObj = obj;

			obj.children[0].geometry.computeBoundingBox();
			let objBox = new THREE.Box3().setFromObject(obj.children[0]);
			// scene.add(objBox);
			charBounding = objBox;


			scene.add(char);
			console.log("Carregou Wolf");
			loadFinished = true;

		});


	for (i=0;i<10;i++)
		loader.load(
		'assets/tree.obj', //arquivo que vamos carregar
		function(object){
			
			object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material = new THREE.MeshLambertMaterial();
							child.material.map = new THREE.TextureLoader().load("assets/texturas/Wood.jpg");
							child.material.shininess = 0;
							child.castShadow = true;
							child.receiveShadow = true;
						}
					});

			object.scale.x =50;
			object.scale.y = 50;
			object.scale.z = 50;

			object.position.z = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
			object.position.x = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
			
			object.position.y = -7;


			//object.rotation.y += 1;

			object.castShadow = true;
			scene.add(new THREE.BoxHelper(object, 0xffff00));
			object.children[0].geometry.computeBoundingBox();
			let objBox = new THREE.Box3().setFromObject(object.children[0]);
			staticBounding.push(objBox);

		// camera.lookAt(objCarregado.position)

			scene.add(object);    
		},//metodo, tudo deu certo
		function( andamento) {
			console.log((andamento.loaded / andamento.total *100) + "% pronto!");
		},//metodo executa enquanto carrega
		function (error){
			console.log("Deu caca: " + error);
		} //metodo deu merda
	);



};
//troca a ação do nosso modelo
const setAction = function(toAction) {
    if (toAction != activeAction) {
        lastAction = activeAction;
        activeAction = toAction;
        lastAction.stop();
        activeAction.reset();
        activeAction.play();
    }
}

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

	parametrosGUI = {
		scalarPuppet: 1,
		positionX: 0,
		positionY: -6,
		positionZ: 0,
		ambientLight: 1,
		sunLight: 1,

		skyColor : "#000000",
		groundColor: "#006400",

		geometrias: "",
		modelGui: "",
		walk: function () {
            setAction(animationActions[1]);
			wolfVelocity = 0.05;
        },
        run: function () {
            setAction(animationActions[0]);
			wolfVelocity = 0.2;
        },
        sit: function () {
            setAction(animationActions[3])
        },
        creep: function () {
            setAction(animationActions[5])
        },
        idle: function () {
            setAction(animationActions[4])
        },
        seiNao: function () {
            setAction(animationActions[2])
        }
	};

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


	let opcoes = ['Ovelha','Triceratopis'];
	let comboChange = gui.add(parametrosGUI, 'geometrias').options(opcoes).name("Objetos");
	comboChange.onChange(function(parametro){
			if (parametro == 'Ovelha'){
				camera.lookAt(elementos["ove"].position);
				parametrosGUI.modelGui = "ove";
			}else if (parametro == 'Triceratopis'){
				camera.lookAt(elementos["tri"].position);
				parametrosGUI.modelGui = "tri";
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
			elementos["ove"].traverse( function (child){
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

	animationFolder = gui.addFolder('Animations');


	//gui.add(parametrosGUI, 'b').name("Variavel2");

	//scene.add(gui);
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

	

	// geometriaA = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), new THREE.MeshBasicMaterial({ color: 0xff0000}));
	// geometriaA.position.x = -8;
	// scene.add(geometriaA);
	
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
		
	camera.position.z = 50;
	camera.position.x = 0;
	camera.position.y = 1.7;
	
	createGui();

	//criaMonstro();	

	objLoading();

	animation();

	
	//criar um piso.
	let textureLoad = new THREE.TextureLoader();
	let groundTexture = textureLoad.load("assets/texturas/terrain/grasslight-big.jpg"); //busca a imagem
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping; //quero que ela se repita
	groundTexture.encoding = THREE.sRGBEncoding; //padrão cores, sempre que existir será informado
	groundTexture.repeat.set(25,25); //número de vezes que ela vai se repetir dentro do nosso chão
	
	let materialGround = new THREE.MeshLambertMaterial({map: groundTexture});
	materialGround.normalMap = textureLoad.load("assets/texturas/terrain/grasslight-big-nm.jpg"); //busca a normal, que da noção básica de profundidade
	
	
	ground = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(1000,1000),
		materialGround
	);
	ground.receiveShadow = true;//chao recebe as sombras.
	ground.rotation.x = - Math.PI/2;
	ground.position.y-=7.5;
	scene.add(ground);
	godSaysLightsOn();

	//camera.add(lights["spot"]);

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	scene.fog = new THREE.Fog(0xcce0ff, 100, 500);


	document.addEventListener('keydown', apertouButao);
	document.addEventListener('keyup', soltouBotao);

};



var key_r = false;
var key_space = false;
var key_q = false;
var keys = [];

var soltouBotao = function(e){

	if (e.keyCode == 82){ //r
		key_r = false;
	}
	if (e.keyCode == 32){ //espaço
		key_space = false;
	}
	if (e.keyCode == 81){ //espaço
		setAction(animationActions[1]);
		wolfVelocity= 0.05;
	}
	if (e.keyCode == 38){ //douwn
		keys['down'] = false;
		setAction(animationActions[4]);
		//elementos["puppet"]["tronco"].position.z += 1;
	}
	if (e.keyCode == 40){ // UP
		keys['up'] = false;
		setAction(animationActions[4]);
		
	}
}


var apertouButao =  function(e){
	console.log(e.keyCode);

	if (e.keyCode == 82){ //r
		elementos['cerberus'].rotation.x+=0.1;
		key_r = true;
	}
	if (e.keyCode == 32){ // space
		setAction(animationActions[0]);
		wolfVelocity= 0.2;
	}

	if (e.keyCode == 81){ // q
		key_q = true;		
	}

	if (e.keyCode == 38){ //douwn
		keys['down'] = true;
		setAction(animationActions[1]);
		//elementos["puppet"]["tronco"].position.z += 1;
	}
	if (e.keyCode == 40){ // UP
		setAction(animationActions[1]);
		keys['up'] = true;
		
	}
	if (e.keyCode == 37){ //left
		char.position.x-=0.1;
	}
	if (e.keyCode == 39){ // right
		char.position.x+=0.1;
		
	}
}

var count =0; 
var velocidadeOmbroDireitoC = -0.01;
var velocidadeOmbroDireitoL = -0.01;
var pulando = false;
var velocidadePulo = 0.5;
var altura = -1;
var animation = function (){
	requestAnimationFrame(animation); 

	let delta = clock.getDelta();

	if (loadFinished){
		mixer.update(delta);

		if (keys['up'] == true){
			char.position.z+=wolfVelocity;
		}else if(keys['down'] == true){
			char.position.z-=wolfVelocity;
		}
		charHelper.update();
		charBounding.setFromObject(elementos['wolf'].children[0]);

		//teste de colisao
		staticBounding.forEach(function(item){
			if (item.intersectsBox(charBounding)){
				setAction(animationActions[3]);
				activeAction.clampWhenFinished = true;
				activeAction.loop = THREE.LoopOnce;

				// let cube = elementos['wolf'].children[0];

				//  for (var vertexIndex = 0; vertexIndex < elementos['wolf'].children[0].geometry.vertices.length; vertexIndex++) {
				// 		var localVertex = cube.geometry.vertices[vertexIndex].clone();
				// 		var globalVertex = localVertex.applyMatrix4(cube.matrix);
				// 		var directionVector = globalVertex.sub(cube.position);
	
				// 		var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
				// 		var collisionResults = ray.intersectObjects(elementos);
				// 		if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
				// 			console.log(collisionResults[0].object.name);
				// 			console.log("CHupa");
				// 			collisionResults[0].object.material.transparent = true;
				// 			collisionResults[0].object.material.opacity = 0.4;
				// 		}
				// 	}

				
			}
		});


	}
	


	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function paraRadianos(angulo){
	return angulo * (Math.PI/180);
}

window.onload = this.init