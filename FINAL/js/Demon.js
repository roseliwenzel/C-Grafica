function createDemon(){
  let loaderFBX = new THREE.FBXLoader();
	loaderFBX.load(
		'assets/teste/Demon_Idle.fbx',//arquivo que vamos buscar
		function(obj){
			//atribui a cena, colore, reposiciona, rotaciona
			elementos['dem'] = obj;

			let animation;

			mixer = new THREE.AnimationMixer(obj);

			console.log(obj);

			animation = mixer.clipAction(obj.animations[0]);
			animationActionsDemon.push(animation);
			activeAction = animation;
			setAction(animation);


			//As animações múltiplas devem ser carregadas dessas forma para que seja uma transação.
				//OBS. Sim é sacanagem mas o mago que tem animação não tem cajado :(
			loaderFBX.load(
						'assets/teste/Demon_Idle.fbx', //arquivo que vamos carregar
						function(object){
							let animationAction = mixer.clipAction((object).animations[0]);
							animationActionsDemon.push(animationAction)         							
							
							loaderFBX.load(
								'assets/teste/Demon_Damage.fbx', //arquivo que vamos carregar
								function(object){
									let animationAction = mixer.clipAction((object).animations[0]);
									animationActionsDemon.push(animationAction)         
									activeAction = animationAction;
									setAction(animationAction);
									loaderFBX.load(
										'assets/teste/Demon_Run.fbx', //arquivo que vamos carregar
										function(object){
											let animationAction = mixer.clipAction((object).animations[0]);
											animationActionsDemon.push(animationAction)         
											activeAction = animationAction;
											setAction(animationAction);
											loaderFBX.load(
												'assets/teste/Demon_Jump.fbx', //arquivo que vamos carregar
												function(object){
													let animationAction = mixer.clipAction((object).animations[0]);
													animationActionsDemon.push(animationAction)         
													activeAction = animationAction;
													setAction(animationAction);
													loaderFBX.load(
														'assets/teste/Demon_Attack.fbx', //arquivo que vamos carregar
														function(object){
															let animationAction = mixer.clipAction((object).animations[0]);
															animationActionsDemon.push(animationAction)         
															activeAction = animationAction;
															setAction(animationAction);
															loaderFBX.load(
																'assets/teste/Demon_Dead.fbx', //arquivo que vamos carregar
																function(object){
																	let animationAction = mixer.clipAction((object).animations[0]);
																	animationActionsDemon.push(animationAction)         
																	activeAction = animationAction;
																	setAction(animationAction);
																});
														});

												});
										});
								});
						});

			
			// //adiciona as animações a GUI
			animationFolderDemon.add(parametrosGUI, "idleD");
			animationFolderDemon.add(parametrosGUI, "DamageD");
			animationFolderDemon.add(parametrosGUI, "RunD");
			animationFolderDemon.add(parametrosGUI, "JumpD");
			animationFolderDemon.add(parametrosGUI, "AttackD");
			animationFolderDemon.add(parametrosGUI, "DeadD");
			
			obj.traverse( function (child){
					
					if (child instanceof THREE.Mesh){
						child.material.map = new THREE.TextureLoader().load("assets/teste/UVDemon.png");
						
						child.material.shininess = 0;
						child.castShadow = true;
						child.receiveShadow = true;

					}
				}
			);

				obj.scale.y = 0.02;
				obj.scale.z = 0.02;
				obj.scale.x = 0.02;

			obj.position.y = -7.5;

			charD = new THREE.Group();
			charD.add(camera);
			charD.add(obj);
			
			obj.rotation.y-= Math.PI;

			obj.children[0].geometry.computeBoundingBox();
			let objBox = new THREE.Box3().setFromObject(obj);
			charBoundingD = objBox;
      
			scene.add(charD);
			console.log("Carregou Demon");
			loadFinishedD = true;
		});
}