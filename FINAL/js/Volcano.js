function createVolcano(){
  let loaderFBX = new THREE.FBXLoader();
    
	loaderFBX.load(
		'assets/pedras/Volcano.fbx',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['ove'] = obj;
			obj.traverse( function (child){
					if (child instanceof THREE.Mesh){
						 child.material = new THREE.MeshLambertMaterial({
							map: new THREE.TextureLoader().load("assets/pedras/Volcano_texture.png")}
						);  
						child.castShadow = true;
						child.receiveShadow = true;
					}
					}
				);
				
				obj.position.y = -7.5;

				obj.position.z = -500


				escala = 0.4;
				obj.scale.y = escala;
				obj.scale.z = escala;
				obj.scale.x = escala;

				ovelha = obj;
				scene.add(obj);
				console.log("Carregou Vulcao");
			},//Oque acontece quando terminar!
			function(andamento){
				console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
			},//O que acontece enquanto esta carregando
			function(error){
				console.log(" Deu merda!: "+ error);
			}//o que acontece se der merda.
		);

		loaderFBX.load(
			'assets/pedras/Volcano.fbx',//arquivo que vamos buscar
			function(obj){
				//atribui a cena, colore, reposiciona, rotaciona
				elementos['ove'] = obj;
				obj.traverse( function (child){
						if (child instanceof THREE.Mesh){
							 child.material = new THREE.MeshLambertMaterial({
								map: new THREE.TextureLoader().load("assets/pedras/Volcano_texture.png")}
							);  
							child.castShadow = true;
							child.receiveShadow = true;
						}
						}
					);
					
					obj.position.y = -7.5;
	
					obj.position.x = -50;
					obj.position.z = 500;
	
	
					escala = 0.4;
					obj.scale.y = escala;
					obj.scale.z = escala;
					obj.scale.x = escala;
	
					ovelha = obj;
					scene.add(obj);
					console.log("Carregou Vulcao");
				},//Oque acontece quando terminar!
				function(andamento){
					console.log("Carregou: " + (andamento.loaded / andamento.total)*100 + " %" );
				},//O que acontece enquanto esta carregando
				function(error){
					console.log(" Deu merda!: "+ error);
				}//o que acontece se der merda.
			);  
}