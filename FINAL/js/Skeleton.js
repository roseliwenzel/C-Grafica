function createSkeleton(){
  let loaderFBX = new THREE.FBXLoader();

	for (i = 0; i < 10; i++){	
		loaderFBX.load(
			'assets/esqueleto/skeleton.fbx',//arquivo que vamos buscar
			function(obj){
				//atribui a cena, colore, reposiciona, rotaciona
				elementos['skl'] = obj;
				obj.traverse( function (child){
						if (child instanceof THREE.Mesh){
							/* child.material = new THREE.MeshLambertMaterial({
								map: new THREE.TextureLoader().load("assets/texturas/UVSheep.png")}
							);  */
							child.castShadow = true;
							child.receiveShadow = true;
						}
						}
					);
					
					obj.position.y = -7.5;

					obj.position.z = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
					obj.position.x = Math.random()*200*(Math.random() > 0.5 ? -1: 1);

					escala = getRandomArbitrary(0.05, 0.2);
					obj.scale.y = escala;
					obj.scale.z = escala;
					obj.scale.x = escala;

					ovelha = obj;
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
	}  
}