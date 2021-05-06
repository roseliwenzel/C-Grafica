var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo
var controls; //controle do mouser

var parametrosGUI = {};

var elementos = [];

var velocidade = 0.07;

var ground;
var geometriaA;


var objLoading = function(){
	loader = new THREE.OBJLoader();

	//carregando Cientista
	loader.load(
		'assets/Scientist.obj',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['cien'] = obj;

			 obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/Scientist.png")}
						);
					}
				}
			); 

			 obj.scale.y = 3;
			 obj.scale.z = 3;
			 obj.scale.x = 3;

			obj.position.y = -4.3;
			obj.position.x = 0;
			obj.position.z = 0;

			//obj.rotation.x-=1.35;

			scene.add(obj);
			console.log("Carregou Cientista");

		},//Oque acontece quando terminar!
		function(andamento){
			console.log("Carregou Cientista: " + (andamento.loaded / andamento.total)*100 + " %" );
		},//O que acontece enquanto esta carregando
		function(error){
			console.log(" Deu merda Cientista!: "+ error);
		}//o que acontece se der merda.
	);

	




	//carrega CERBERUS
	/* loader.load(
		'assets/cerberus/Cerberus.obj',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['cerberus'] = obj;

			let texLoader = new THREE.TextureLoader().setPath("assets/cerberus/");


			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						let material = new THREE.MeshStandardMaterial();
						let materialBase = texLoader.load("Cerberus_A.jpg");
						material.encoding = THREE.sRGBEncoding;
						material.map = materialBase;

						material.normalMap = texLoader.load("Cerberus_N.jpg");
						material.normalMap = texLoader.load("Cerberus_N.jpg");
						material.roughnessMap = texLoader.load("Cerberus_R.jpg");
						material.roughnessMap.wrapS = THREE.RepeatWrapping;

						material.metalnessMap = texLoader.load("Cerberus_M.jpg");
						material.metalnessMap.wrapS = THREE.RepeatWrapping;

						//aterial.displacementMap = texLoader.load("displacement.jpg");
						//material.displacementScale = 2.436143;
						//material.displacementBias = -0.428408;

						child.material = material;
					}
				}
			);

			obj.scale.y = 6;
			obj.scale.z = 6;
			obj.scale.x = 6;

			obj.position.y = 0;
			obj.position.z = 2;
			obj.position.x = 5;

			//obj.rotation.x-=1.35;

			scene.add(obj);
			console.log("Carregou!");

		},//Oque acontece quando terminar!
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},//O que acontece enquanto esta carregando
		function(error){
			console.log(" Deu merda!: "+ error);
		}//o que acontece se der merda.
	); */

 	// carrega rinoceronte , DEU PROBLEMA NA TEXTURA, NÃO PODE USAR
	/* loader.load(
		'assets/Rhino.obj',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['rhino'] = obj;

			//let texLoader = new THREE.TextureLoader().setPath("assets/texturas/");
			obj.traverse( function (child){
				if (child instanceof THREE.Mesh){
					child.material = new THREE.MeshStandardMaterial({
						map: new THREE.TextureLoader().load("assets/texturas/Rhino.png")}
					);
				}
			}
			);

			 obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						let material = new THREE.MeshLambertMaterial({ color: 'purple' });
						let materialBase = texLoader.load("Rhino.png");
						materialBase.opacity = 0.5;
						material.map = materialBase;


						//aterial.displacementMap = texLoader.load("displacement.jpg");
						//material.displacementScale = 2.436143;
						//material.displacementBias = -0.428408;

						child.material = material;
					}
				}
			); 
			obj.scale.y = 6;
			obj.scale.z = 6;
			obj.scale.x = 6;
			
			obj.position.x = 0;
			obj.position.y = 0;
			obj.position.z = 0;

			obj.rotation.x = 0;
			obj.rotation.z = 0;
			obj.rotation.y = 0;

			scene.add(obj);
			console.log("Carregou Rhino 1!");

		},//Oque acontece quando terminar!
		function(andamento){
			console.log("Carregou Rhino 1: " + (andamento.loaded / andamento.total)*100 + " %" );
		},//O que acontece enquanto esta carregando
		function(error){
			console.log(" Deu merda Rhino 1!: "+ error);
		}//o que acontece se der merda.
	); */

	// carrega búfalo, DEU PROBLEMA NA TEXTURA, NÃO PODE USAR
	/* loader.load(
		'assets/Bizon.obj',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['bizon'] = obj;

			//let texLoader = new THREE.TextureLoader().setPath("assets/bison/");

			obj.traverse( function (child){
				if (child instanceof THREE.Mesh){
					child.material = new THREE.MeshStandardMaterial({
						map: new THREE.TextureLoader().load("assets/bison/Bison_texture.png")}
					);
				}
			}
			);

			obj.scale.y = 4;
			obj.scale.z = 4;
			obj.scale.x = 4;
			
			obj.position.x = -40;
			obj.position.y = -7;
			obj.position.z = -3;

			obj.rotation.x = 0;
			obj.rotation.z = 0;
			obj.rotation.y = -4;

			scene.add(obj);
			console.log("Carregou Bufalo 1!");

		},//Oque acontece quando terminar!
		function(andamento){
			console.log("Carregou Bufalo 1: " + (andamento.loaded / andamento.total)*100 + " %" );
		},//O que acontece enquanto esta carregando
		function(error){
			console.log(" Deu merda Bufalo 1!: "+ error);
		}//o que acontece se der merda.
	); */


	let loaderFBX = new THREE.FBXLoader();
	//carregando Ovelha
	loaderFBX.load(
		'assets/Sheep.fbx',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['ove'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/UVSheep.png")}
						);
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

			scene.add(obj);
			console.log("Carregou Ovelha");

		},//Oque acontece quando terminar!
		function(andamento){
			console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
		},//O que acontece enquanto esta carregando
		function(error){
			console.log(" Deu merda!: "+ error);
		}//o que acontece se der merda.
	);

	//carregando Fenix
	loaderFBX.load(
		'assets/Phoenix.fbx',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['fenix'] = obj;

			 obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/Phoenix_texture.png")}
						);
					}
				}
			); 

			 obj.scale.y = 0.03;
			 obj.scale.z = 0.03;
			 obj.scale.x = 0.03;

			obj.position.y = -4.3;
			obj.position.x = 15;
			obj.position.z = 0;

			//obj.rotation.x-=1.35;

			scene.add(obj);
			console.log("Carregou Fenix");

		},//Oque acontece quando terminar!
		function(andamento){
			console.log("Carregou Fenix: " + (andamento.loaded / andamento.total)*100 + " %" );
		},//O que acontece enquanto esta carregando
		function(error){
			console.log(" Deu merda Fenix!: "+ error);
		}//o que acontece se der merda.
	);

	// carrega Godzilla
	loaderFBX.load(
		'assets/Godzilla.fbx',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['god'] = obj;

			obj.traverse( function (child){
				if (child instanceof THREE.Mesh){
					child.material = new THREE.MeshStandardMaterial({
						map: new THREE.TextureLoader().load("assets/texturas/Godzilla_texture.png")}
					);
				}
			}
		); 


			obj.scale.y = 0.08;
			obj.scale.z = 0.08;
			obj.scale.x = 0.08;

			obj.position.y = -7.5;
			obj.position.z = -30;
			obj.position.x = -85;

			//obj.rotation.x-=1.35;

			scene.add(obj);
			console.log("Carregou Godzilla!");

		},//Oque acontece quando terminar!
		function(andamento){
			console.log("Carregou Godzilla: " + (andamento.loaded / andamento.total)*100 + " %" );
		},//O que acontece enquanto esta carregando
		function(error){
			console.log(" Deu merda Godzilla!: "+ error);
		}//o que acontece se der merda.
	);


	//carregando ouriço DEU PROBLEMA NA TEXTURA, NÃO PODE USAR
	/* loader.load(
		'assets/Hadgehog.obj',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['ourico'] = obj;

			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						child.material = new THREE.MeshStandardMaterial({
							map: new THREE.TextureLoader().load("assets/texturas/Hadgehog_texture.png")}
						);
					}
				}
			);

					obj.scale.y = 2;
					obj.scale.z = 2;
					obj.scale.x = 2;
					
					obj.position.x = 0;
					obj.position.y = 0;
					obj.position.z = 0;

					obj.rotation.x = 0;
					obj.rotation.z = 0;
					obj.rotation.y = 0;

					scene.add(obj);
					console.log("Carregou ouriço!");

				},//Oque acontece quando terminar!
				function(andamento){
					console.log("Carregou ouriço: " + (andamento.loaded / andamento.total)*100 + " %" );
				},//O que acontece enquanto esta carregando
				function(error){
					console.log(" Deu merda ouriço!: "+ error);
				}//o que acontece se der merda.
			); */

	// carrega dragão, VER PROBLEMA DO LOG -->> FBXLoader.js:620 THREE.FBXLoader: SpecularFactor map is not supported in three.js, skipping texture.
	/* loaderFBX.load(
		'assets/dragon/Dragon.fbx',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['dragon'] = obj;

			obj.traverse( function (child){
				if (child instanceof THREE.Mesh){
					child.material = new THREE.MeshStandardMaterial({
						map: new THREE.TextureLoader().load("assets/dragon/Dragon_Bump_Col2.jpg")
					}
					);	
				}
			}
			);

			 obj.scale.y = 1;
			 obj.scale.z = 1;
			 obj.scale.x = 1;

			obj.position.y = -7.6;
			obj.position.x = -10;
			obj.position.z = 0;

			//obj.rotation.x-=1.35;

			scene.add(obj);
			console.log("Carregou Dragão");

		},//Oque acontece quando terminar!
		function(andamento){
			console.log("Carregou Dragão: " + (andamento.loaded / andamento.total)*100 + " %" );
		},//O que acontece enquanto esta carregando
		function(error){
			console.log(" Deu merda Dragão!: "+ error);
		}//o que acontece se der merda.
	); */

};

var godSaysLightsOn = function (){
	let spot = new THREE.SpotLight(0xffffff);
	spot.position.set(100,100,100);
	scene.add(spot);

	scene.add(new THREE.AmbientLight(0x666666));
	//scene.add( new THREE.HemisphereLight( 0x443333, 0x222233, 4 ) );
}


var createGui = function (){
	const gui = new dat.GUI();

	parametrosGUI = {
		scalarPuppet: 1,
		positionX: 0,
		positionY: -6,
		positionZ: 0,

		skyColor : "#000000",
		groundColor: "#006400",

		geometrias: "",
		modelGui: ""
	};

	let fazScala = gui.add(parametrosGUI, 'scalarPuppet').min(0.1).max(2).step(0.1).name("Scale");
	fazScala.onChange(function (parametro){
			elementos[parametrosGUI.modelGui].scale.x = parametro;
			elementos[parametrosGUI.modelGui].scale.y = parametro;
			elementos[parametrosGUI.modelGui].scale.z = parametro;
		}
	);

	let opcoes = ['cientista','fenix', 'godzilla'];
	let comboChange = gui.add(parametrosGUI, 'geometrias').options(opcoes).name("Objetos");
	comboChange.onChange(function(parametro){
			if (parametro == 'cientista'){
				camera.lookAt(elementos["cien"].position);
				parametrosGUI.modelGui = "cien";
			}else if (parametro == 'fenix'){
				camera.lookAt(elementos["fenix"].position);
				parametrosGUI.modelGui = "tri";
			}else if (parametro == 'godzilla'){
				camera.lookAt(elementos["god"].position);
				parametrosGUI.modelGui = "god";
			} 
		}
	);
	let folderPosition = gui.addFolder("Position");

	let positionX = folderPosition.add(parametrosGUI, 'positionX').min(-6).max(6).step(0.1).name("Position X");
	positionX.onChange(function (parametro){
		elementos[parametrosGUI.modelGui].position.x = parametro;
		}
	);
	let positionY = folderPosition.add(parametrosGUI, 'positionY').min(-10).max(10).step(0.1).name("Position Y");
	positionY.onChange(function (parametro){
			elementos[parametrosGUI.modelGui].position.y = parametro;
		}
	);
	let positionZ = folderPosition.add(parametrosGUI, 'positionZ').min(-6).max(6).step(0.1).name("Position Z");
	positionZ.onChange(function (parametro){
		elementos[parametrosGUI.modelGui].position.z = parametro;
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
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
		
	camera.position.z = 50;
	camera.position.x = 0;
	camera.position.y = 1.7;
	
	godSaysLightsOn();

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
	
	let materialGround = new THREE.MeshStandardMaterial({map: groundTexture});
	materialGround.normalMap = textureLoad.load("assets/texturas/terrain/grasslight-big-nm.jpg"); //busca a normal, que da noção básica de profundidade


	ground = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(1000,1000),
		materialGround
	);
	ground.rotation.x = - Math.PI/2;
	ground.position.y-=7.5;
	scene.add(ground);

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	scene.fog = new THREE.Fog(0xcce0ff, 200, 500);


	document.addEventListener('keydown', apertouButao);
	document.addEventListener('keyup', soltouBotao);

};



var key_r = false;
var key_space = false;
var key_q = false;

var soltouBotao = function(e){

	if (e.keyCode == 82){ //r
		key_r = false;
	}
	if (e.keyCode == 32){ //espaço
		key_space = false;
	}
	if (e.keyCode == 81){ //espaço
		key_q = false;
	}
}


var apertouButao =  function(e){
	console.log(e.keyCode);

	if (e.keyCode == 82){ //r
		elementos['cerberus'].rotation.x+=0.1;
		key_r = true;
	}
	if (e.keyCode == 32){ // space
		key_space = true;
		pulando = true;
	}

	if (e.keyCode == 81){ // q
		key_q = true;		
	}

	if (e.keyCode == 38){ //douwn
		camera.position.z-=0.5;
		//elementos["puppet"]["tronco"].position.z += 1;
	}
	if (e.keyCode == 40){ // UP
		//elementos["puppet"]["tronco"].position.z -= 1;
		camera.position.z+=0.5;
	}
}

var count =0; 
var velocidadeOmbroDireitoC = -0.01;
var velocidadeOmbroDireitoL = -0.01;
var pulando = false;
var velocidadePulo = 0.5;
var altura = -1;
var animation = function (){
	requestAnimationFrame(animation); //adiciona o método na fila de renderização
	//controls.update();
	
	
	//if (++count >= 30){
	//	let rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.01,0,0.01, 'XYZ'));
	//	elementos["cubo1"].quaternion.multiplyQuaternions(rotation, elementos["cubo1"].quaternion);

	// 	elementos["cubo2"].rotation.x += 0.01;
	// 	elementos["cubo2"].rotation.z += 0.01;
	// //	count = 0;
	


	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function paraRadianos(angulo){
	return angulo * (Math.PI/180);
}

window.onload = this.init