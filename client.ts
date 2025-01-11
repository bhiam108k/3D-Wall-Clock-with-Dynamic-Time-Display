
import * as THREE from 'three'

import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 10;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);
renderer.setClearColor("white");

const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set(0,10,0);
scene.add( directionalLight );

// controls
const orbitcontrols=new OrbitControls(camera , renderer.domElement);
orbitcontrols.enableZoom=true;

const axes=new THREE.AxesHelper(5);
scene.add(axes);
const groups=new THREE.Group();
// instantiate a loader
const textureLoader = new THREE.TextureLoader();
textureLoader.load('assets/WhatsApp Image 2024-09-21 at 5.45.55 PM.jpeg' , (texture:THREE.Texture)=> {

    
    const clockFaceGeometry = new THREE.CircleGeometry(4, 69);

    const clockFaceMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
    });
    const clockmesh=new THREE.Mesh(clockFaceGeometry,clockFaceMaterial);
    groups.add(clockmesh);
    });


    //outer ring

    const ring=new THREE.TorusGeometry(6,0.3);
    const material= new THREE.MeshStandardMaterial({color:0xd7be69, metalness:1,roughness:0.5});
    const ringmesh=new THREE.Mesh(ring,material);
    groups.add(ringmesh);

    const ring1=new THREE.TorusGeometry(4,0.03);
    const material2=new THREE.MeshBasicMaterial({color:'black'});
    const ringmesh1=new THREE.Mesh(ring1,material2);
    groups.add(ringmesh1);

    const ring2=new THREE.TorusGeometry(4.5,0.3);
    const material3= new THREE.MeshStandardMaterial({color:'gold',metalness:0.0001,roughness:5});
    const ringmesh2=new THREE.Mesh(ring2,material3);
    groups.add(ringmesh2);

    const ring3=new THREE.TorusGeometry(2,0.03);
    const material4=new THREE.MeshBasicMaterial({color:'black'});
    const ringmesh3=new THREE.Mesh(ring3,material4);
    groups.add(ringmesh3);


    const sphere1=new THREE.SphereGeometry(0.2);
    const material5=new THREE.MeshStandardMaterial({color:'yellow'})
    const spheremesh=new THREE.Mesh(sphere1,material5);
    groups.add(spheremesh);

function createHand (length:number ,color:string)
{
  const geometry =new THREE.BoxGeometry(0.1,length,0.1);

  const material=new THREE.MeshBasicMaterial({color});
  const mesh =new THREE.Mesh(geometry,material);
  mesh.position.y=length*0.5;
  const handgroup=new THREE.Group();
  handgroup.add(mesh);
  return handgroup;
}
function createcone (radius:number ,color:string)
{
  const geometry =new THREE.ConeGeometry(0.1,radius,0.1);

  const material=new THREE.MeshBasicMaterial({color});
  const mesh =new THREE.Mesh(geometry,material);
  mesh.position.y=length*0.5;
  const handgroup=new THREE.Group();
  handgroup.add(mesh);
  return handgroup;
}

const hourHand=createHand(2.2,'gold');
groups.add(hourHand);

const minHand=createHand(2.5,'black');
groups.add(minHand);

const secHand=createHand(2.9,'red');
groups.add(secHand);

scene.add(groups);


function createArrowhead(length:number, color:string) {
    const geometry = new THREE.ConeGeometry(0.2, length, 8); 
    const material = new THREE.MeshBasicMaterial({ color });
    const arrowhead = new THREE.Mesh(geometry, material);
    return arrowhead;
}


const hourArrow = createArrowhead(0.5, 'gold'); 
hourArrow.position.y = 2.2; 
hourHand.add(hourArrow);

const minArrow = createArrowhead(0.5, 'black'); 
minArrow.position.y = 2.5; 
minHand.add(minArrow);

const secArrow = createArrowhead(0.5, 'red'); 
secArrow.position.y = 2.9; 
secHand.add(secArrow);

// Create a Pendulum Group
const pendulumGroup = new THREE.Group();

// Pendulum Rod
const pendulumRodGeometry = new THREE.BoxGeometry(0.05, 3, 1);
const pendulumRodMaterial = new THREE.MeshStandardMaterial({ color: 'silver' });
const pendulumRod = new THREE.Mesh(pendulumRodGeometry, pendulumRodMaterial);
pendulumRod.position.y = -1.5; // Position the rod's center
pendulumGroup.add(pendulumRod);

// Pendulum Bob
const pendulumBobGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const pendulumBobMaterial = new THREE.MeshStandardMaterial({ color: 'gold' });
const pendulumBob = new THREE.Mesh(pendulumBobGeometry, pendulumBobMaterial);
pendulumBob.position.y = -3; // Position the bob at the end of the rod
pendulumGroup.add(pendulumBob);

// Position the Pendulum Group
pendulumGroup.position.y = -4; // Place the pendulum below the clock

// Add the Pendulum to the Groups
groups.add(pendulumGroup);

// Pendulum Animation Variables
let pendulumAngle = 0;
const pendulumAmplitude = 0.5; // Maximum angle in radians (e.g., ~30 degrees)
const pendulumSpeed = 2; // Speed of swinging

function pendulumAnimation() {
    // Update the pendulum angle over time using a sine wave
    pendulumAngle = pendulumAmplitude * Math.sin(Date.now() * 0.001 * pendulumSpeed);
    pendulumGroup.rotation.z = pendulumAngle; // Rotate the pendulum about the Z-axis
}


function animate() {
    requestAnimationFrame(animate);
clockHandAnimation();
pendulumAnimation();
   
    render();
}
function render() {
    const animateAngle=Math.sin(Date.now()*0.001)*0.1;
    renderer.render(scene, camera);
    orbitcontrols.update();

}
const z=new THREE.Vector3(0,0,1);
function clockHandAnimation()
{
    const now =new Date();
    const second=now.getSeconds();
    const minutes=now.getMinutes();
    const hrs=now.getHours()%12;
    const secondHandRotation= -second*(Math.PI/30);
    const minHandRotation=-minutes*(Math.PI/30)-(second/60)*(Math.PI/30);
    const hrsHandRotation=-hrs*(Math.PI/6)-(minutes/60)*(Math.PI/6);
    
    const secondhandQuaternion = new THREE.Quaternion().setFromAxisAngle(z,secondHandRotation);
    //secHand.rotation.setFromQuaternion(secondhandQuaternion);
    secHand.quaternion.copy(secondhandQuaternion);

    const minhandQuaternion=new THREE.Quaternion().setFromAxisAngle(z,minHandRotation);
   minHand.quaternion.copy(minhandQuaternion);
    
   const hrshandQuaternion=new THREE.Quaternion().setFromAxisAngle(z,hrsHandRotation);
   hourHand.quaternion.copy(hrshandQuaternion);

}

animate();

