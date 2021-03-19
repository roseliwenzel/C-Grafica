var scene; //mundo virtual
var camera; // área de visualização
var renderer; // responsável por renderizar tudo

var elementos = [];
var velocidade = 0.04;
var velocidade1 = 0.04;
var velocidade2 = 0.04;

var criaCirculo = function(){
    let geometria = new THREE.CircleGeometry(0.5,12);

    let material = new THREE.MeshBasicMaterial({color: 0xFF8C00});
    let circulo = new THREE.Mesh(geometria,material);
    circulo.position.x = -3;
    elementos.push(circulo);

    scene.add(circulo);
}

var criaDodecaedro = function(){
    let geometria = new THREE.DodecahedronGeometry(0.8);

    let material = new THREE.MeshBasicMaterial({color: 0xFFDAB9});
    let dodecaedro = new THREE.Mesh(geometria,material);
    dodecaedro.position.x = -7;
    elementos.push(dodecaedro);

    scene.add(dodecaedro);
}


var init = function(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1,100);
    
    renderer = new THREE.WebGLRenderer(); //api grafica
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 10;
    camera.position.x = 0;
    camera.position.y = 2;

    //criaCubo();
    criaCirculo();
    criaDodecaedro();

    elementos[0].position.x=3
    elementos[1].position.y=3
    animation();

};

var animation = function(){
    requestAnimationFrame(animation);
    
    if(this.elementos[1].position.x > 7 || this.elementos[1].position.x < -7){
        velocidade1 *= -1;
    }
    if(this.elementos[1].position.y > 5 || this.elementos[1].position.y < -1.5){
        velocidade *= -1;
    }

    this.elementos[1].position.x += velocidade1;
    this.elementos[1].position.y += velocidade;

    /*
    elementos[1].position.x-=velocidade;
    if(elementos[1].position.x < -7)
        velocidade *=-1;
    else if(elementos[1].position.x > 7)
        velocidade *=-1;
    */
    
    elementos[0].position.y+=velocidade2;
    if(elementos[0].position.y < -1.5)
        velocidade2 *=-1
    else if(elementos[0].position.y > 5)
        velocidade2 *=-1

    renderer.render(scene, camera);
}

window.onload = this.init