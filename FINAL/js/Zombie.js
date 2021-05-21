function createZombie(){
  let loaderFBX = new THREE.FBXLoader();
	loaderFBX.load(
		'assets/zombie/Zombie Idle.fbx',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['zbm'] = obj;

			let animation;

			mixer = new THREE.AnimationMixer(obj);

			console.log(obj);

			animation = mixer.clipAction(obj.animations[0]);
			animationActionsZombie.push(animation);
			activeAction = animation;
			setAction(animation);


			//As animações múltiplas devem ser carregadas dessas forma para que seja uma transação.
				//OBS. Sim é sacanagem mas o mago que tem animação não tem cajado :(
			loaderFBX.load(
						'assets/zombie/Zombie Idle.fbx', //arquivo que vamos carregar
						function(object){
							let animationAction = mixer.clipAction((object).animations[0]);
							animationActionsZombie.push(animationAction)         							
							
							loaderFBX.load(
								'assets/zombie/Zombie Damage.fbx', //arquivo que vamos carregar
								function(object){
									let animationAction = mixer.clipAction((object).animations[0]);
									animationActionsZombie.push(animationAction)         
									activeAction = animationAction;
									setAction(animationAction);

									loaderFBX.load(
										'assets/zombie/Zombie Walk.fbx', //arquivo que vamos carregar
										function(object){
											let animationAction = mixer.clipAction((object).animations[0]);
											animationActionsZombie.push(animationAction)         
											activeAction = animationAction;
											setAction(animationAction);

											loaderFBX.load(
												'assets/zombie/Zombie_Jump.fbx', //arquivo que vamos carregar
												function(object){
													let animationAction = mixer.clipAction((object).animations[0]);
													animationActionsZombie.push(animationAction)         
													activeAction = animationAction;
													setAction(animationAction);

													loaderFBX.load(
														'assets/zombie/Zombie_Dead.fbx', //arquivo que vamos carregar
														function(object){
															let animationAction = mixer.clipAction((object).animations[0]);
															animationActionsZombie.push(animationAction)         
															activeAction = animationAction;
															setAction(animationAction);
														});

												});
										});
								});
						});

			
			// //adiciona as animações a GUI
			animationFolderZombie.add(parametrosGUI, "idleZ");
			animationFolderZombie.add(parametrosGUI, "DamageZ");
			animationFolderZombie.add(parametrosGUI, "walkZ");
			animationFolderZombie.add(parametrosGUI, "JumpZ");
			animationFolderZombie.add(parametrosGUI, "DeadZ");
			
			obj.traverse( function (child){
					
					if (child instanceof THREE.Mesh){
						child.material.map = new THREE.TextureLoader().load("assets/zombie/UVZombi.png");
						
						child.material.shininess = 0;
						child.castShadow = true;
						child.receiveShadow = true;

					}
				}
			);

		  obj.scale.y = 0.001;
		  obj.scale.z = 0.001;
		  obj.scale.x = 0.001;

			obj.position.y = -7.5;

			char = new THREE.Group();
			char.add(camera);
			char.add(obj);
			
			obj.rotation.y-= Math.PI;
			charObj = obj;

			obj.children[0].geometry.computeBoundingBox();
			let objBox = new THREE.Box3().setFromObject(obj);
			charBounding = objBox;

			scene.add(char);
			console.log("Carregou Zumbi");
			loadFinishedZ = true;
		});  
}