var scene; //mundo virtual
var camera; //area de visualização
var renderer; //responsavel por renderizar tudo
var controls; //controle do mouser

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
var mixerZ;
var modelReady = false;
var animationActionsDemon = Array();
var animationActionsZombie = Array();
var activeAction;
var activeActionZombie;
var lastAction;
var loadFinishedZ = false;
var loadFinishedD = false;
var clock = new THREE.Clock();
var k = 0;
var comboChange;

//Var para add a camera com o lobo
var charD = [];
var charBoundingD;
var charHelperD;

var charZ = [];
var charBoundingZ;
var charHelperZ;

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
    if (toAction == animationActionsDemon[5] ||
        toAction == animationActionsZombie[5]){ //se é a morte toca uma vez só
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
          setAction(animationActionsDemon[6]);
          demonVelocity = 0.2;
  },
  DeadD: function () {
          setAction(animationActionsDemon[7]);
  },

  idleZ: function () {
          setAction(animationActionsZombie[0]);
  },
  DamageZ: function () {
          setAction(animationActionsZombie[2]);
  },
  walkZ: function () {
          setAction(animationActionsZombie[3]);
  },
  JumpZ: function () {
          setAction(animationActionsZombie[4]);
  },
  DeadZ: function () {
          setAction(animationActionsZombie[5]);
  },
};

var velocidadeOmbroDireitoC = -0.01;
var velocidadeOmbroDireitoL = -0.01;
var pulando = false;
var velocidadePulo = 0.5;
var altura = -1;
var bateu = false;

const sentidoz = [-1,-0.93,-0.868,-0.806,-0.744,-0.682,-0.62,-0.558,-0.496,-0.434,-0.372,-0.31,-0.248,-0.186,-0.124,-0.062,0,0.07,0.132,0.194,0.256,0.318,0.38,0.442,0.504,0.566,0.628,0.69,0.752,0.814,0.876,0.938,0.99,1,0.938,0.876,0.814,0.752,0.69,0.628,0.566,0.504,0.442,0.38,0.318,0.256,0.194,0.132,0,-0.062,-0.124,-0.186,-0.248,-0.31,-0.372,-0.434,-0.496,-0.558,-0.62,-0.682,-0.744,-0.806,-0.868,-0.93];
const sentidox = [0,0.07,0.132,0.194,0.256,0.318,0.38,0.442,0.504,0.566,0.628,0.69,0.752,0.814,0.876,0.938,1,0.93,0.868,0.806,0.744,0.682,0.62,0.558,0.496,0.434,0.372,0.31,0.248,0.186,0.124,0.062,0.01,0,-0.062,-0.124,-0.186,-0.248,-0.31,-0.372,-0.434,-0.496,-0.558,-0.62,-0.682,-0.744,-0.806,-0.868,-1,-0.938,-0.876,-0.814,-0.752,-0.69,-0.628,-0.566,-0.504,-0.442,-0.38,-0.318,-0.256,-0.194,-0.132,-0.07];

var posicaoSentido = 33