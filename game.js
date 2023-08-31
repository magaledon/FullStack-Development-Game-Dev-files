

const canvas=document.querySelector('canvas')
const c=canvas.getContext('2d')

canvas.width=1024
canvas.height=576
const gravity=0.5

class Player{
     
    constructor(){
        this.speed=10
        this.position={
            x: 100, y: 100
        }
        this.velocity={
            x: 0,y: 1
        }
        this.width=60
        this.height=140
        this.image=standright
        this.frames=0
        this.sprites={
            stand:{
                right:standright,
                left:standleft,
                cropWidth:177,
                width:66
            },
            run:{
               right: runright,
               left:runleft,
               cropWidth:342,
               width:127.875
            }
        }
    this.currentsprite=this.sprites.stand.right
    this.currentCropWidth=177
    }
    draw(){
        c.drawImage(this.currentsprite,
           this.currentCropWidth*this.frames,0,this.currentCropWidth,400,
            this.position.x,
            this.position.y,
            this.width,
            this.height)

    }

    update(){
        this.frames++
        if(this.frames>59 && (this.currentsprite===this.sprites.stand.right || this.currentsprite===this.sprites.stand.left) )
         this.frames=0
        else if(this.frames>29 && 
            (this.currentsprite===this.sprites.run.right
        || this.currentsprite===this.sprites.run.left))
         this.frames=0
        this.draw()
        this.position.y+=this.velocity.y
        this.position.x+=this.velocity.x

        if(this.position.y+this.height+this.velocity.y<=canvas.height)
         this.velocity.y+=gravity
       
    }
}



//platform class
class Platform{
    constructor({x,y,image}){
        this.position={
            x,y
        }
        this.image=image
        this.width=image.width
        this.height=image.height
        
    }
    draw(){
       c.drawImage(this.image,this.position.x,this.position.y)
    }
}

class Genericobjects{
    constructor({x,y,image}){
        this.position={
            x,y
        }
        this.image=image
        this.width=image.width
        this.height=image.height
        
    }
    draw(){
       c.drawImage(this.image,this.position.x,this.position.y)
    }
}



const image=new Image()
image.src='./platform.png';
const bgimg=new Image();
bgimg.src='./background.png';
const hill=new Image()
hill.src='./hills.png';
const platform2=new Image()
platform2.src='./platformSmallTall.png';
const runleft=new Image()
runleft.src='./spriteRunLeft.png';
const runright=new Image()
runright.src='./spriteRunRight.png';
const standleft=new Image()
standleft.src='./spriteStandLeft.png';
const standright=new Image()
standright.src='./spriteStandRight.png';



let player=new Player()


let platforms=[ 
   
 ]
//player.draw()

let genobj=[
    
]
let currentkey
let keys={
    right:{
        pressed:false},
        left:{
            pressed:false}
        }

let scrollofset=0

function init(){
 
 player=new Player()
 platforms=[new Platform({x:platform2.width*4+300+1800,y:290,image}),
    new Platform({x:-1,y:450,image:image}), 
    new Platform({x:image.width -3,y:450,image}), 
    new Platform({x:image.width*2 +100,y:450,image}),
    new Platform({x:image.width*3 +300,y:450,image}),
    new Platform({x:image.width*4 +300-2,y:450,image}),
    new Platform({x:image.width*4 +300+1600,y:300,image}),
    new Platform({x:image.width*4 +300+2600,y:300,image}),
    new Platform({x:image.width*4 +300+3700,y:300,image}),
    new Platform({x:image.width*4 +300+4900,y:450,image})
    
 ]
//player.draw()

 genobj=[
    new Genericobjects({
        x:-1,
        y:-1,
        image: bgimg
    }),
    new Genericobjects({
        x:-1,
        y:-1,
        image: hill
    })
]


 scrollofset=0
}

function animate(){
    
    requestAnimationFrame(animate)
    c.fillStyle='white'
    c.fillRect(0,0,canvas.width, canvas.height)

    genobj.forEach(genobj=>{
        genobj.draw()
    })
    
    platforms.forEach((platform)=>{
        platform.draw()
    })
    player.update()
    
    
   // platform.draw()

    if(keys.right.pressed && player.position.x<400){
        player.velocity.x=player.speed
    }else if(keys.left.pressed && player.position.x>100 
        || keys.left.pressed && scrollofset==0 && player.position.x>0){
         player.velocity.x=-player.speed
    }else {
        player.velocity.x=0

        if(keys.right.pressed){
            scrollofset+=player.speed
            platforms.forEach((platform)=>{
                platform.position.x-=player.speed  
            })
            genobj.forEach(genobj=>{
                genobj.position.x-=player.speed*0.66
            })
            
        }else if(keys.left.pressed && scrollofset>0){
            scrollofset-=player.speed
            platforms.forEach((platform)=>{
                platform.position.x+=player.speed
            })
            genobj.forEach(genobj=>{
                genobj.position.x+=player.speed*0.66
            })
            
        }
        
    }

//platformcollision
platforms.forEach((platform)=>{
    if(player.position.y+player.height<=platform.position.y
        && player.position.y+player.height+player.velocity.y
        >=platform.position.y && player.position.x+player.width>=platform.position.x
        && player.position.x<=platform.position.x+platform.width){
        player.velocity.y=0
    }
})



if(keys.right.pressed && currentkey==='right' && player.currentsprite!==player.sprites.run.right){
    player.frames=1
    player.currentsprite=player.sprites.run.right
    player.currentCropWidth=player.sprites.run.cropWidth
    player.width=player.sprites.run.width
} else if(keys.left.pressed && currentkey==='left' && player.currentsprite!==player.sprites.run.left){
    player.currentsprite=player.sprites.run.left
    player.currentCropWidth=player.sprites.run.cropWidth
    player.width=player.sprites.run.width
}
else if(!keys.left.pressed && currentkey==='left' && player.currentsprite!==player.sprites.stand.left){
    player.currentsprite=player.sprites.stand.left
    player.currentCropWidth=player.sprites.stand.cropWidth
    player.width=player.sprites.stand.width
}
else if(!keys.right.pressed && currentkey==='right' && player.currentsprite!==player.sprites.stand.left){
    player.currentsprite=player.sprites.stand.right
    player.currentCropWidth=player.sprites.stand.cropWidth
    player.width=player.sprites.stand.width
}
// win condition
  if(scrollofset>image.width*4 +300+4900){
    alert("level complete")
  }
//lose condition
if(player.position.y>canvas.height){
    init()
}
}
init()
animate()

window.addEventListener('keydown',({keyCode})=>{
    switch(keyCode){
        case 65:
            keys.left.pressed=true
            currentkey='left'
            break
        case 83:
            break
        case 68:
          keys.right.pressed=true
          currentkey='right'
            break
        case 87:
            player.velocity.y-=15
            break
    }
})

window.addEventListener('keyup',({keyCode})=>{
    switch(keyCode){
        case 65:
            keys.left.pressed=false
            break
        case 83:
            break
        case 68:
            keys.right.pressed=false
           
            break
        case 87:
            
            break
    }
})