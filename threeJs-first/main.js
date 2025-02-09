import * as THREE from 'three'
import './src/../../style.css'

const scene = new THREE.Scene;
const geometry = new THREE.SphereGeometry( 3, 64, 64 );
const material = new THREE.MeshStandardMaterial({color:"#da26e0"})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const size = {
    width:window.innerWidth,
    height:window.innerHeight
}

const light = new THREE.PointLight(0xffffff,150,150)
light.position.set(0,10,10)
scene.add(light)
const camera =new THREE.PerspectiveCamera(45,size.width/size.height)
camera.position.z =30
scene.add(camera)

const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})

renderer.setSize(size.width, size.height)
renderer.render(scene,camera)




window.addEventListener('resize',()=>{
    size.width = window.innerWidth
    size.height = window.innerHeight

})