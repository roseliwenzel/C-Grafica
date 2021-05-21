var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo
var controls; //controle do mouser

var char = [];

var parametrosGUI = {};
var animationFolderDemon;
var animationFolderZombie;

var elementos = [];

var ground;
var geometriaA;

var lights = [];

var demonVelocity = 0.05;

//variaveis para animação
var mixer;
var modelReady = false;
var animationActionsDemon = Array();
var animationActionsZombie = Array();
var activeAction;
var lastAction;
var loadFinishedZ = false;
var loadFinishedD = false;
var clock = new THREE.Clock();
var k = 0;

//Var para add a camera com o lobo
var char;

var charBounding;
var charHelper;
var escala;
var staticBounding = [];

var key_r = false;
var key_space = false;
var key_q = false;
var keys = [];

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function paraRadianos(angulo){
	return angulo * (Math.PI/180);
}

//troca a ação do nosso modelo
const setAction = function(toAction) {
  if (toAction != activeAction) {
    lastAction = activeAction;
    activeAction = toAction;
    if (toAction == animationActionsDemon[5]){ //se é a morte toca uma vez só
      activeAction.clampWhenFinished = true;
      activeAction.loop = THREE.LoopOnce;
    }else{
      activeAction.clampWhenFinished = false;
      activeAction.loop = THREE.LoopRepeat ;
    }
    lastAction.stop();
    activeAction.reset();
    activeAction.play();
  }
}

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

  idleD: function () {
          setAction(animationActionsDemon[0]);			
          demonVelocity = 0.05;
  },
  DamageD: function () {
          setAction(animationActionsDemon[2])
  },
  RunD: function () {
          setAction(animationActionsDemon[3])
  },
  JumpD: function () {
          setAction(animationActionsDemon[4])
  },
  AttackD: function () {
          setAction(animationActionsDemon[5]);
          demonVelocity = 0.2;
  },
  DeadD: function () {
          setAction(animationActionsDemon[6])			
  },
  idleZ: function () {
          setAction(animationActionsZombie[0]);
  },
  DamageZ: function () {
          setAction(animationActionsZombie[1]);
  },
	walkZ: function () {
          setAction(animationActionsZombie[2]);
  },
	JumpZ: function () {
          setAction(animationActionsZombie[3]);
  },
	DeadZ: function () {
          setAction(animationActionsZombie[4]);
  },
};