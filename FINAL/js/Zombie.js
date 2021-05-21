function createZombie(){
  let loaderFBX = new THREE.FBXLoader();
	loaderFBX.load(
		'assets/zombie/Zombie Idle.fbx',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['zbm'] = obj;

			let animationZ;

			mixerZ = new THREE.AnimationMixer(obj);

			console.log(obj);

			animationZ = mixerZ.clipAction(obj.animations[0]);
			animationActionsZombie.push(animationZ);
			activeActionZombie = animationZ; 
			setAction(animationZ);

			loaderFBX.load(
				'assets/zombie/Zombie Idle.fbx', //arquivo que vamos carregar
				function(object){
					let animationAction = mixerZ.clipAction((object).animations[0]);
					animationActionsDemon.push(animationAction)         							
				});

			obj.traverse( function (child){
					
					if (child instanceof THREE.Mesh){
						child.material.map = new THREE.TextureLoader().load("assets/zombie/UVZombi.png");
						
						child.material.shininess = 0;
						child.castShadow = true;
						child.receiveShadow = true;

					}
				}
			);

		  obj.scale.y = 0.002;
		  obj.scale.z = 0.002;
		  obj.scale.x = 0.002;

			obj.position.x = -3.5;
			obj.position.y = -7.5;
			obj.position.z = -3.5;

			obj.rotation.y -= Math.PI;

			obj.children[0].geometry.computeBoundingBox();
			let objBox = new THREE.Box3().setFromObject(obj);
			charBoundingZ = objBox;

			scene.add(obj);
			console.log("Carregou Zumbi");
			loadFinishedZ = true;
		});  
}