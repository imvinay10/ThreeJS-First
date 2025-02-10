import * as THREE from 'three'
import './src/../../style.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"


const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./src/assets/Bump_2K.png');

const scene = new THREE.Scene;
const geometry = new THREE.SphereGeometry( 5, 64, 64 );
// const material = new THREE.MeshStandardMaterial({color:"#da26e0", roughness:0.4,map:texture })
const material = new THREE.MeshStandardMaterial({color:"#da26e0", roughness:0.4})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const size = {
    width:window.innerWidth,
    height:window.innerHeight
}

const light = new THREE.PointLight(0xffffff,150,150)
light.position.set(0,10,10)
light.intesity= 1.25
scene.add(light)
const camera =new THREE.PerspectiveCamera(45,size.width/size.height)
camera.position.z =30
scene.add(camera)

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})

renderer.setSize(size.width, size.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)


 //Controls
 const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom =false
controls.autoRotate = true
controls.autoRotateSpeed = 5

window.addEventListener('resize',()=>{
    size.width = window.innerWidth
    size.height = window.innerHeight

    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height)
})

const loop= () =>{
    // mesh.position.x += 0.1
    controls.update()
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}

loop()


//timeline
const tl = gsap.timeline({default: { duration : 1}})
tl.fromTo(mesh.scale,{z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y:'-100%'}, {y:'0%'})
tl.fromTo(".title",{opacity:0}, {opacity:1})

//for mouse animation color
let mouseDown =false
let rgb = [];
window.addEventListener("mousedown",()=>(mouseDown =true))
window.addEventListener("mouseup",()=>(mouseDown =false))

window.addEventListener('mousemove',(e)=>{
    if(mouseDown){
rgb = [
    Math.round((e.pageX/ size.width)* 255),
    Math.round((e.pageY/ size.height)* 255),
    150,
    // console.log(rgb)
]

let newColor =new THREE.Color(`rgb(${rgb.join(",")})`)
gsap.to(mesh.material.color, {r:newColor.r,g: newColor.g, b:newColor.b,})
    }
})
