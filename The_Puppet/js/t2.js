var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo

var elementos = [];

var velocidade = 0.07;

var criaMonstro = function (){
	let puppet=[];

	let red = 	new THREE.Color(1,0,0);
	let green = new THREE.Color(0,1,0);
	let blue = 	new THREE.Color(0,0,1);
	let cores = [red, green, blue];
	let materials = [
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: blue}),
		new THREE.MeshBasicMaterial({color: green}),
		new THREE.MeshBasicMaterial({color: blue})
	];

	let tronco = new THREE.Mesh(new THREE.BoxGeometry(4, 9, 2), materials);
	puppet["tronco"] = tronco;

	let cabeca = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshBasicMaterial({color: blue}));
	puppet["cabeca"] = cabeca;
	tronco.add(cabeca);
	cabeca.position.y=tronco.position.y+7;
	/* ******************************************************************************************************** */
	// bracoDireito
	/* ******************************************************************************************************** */
	/* ******************************************************************************************************** */
	// OMBRO, BRACO
	let ombroD = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["ombroD"] = ombroD;
	tronco.add(ombroD);
	ombroD.position.y= tronco.position.y+4;
	ombroD.position.x= tronco.position.y+3;
	
	let pivotOmbroD = new THREE.Group();
	puppet["pivotOmbroD"] = pivotOmbroD;
	ombroD.add(pivotOmbroD);

	let bracoD = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["bracoD"] = bracoD;
	pivotOmbroD.add(bracoD)
	bracoD.position.y-=2.7;

	/* ******************************************************************************************************** */
	// COTOVELO
	let cotoveloD = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["cotoveloD"] = cotoveloD;
	pivotOmbroD.add(cotoveloD);
	cotoveloD.position.y = bracoD.position.y-2.7;
	cotoveloD.position.x = bracoD.position.x-0;
	
	let pivotCotoveloD = new THREE.Group();
	puppet["pivotCotoveloD"] = pivotCotoveloD;
	cotoveloD.add(pivotCotoveloD);

	let anteBraD = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["anteBraD"] = anteBraD;
	pivotCotoveloD.add(anteBraD)
	anteBraD.position.y-=2.7;

	/* ******************************************************************************************************** */
	// bracoEsquerdo
	/* ******************************************************************************************************** */
	/* ******************************************************************************************************** */
	// OMBRO, BRACO
	let ombroE = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["ombroE "] = ombroE;
	tronco.add(ombroE);
	ombroE.position.y= tronco.position.y+4;
	ombroE.position.x= tronco.position.x-3;
	
	let pivotOmbroE = new THREE.Group();
	puppet["pivotOmbroE"] = pivotOmbroE;
	ombroE.add(pivotOmbroE);
	
	let bracoE = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["bracoE"] = bracoE;
	pivotOmbroE.add(bracoE)
	bracoE.position.y-=2.7;

	/* ******************************************************************************************************** */
	// COTOVELO
	let cotoveloE = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["cotoveloE"] = cotoveloE;
	pivotOmbroE.add(cotoveloE);
	cotoveloE.position.y = bracoE.position.y-2.8;
	cotoveloE.position.x = bracoE.position.x-0;

	let pivotCotoveloE = new THREE.Group();
	puppet["pivotCotoveloE"] = pivotCotoveloE;
	cotoveloE.add(pivotCotoveloE);
	
	let anteBraE = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["anteBraE"] = anteBraE;
	pivotCotoveloE.add(anteBraE)
	anteBraE.position.y-= 2.7;

	/* ******************************************************************************************************** */
	// perna direita
	/* ******************************************************************************************************** */
	// QUADRIL
	let quadrilD = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["quadrilD"] = quadrilD;
	tronco.add(quadrilD);
	quadrilD.position.y= tronco.position.y-5.7;
	quadrilD.position.x= tronco.position.x+1.2;

	let pivotQuadrilD = new THREE.Group();
	puppet["pivotQuadrilD"] = pivotQuadrilD;
	quadrilD.add(pivotQuadrilD);

	let pernaD = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["pernaD"] = pernaD;
	pivotQuadrilD.add(pernaD)
	pernaD.position.y-=2.7;

	/* ******************************************************************************************************** */
	// CANELA

	let joelhoD = new THREE.Mesh(new THREE.SphereGeometry(0.8, 22, 22), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["joelhoD"] = joelhoD;
	pivotQuadrilD.add(joelhoD);
	joelhoD.position.y = -5.2;
	joelhoD.position.x = 0;
	
	let pivotJoelhoD = new THREE.Group();
	puppet["pivotJoelhoD"] = pivotJoelhoD;
	joelhoD.add(pivotJoelhoD);

	let canelaD = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["canelaD"] = canelaD;
	pivotJoelhoD.add(canelaD)
	canelaD.position.y-=2.6;
	canelaD.position.x =0;


	/* ******************************************************************************************************** */
	// perna esquerda
	/* ******************************************************************************************************** */
	// QUADRIL
	let quadrilE = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["quadrilE"] = quadrilE;
	tronco.add(quadrilE);
	quadrilE.position.y= tronco.position.y-5.7;
	quadrilE.position.x= tronco.position.x-1.2;

	let pivotQuadrilE = new THREE.Group();
	puppet["pivotQuadrilE"] = pivotQuadrilE;
	quadrilE.add(pivotQuadrilE);

	let pernaE = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["pernaE"] = pernaE;
	pivotQuadrilE.add(pernaE)
	pernaE.position.y-=2.7;
	/* ******************************************************************************************************** */
	// CANELA
	let joelhoE = new THREE.Mesh(new THREE.SphereGeometry(0.8, 22, 22), new THREE.MeshBasicMaterial({color: 0xffffff}));
	puppet["joelhoE"] = joelhoE;
	pivotQuadrilE.add(joelhoE);
	joelhoE.position.y = -5.2;
	joelhoE.position.x = 0;

	let pivotJoelhoE = new THREE.Group();
	puppet["pivotJoelhoE"] = pivotJoelhoE;
	joelhoE.add(pivotJoelhoE);

	let canelaE = new THREE.Mesh(new THREE.BoxGeometry(1, 3, 1), new THREE.MeshBasicMaterial({color: red}));
	puppet["canelaE"] = canelaE;
	pivotJoelhoE.add(canelaE)
	canelaE.position.y-=2.6;
	canelaE.position.x =0;




	elementos["puppet"] = puppet;
	scene.add(tronco);

};



var init = function (){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 150);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	camera.position.z =80;
	camera.position.x = 0;
	camera.position.y = 2;
	
	criaMonstro();
	

	animation();


	document.addEventListener('keydown', apertouButao);
	document.addEventListener('keyup', soltouBotao);

	//metodos do mouser
	document.addEventListener('mousewheel', onMouseWheel);
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mousedown', onMouseClick);
	document.addEventListener('mouseup', onMouseUp);

	
};

var clicando = false;
var mouserPosAnterior = {
	x:0,
	y:0
}

var onMouseMove = function(e){
	let diferencaMovimento = {
		x: e.offsetX - mouserPosAnterior.x,
		y: e.offsetY - mouserPosAnterior.y
	}

	if (clicando){

		 let angulosQuaternion = new THREE.Quaternion().setFromEuler(
		 	new THREE.Euler (	paraRadianos(diferencaMovimento.y)*0.5,
		 					    paraRadianos(diferencaMovimento.x)*0.5,
		 						0,
		 						'XYZ')
		 );
		 elementos["puppet"]["tronco"].quaternion.multiplyQuaternions(angulosQuaternion, elementos["puppet"]["tronco"].quaternion);
	}
	mouserPosAnterior = {
		x: e.offsetX,
		y: e.offsetY
	}
};

var onMouseClick = function(e){
	clicando = true;
};

var onMouseUp = function(e){
	clicando = false;
};

var onMouseWheel = function (e){
	//for (let el in elementos){
		elementos["puppet"]["tronco"].scale.x+= (e.deltaY > 0)?-0.1:0.1;
		elementos["puppet"]["tronco"].scale.y+= (e.deltaY > 0)?-0.1:0.1;
		elementos["puppet"]["tronco"].scale.z+= (e.deltaY > 0)?-0.1:0.1;
	//}
	//Mesma coisa que o anterior 
	//if (e.deltaY > 0){
		
	// 	elementos["cubo2"].scale.y-=0.1;
	// 	elementos["cubo2"].scale.z-=0.1;
	// } else {
	// 	elementos["cubo2"].scale.x+=0.1;
	// 	elementos["cubo2"].scale.y+=0.1;
	// 	elementos["cubo2"].scale.z+=0.1;
	// }

}


var key_space = false;
var key_q = false;
var key_a = false;
var key_z = false;
var key_w = false;
var key_s = false;
var key_x = false;
var key_e = false;
var key_d = false;
var key_c = false;
var key_r = false;
var key_f = false;
var key_v = false;

var soltouBotao = function(e){

	if (e.keyCode == 32){ //espaço
		key_space = false;
	}
	if (e.keyCode == 81){ //q
		key_q = false;
	}
	if (e.keyCode == 65){ // a
		key_a = false;
	}
	if (e.keyCode == 90){ // z
		key_z = false;
	}
	if (e.keyCode == 87){ // w
		key_w = false;
	}
	if (e.keyCode == 83){ // s
		key_s = false;
	}
	if (e.keyCode == 88){ // x
		key_x = false;
	}
	if (e.keyCode == 69){ // e
		key_e = false;
	}
	if (e.keyCode == 68){ // d
		key_d = false;
	}
	if (e.keyCode == 67){ // c
		key_c = false;
	}
	if (e.keyCode == 82){ // r
		key_r = false;
	}
	if (e.keyCode == 70){ // f
		key_f = false;
	}
	if (e.keyCode == 86){ // v
		key_v = false;
	}
	
	
}


var apertouButao =  function(e){
	console.log(e.keyCode);

	if (e.keyCode == 32){ //espaço
		key_space = true;
	}
	if (e.keyCode == 81){ //q
		key_q = true;
	}
	if (e.keyCode == 65){ // a
		key_a = true;
	}
	if (e.keyCode == 90){ // z
		key_z = true;
	}
	if (e.keyCode == 87){ // w
		key_w = true;
	}
	if (e.keyCode == 83){ // s
		key_s = true;
	}
	if (e.keyCode == 88){ // x
		key_x = true;
	}
	if (e.keyCode == 69){ // e
		key_e = true;
	}
	if (e.keyCode == 68){ // d
		key_d = true;
	}
	if (e.keyCode == 67){ // c
		key_c = true;
	}
	if (e.keyCode == 82){ // r
		key_r = true;
	}
	if (e.keyCode == 70){ // f
		key_f = true;
	}
	if (e.keyCode == 86){ // v
		key_v = true;
	}

	if (e.keyCode == 189){ //-
		elementos["terra"].scale.x-=0.1;
		elementos["cubo2"].scale.y-=0.1;
		elementos["cubo2"].scale.z-=0.1;
	}
	if (e.keyCode == 187){ // +
		elementos["terra"].scale.x+=0.1;
		elementos["terra"].scale.y+=0.1;
		elementos["terra"].scale.z+=0.1;
	}
}

var count =0; 
var velocidadeOmbroDireitoC = -0.01;
var velocidadeOmbroDireitoL = -0.01;
var velocidadeOmbroEsquerdoC = -0.01;
var velocidadeOmbroEsquerdoL = -0.01;

var velocidadeAntebracoDireitoC = -0.01;
var velocidadeAntebracoDireitoL = -0.01;
var velocidadeAntebracoEsquerdoC = -0.01;
var velocidadeAntebracoEsquerdoL = -0.01;

var velocidadePernaDireitaC = -0.01;
var velocidadePernaDireitaL = -0.01;
var velocidadePernaEsquerdaC = -0.01;
var velocidadePernaEsquerdaL = -0.01;

var velocidadeCanelaDireitaC = -0.01;
var velocidadeCanelaDireitaL = -0.01;
var velocidadeCanelaEsquerdaC = -0.01;
var velocidadeCanelaEsquerdaL = -0.01;

var animation = function (){
	requestAnimationFrame(animation); //adiciona o método na fila de renderização

	if (key_space){ // gira tronco
		elementos["puppet"]["tronco"].rotation.y += 0.01;
	} 
	// bracoDireito
	if (key_q){ //movimento frente tras braço direito
		if (elementos["puppet"]["pivotOmbroD"].rotation.x < -2.83 || elementos["puppet"]["pivotOmbroD"].rotation.x > 1.3)
			velocidadeOmbroDireitoC*=-1;

		elementos["puppet"]["pivotOmbroD"].rotation.x += velocidadeOmbroDireitoC;
	}
	if (key_a){ // movimento abre braço direito
		if (elementos["puppet"]["pivotOmbroD"].rotation.z < 0 || elementos["puppet"]["pivotOmbroD"].rotation.z > 1.4)
			velocidadeOmbroDireitoL*=-1;

		elementos["puppet"]["pivotOmbroD"].rotation.z += velocidadeOmbroDireitoL;
	}
	if (key_z){ //movimento antebraço direito
		if (elementos["puppet"]["pivotCotoveloD"].rotation.x < -2.5 || elementos["puppet"]["pivotCotoveloD"].rotation.x > 0)
			velocidadeAntebracoDireitoC*=-1;

		elementos["puppet"]["pivotCotoveloD"].rotation.x += velocidadeAntebracoDireitoC;
	} 

	//bracoEsquerdo
	if (key_w){ //movimento frente tras braço esquerdo
		if (elementos["puppet"]["pivotOmbroE"].rotation.x > 1.3 || elementos["puppet"]["pivotOmbroE"].rotation.x < -2.83)
			velocidadeOmbroEsquerdoC*=-1;

		elementos["puppet"]["pivotOmbroE"].rotation.x += velocidadeOmbroEsquerdoC;
	}
	if (key_s){ // movimento abre braço esquerdo
		if (elementos["puppet"]["pivotOmbroE"].rotation.z > 0 || elementos["puppet"]["pivotOmbroE"].rotation.z < -1.4)
			velocidadeOmbroEsquerdoL*=-1;

		elementos["puppet"]["pivotOmbroE"].rotation.z += velocidadeOmbroEsquerdoL;
	}
	if (key_x){ //movimento antebraço esquerdo
		if (elementos["puppet"]["pivotCotoveloE"].rotation.x < -2.5 || elementos["puppet"]["pivotCotoveloE"].rotation.x > 0)
			velocidadeAntebracoEsquerdoC*=-1;

		elementos["puppet"]["pivotCotoveloE"].rotation.x += velocidadeAntebracoEsquerdoC;
	}

	//perna Direita
	if (key_e){ //movimento frente tras perna direita
		if (elementos["puppet"]["pivotQuadrilD"].rotation.x > 1.3 || elementos["puppet"]["pivotQuadrilD"].rotation.x < -2)
			velocidadePernaDireitaC*=-1;

		elementos["puppet"]["pivotQuadrilD"].rotation.x += velocidadePernaDireitaC;
	}
	if (key_d){ // movimento abre perna direita
		if (elementos["puppet"]["pivotQuadrilD"].rotation.z < -0.5 || elementos["puppet"]["pivotQuadrilD"].rotation.z > 1.7)
			velocidadePernaDireitaL*=-1;

		elementos["puppet"]["pivotQuadrilD"].rotation.z += velocidadePernaDireitaL;
	}
	if (key_c){ //movimento canela direita
		if (elementos["puppet"]["pivotJoelhoD"].rotation.x < 0 || elementos["puppet"]["pivotJoelhoD"].rotation.x > 2)
			velocidadeCanelaDireitaC*=-1;

		elementos["puppet"]["pivotJoelhoD"].rotation.x += velocidadeCanelaDireitaC;
	} 
	if (key_r){ //movimento frente tras perna esquerda
		if (elementos["puppet"]["pivotQuadrilE"].rotation.x > 1.3 || elementos["puppet"]["pivotQuadrilE"].rotation.x < -2)
			velocidadePernaEsquerdaC*=-1;

		elementos["puppet"]["pivotQuadrilE"].rotation.x += velocidadePernaEsquerdaC;
	}
	if (key_f){ // movimento abre perna esquerda
		if (elementos["puppet"]["pivotQuadrilE"].rotation.z < -1.5 || elementos["puppet"]["pivotQuadrilE"].rotation.z > 0.5)
			velocidadePernaEsquerdaL*=-1;

		elementos["puppet"]["pivotQuadrilE"].rotation.z += velocidadePernaEsquerdaL;
	}
	if (key_v){ //movimento canela esquerda
		if (elementos["puppet"]["pivotJoelhoE"].rotation.x < 0 || elementos["puppet"]["pivotJoelhoE"].rotation.x > 2)
			velocidadeCanelaEsquerdaC*=-1;

		elementos["puppet"]["pivotJoelhoE"].rotation.x += velocidadeCanelaEsquerdaC;
	}
	


	renderer.render(scene, camera); //tira uma foto do estado e mostra na tela
}

function paraRadianos(angulo){
	return angulo * (Math.PI/180);
}

window.onload = this.init