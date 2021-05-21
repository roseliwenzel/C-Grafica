function createTreeScene(){
  loader = new THREE.OBJLoader();
	for (i = 0; i < 10; i++)
		loader.load(
		'assets/tree.obj', //arquivo que vamos carregar
		function(object){
			
			object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {

							let textureLoad = new THREE.TextureLoader();
							let groundTexture = textureLoad.load("assets/texturas/terrain/lava.jpg"); //busca a imagem
							groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping; //quero que ela se repita
							groundTexture.encoding = THREE.sRGBEncoding; //padrão cores, sempre que existir será informado
							groundTexture.repeat.set(25,25); //número de vezes que ela vai se repetir dentro do nosso chão
							


							child.material = new THREE.MeshLambertMaterial({map: groundTexture});
							child.material.map = textureLoad.load("assets/texturas/terrain/lava.jpg");
							child.material.shininess = 0;
							child.castShadow = true;
							child.receiveShadow = true;
						}
					});

			object.scale.x = 50;
			object.scale.y = 50;
			object.scale.z = 50;

			object.position.z = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
			object.position.x = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
			
			object.position.y = -7;
      object.castShadow = true;

			
			object.children[0].geometry.computeBoundingBox();
			let objBox = new THREE.Box3().setFromObject(object);
			staticBounding.push(objBox);

			scene.add(object);    
		},//metodo, tudo deu certo
		function( andamento) {
			console.log((andamento.loaded / andamento.total *100) + "% pronto!");
		},//metodo executa enquanto carrega
		function (error){
			console.log("Deu caca: " + error);
		} //metodo deu merda
	);  
}