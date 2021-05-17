import React, {Component} from "react";
import ReactDOM from "react-dom";
export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            height:window.innerHeight,
            width:window.innerWidth,
            height2:document.body.scrollHeight - window.innerHeight,
            pointCount:30,
            pointArray:[],

            backgroundColor:{
              r:0,
              g:0,
              b:0,
            },

            dotColor:{
              r:0,
              g:40,
              b:0,
            },
            dotSize:{
              min:0,
              max:10
            },
            dotOpacity:{
              min:0,
              max:100
            },
            dotDirection:{
              left:true,
              right:true,
              up:true,
              down:true
            },
            dotSpeed:1,
            drawLines:true,
            lineDistance:100,

            exportOpen:false,
            exportReactScript:"",
        
            optionOpen:true,
        }
    }
    compileExport(){
      let x =
      'import React, {Component} from "react";'+
      '\nimport ReactDOM from "react-dom";'+
      '\nexport default class ParticlesCanvas extends React.Component{'+
      '\n constructor(props){'+
      '\n   super(props);'+
      '\n   this.state={' +
      '\n     height:window.innerHeight,' +
      '\n     width:window.innerWidth,'+
      '\n     height2:document.body.scrollHeight - window.innerHeight,'+
      '\n     pointCount:'+this.state.pointCount+','+
      '\n     pointArray:[],'+
      '\n     backgroundColor:{'+
      '\n       r:'+this.state.backgroundColor.r+','+
      '\n       g:'+this.state.backgroundColor.g+','+
      '\n       b:'+this.state.backgroundColor.b+','+
      '\n     },'+
      '\n     dotColor:{'+
      '\n       r:'+this.state.dotColor.r+','+
      '\n       g:'+this.state.dotColor.g+','+
      '\n       b:'+this.state.dotColor.b+','+
      '\n     },'+
      '\n     dotSize:{'+
      '\n       min:'+this.state.dotSize.min+','+
      '\n       max:'+this.state.dotSize.max+''+
      '\n     },'+
      '\n     dotOpacity:{'+
      '\n       min:'+this.state.dotOpacity.min+','+
      '\n       max:'+this.state.dotOpacity.max+''+
      '\n     },'+
      '\n     dotDirection:{'+
      '\n       left:'+this.state.dotDirection.left+','+
      '\n       right:'+this.state.dotDirection.right+','+
      '\n       up:'+this.state.dotDirection.up+','+
      '\n       down:'+this.state.dotDirection.down+''+
      '\n      },'+
      '\n     dotSpeed:'+this.state.dotSpeed+''+
      '\n   }'+
      '\n}'+

  
      '\ncomponentDidMount(){'+
      '\n let canvas = ReactDOM.findDOMNode(this.refs.canvas);'+
      '\n let ctx = canvas.getContext("2d");'+
      '\n canvas.width=this.state.width;'+
      '\n canvas.height=this.state.height;'+

      '\n //Adds points to array'+
      '\n var x = this.state.pointArray;'+
      '\n for(var i=0;i<this.state.pointCount;i++){    '+
      '\n   x.push(new point(this.state.width,this.state.height,this.state.dotDirection,this.state.dotSpeed));'+
      '\n }'+
      '\n this.setState({pointArray:x})'+

      '\n for(let i=0;i<this.state.pointCount;i++){'+
      '\n   this.state.pointArray[i].move(this.state.width,this.state.height,2);'+
      '\n   this.Drawpoint(this.state.pointArray[i]);'+
      '\n }'+

      '\nthis.timerID = setInterval('+
      '\n () => this.tick(),'+
      '\n 10'+
      '\n );'+
      '\n}'+

      '\nDrawpoint(point){'+
      '\n let canvas = ReactDOM.findDOMNode(this.refs.canvas);'+
      '\n let ctx = canvas.getContext("2d");'+
      '\n ctx.fillStyle = "rgba("+this.state.dotColor.r+","+this.state.dotColor.g+","+this.state.dotColor.b+","+point.opacity+")";'+
      '\n ctx.beginPath();'+
      '\n ctx.arc(point.xPos,point.yPos,point.size,0,2*Math.PI);'+
      '\n ctx.fill();'+
      '\n}'+

      '\nupdateWidth(){'+
      '\n let canvas = document.getElementById("fancyBox");'+
      '\n this.setState({width:window.innerWidth});'+
      '\n canvas.width=this.state.width;'+
      '\n}'+

      '\ntick(){'+
      '\n try{'+
      '\n   let canvas = document.getElementById("fancyBox");'+
      '\n   let ctx = canvas.getContext("2d");'+
      '\n   ctx.clearRect(0,0,this.state.width,this.state.height);'+

      '\n   for(let i=0;i<this.state.pointCount;i++){'+
      '\n     this.state.pointArray[i].move(this.state.width,this.state.height,this.state.dotSpeed);'+
      '\n     this.Drawpoint(this.state.pointArray[i]);'+
      '\n   }'+
      '\n }catch(e){'+
      '\n   console.log("dropped frame")'+
      '\n }'+
      '\n}'+

      '\nrender(){'+
      '\n return ('+
      '\n   <div >'+
      '\n     <canvas  id="fancyBox" ref="canvas" style={{backgroundColor:"rgb("+this.state.backgroundColor.r+"+"+this.state.backgroundColor.g+"+"+this.state.backgroundColor.b+")"}}/>'+
      '\n   </div>'+
      '\n )'+
      '\n}'+

      '\n}'+

      '\nclass point {'+
      '\n constructor(width,height2,dotDirection,dotSpeed) {   '+
      '\n   this.xPos = Math.random()*width;'+
      '\n   this.yPos = Math.random()*height2;'+
      '\n   this.size = Math.random()*20;'+
      '\n   this.opacity = Math.random()*1;'+
      '\n   if((Math.random()*2>1) && dotDirection.right){   //x direction'  +        
      '\n     this.velX =(Math.random()*2);   //Pos speed'+
      '\n   }else if(dotDirection.left){'+
      '\n     this.velX =(Math.random()*-2);  //Neg speed'+
      '\n   }else{'+
      '\n     this.velX = 0'+
      '\n   }'+
      '\n   if((Math.random()*2>1) && dotDirection.down){   //y direction '  +
      '\n     this.velY =Math.random()*2;     //Pos speed'+
      '\n   }else if(dotDirection.up){  '+
      '\n     this.velY =Math.random()*-2;    //Neg speed'+
      '\n   }else{'+
      '\n     this.velY = 0'+
      '\n   }'+
      '\n }'+

      '\n move(width,height2,speed){                  //updates position'+
      '\n   this.xPos+=(this.velX/3)*speed; '+
      '\n   this.yPos+=(this.velY/3)*speed; '+
      '\n   //Catches particles that go outside the right border'+
      '\n   if(this.xPos > width+100){'+
      '\n     this.xPos =-99;'+
      '\n   }'+
      '\n   //Catches particles that go outside the left border'+
      '\n   if(this.xPos <-100){'+
      '\n     this.xPos = width+100;'+
      '\n   }'+
      '\n   //catches particles that go outside the bottom border'+
      '\n   if(this.yPos > height2){'+
      '\n     this.yPos =0;'+
      '\n   }'+
      '\n   //catches particles that go outside the top border'+
      '\n   if(this.yPos <0){'+
      '\n     this.yPos=height2;'+
      '\n   }'+
      '\n }'+

      '\n} '
console.log(x);
this.setState({exportReactScript:x});
}
    updateValues(parentName,name,value){
      if(parentName!="na"){ //if there is a parent name
        let x = this.state[parentName];
        x[name] = value;
        this.setState({[parentName]:x})
      }else{  //no parent name
        this.setState({[name]:value})
      }

      if(parentName =="dotSize"){
        for(let i=0;i<this.state.pointCount;i++){
          this.state.pointArray[i].updateSize(this.state.dotSize.min,this.state.dotSize.max);

        }
      }
      if(parentName =="dotOpacity"){
        for(let i=0;i<this.state.pointCount;i++){
          this.state.pointArray[i].updateOpacity(this.state.dotOpacity.min,this.state.dotOpacity.max);

        }
      }
      if(parentName =="dotDirection"){
        for(let i=0;i<this.state.pointCount;i++){
          try{
            this.state.pointArray[i].updateDirection(this.state.dotDirection);
          }catch{
            
          }
        }
      }
      if(name=="pointCount"){
     
        let x = this.state.pointArray;
        if(x.length > value){
          //remove points
          x.splice(0,Math.abs(x.length-value))
        }else{
          //add points
          for(let i=0;i<Math.abs(x.length-value);i++){
            x.push(new point(this.state.width,this.state.height,this.state.dotDirection));
          }
        }
        this.setState({pointArray:x})
      }
    }


    componentDidMount(){
        let canvas = ReactDOM.findDOMNode(this.refs.canvas);
        let ctx = canvas.getContext('2d');
        ctx.lineWidth = 10;
        canvas.width=this.state.width;
        canvas.height=this.state.height;

   //Adds points to array
    var x = this.state.pointArray;
   for(var i=0;i<this.state.pointCount;i++){    
    x.push(new point(this.state.width,this.state.height,this.state.dotDirection));
    }
    this.setState({pointArray:x})


    for(let i=0;i<this.state.pointCount;i++){
        this.state.pointArray[i].move(this.state.width,this.state.height,2);
        this.Drawpoint(this.state.pointArray[i]);
    }

this.timerID = setInterval(
     () => this.tick(),
    10
  );
}
Drawpoint(point){
  // console.log(point.opacity)
    let canvas = ReactDOM.findDOMNode(this.refs.canvas);
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba('+this.state.dotColor.r+','+this.state.dotColor.g+','+this.state.dotColor.b+','+point.opacity+')';
    ctx.beginPath();
    ctx.arc(point.xPos,point.yPos,point.size,0,2*Math.PI);
    ctx.fill();
}

updateWidth(){
    let canvas = document.getElementById("fancyBox");
    this.setState({width:window.innerWidth});
    canvas.width=this.state.width;
}

drawLines(){
  let canvas = ReactDOM.findDOMNode(this.refs.canvas);
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';


  let x = this.state.pointArray;

  for(let i=0;i<x.length;i++){
    for(let j=0;j<x.length;j++){
      console.log(x[i].xPos)
   
        // ctx.beginPath();
        // ctx.moveTo(x[i].xPos, x[i].yPos);
        // ctx.lineTo(x[j].xPos, x[j].yPos);
        // ctx.stroke();
      
    }
  }
}

tick(){
    try{
  // console.log("tick")
  let canvas = document.getElementById("fancyBox");
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,this.state.width,this.state.height);

  //this.drawLines()
  for(let i=0;i<this.state.pointCount;i++){
      this.state.pointArray[i].move(this.state.width,this.state.height,this.state.dotSpeed);
      this.Drawpoint(this.state.pointArray[i]);
  }
    }catch(e){
        console.log("dropped frame")
    }
}

render(){
    return (
        <div >
          <canvas  id="fancyBox" ref="canvas" style={{backgroundColor:"rgb("+this.state.backgroundColor.r+"+"+this.state.backgroundColor.g+"+"+this.state.backgroundColor.b+")"}}/>
          {this.state.exportOpen ?(
          <div id="exportContainer">
            <div>
              <h3>Copy the code into a .js file and import the file into your react app</h3>
              <h4>Have fun</h4>
            </div>
            <textarea rows={50} cols ={120} readOnly="true">
              {this.state.exportReactScript}
            </textarea>
            <button onClick={()=>{this.setState({exportOpen:false})}}>Close</button>
          </div>
          ):(
            null
          )}
          {this.state.optionOpen ?(
              <div id="optionsContainer">
              <div id="optionsContainerHeader">
                <h1>Particle Options</h1>
                <button onClick={()=>{this.setState({optionOpen:false})}}>&#10094;</button>
              </div>
              <div className="singleOption">
                <h1 className="optionCategoryHeader">Dot Count</h1>
                <input type="range" min='0' max="100" value={this.state.pointCount} onChange={(e)=>{this.updateValues("na","pointCount",e.target.value)}}></input>
              </div>
  
  
  
              <div className="singleOption">
                <h1 className="optionCategoryHeader">Dot Speed</h1>
  
                <input type="range" min='0' max="15" value={this.state.dotSpeed} onChange={(e)=>{this.updateValues("na","dotSpeed",e.target.value)}}></input>
              </div>
              <div className="optionCategory">
                <h1 className="optionCategoryHeader">Background Color</h1>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Red</h3>
                  <input type="range" min='0' max="255" value={this.state.backgroundColor.r} onChange={(e)=>{this.updateValues("backgroundColor","r",e.target.value)}}></input>
                </div>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Green</h3>
                  <input type="range" min='0' max="255" value={this.state.backgroundColor.g} onChange={(e)=>{this.updateValues("backgroundColor","g",e.target.value)}}></input>
                </div>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Blue</h3>
                  <input type="range" min='0' max="255" value={this.state.backgroundColor.b} onChange={(e)=>{this.updateValues("backgroundColor","b",e.target.value)}}></input>
                </div>
              </div>
  
              <div className="optionCategory">
                <h1 className="optionCategoryHeader">Dot Color</h1>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Red</h3>
                  <input type="range" min='0' max="255" value={this.state.dotColor.r} onChange={(e)=>{this.updateValues("dotColor","r",e.target.value)}}></input>
                </div>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Green</h3>
                  <input type="range" min='0' max="255" value={this.state.dotColor.g} onChange={(e)=>{this.updateValues("dotColor","g",e.target.value)}}></input>
                </div>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Blue</h3>
                  <input type="range" min='0' max="255" value={this.state.dotColor.b} onChange={(e)=>{this.updateValues("dotColor","b",e.target.value)}}></input>
                </div>
              </div>
  
              <div className="optionCategory">
                <h1 className="optionCategoryHeader">Dot Size</h1>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Min</h3>
                  <input type="range" min='0' max="100" value={this.state.dotSize.min} onChange={(e)=>{this.updateValues("dotSize","min",e.target.value)}}></input>
                </div>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Max</h3>
                  <input type="range" min='0' max="100" value={this.state.dotSize.max} onChange={(e)=>{this.updateValues("dotSize","max",e.target.value)}}></input>
                </div>
              </div>
  
  
              <div className="optionCategory">
                <h1 className="optionCategoryHeader">Dot opacity</h1>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Min</h3>
                  <input type="range" min='0' max="100" value={this.state.dotOpacity.min} onChange={(e)=>{this.updateValues("dotOpacity","min",e.target.value)}}></input>
                </div>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Max</h3>
                  <input type="range" min='0' max="100" value={this.state.dotOpacity.max} onChange={(e)=>{this.updateValues("dotOpacity","max",e.target.value)}}></input>
                </div>
              </div>
  
              
  
           
  
  
              <div className="optionCategory">
                <h1 className="optionCategoryHeader">Flow Direction</h1>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Left?</h3>
                  <input type="checkbox" checked={this.state.dotDirection.left} onChange={(e)=>{this.updateValues("dotDirection","left",e.target.checked)}}></input>
                </div>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Right?</h3>
                  <input type="checkbox" checked={this.state.dotDirection.right} onChange={(e)=>{this.updateValues("dotDirection","right",e.target.checked)}}></input>
                </div>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Up?</h3>
                  <input type="checkbox" checked={this.state.dotDirection.up} onChange={(e)=>{this.updateValues("dotDirection","up",e.target.checked)}}></input>
                </div>
                <div className="singleOption">
                  <h3 className="singleOptionHeader">Down?</h3>
                  <input type="checkbox" checked={this.state.dotDirection.down} onChange={(e)=>{this.updateValues("dotDirection","down",e.target.checked)}}></input>
                </div>
              </div>
  
              <div>
                <button onClick={()=>{this.setState({exportOpen:true});this.compileExport();}}>Export</button>
              </div>
  
            </div>
            ):(
              <div>
                <button onClick={()=>{this.setState({optionOpen:true})}}>&#10095;</button>
              </div>
          )}
          
        </div>
        )
}
}
//updates thhe width of the canvases


class point {
    constructor(width,height2,dotDirection) {   
        this.xPos = Math.random()*width;
        this.yPos = Math.random()*height2;
        this.size = Math.random()*20;
        this.opacity = Math.random()*1;
           //both case
      if(dotDirection.right && dotDirection.left){
        if((Math.random()*2>1) ){              //X Direction
            this.velX =(Math.random()*2)+.5;   //Pos speed
        }else{
            this.velX =(Math.random()*-2)+.5;  //Neg speed
        }
      }
      //single cases
      if(dotDirection.right && !dotDirection.left){
        this.velX =(Math.random()*2)+.5;   //Pos speed
      }
      if(dotDirection.left && !dotDirection.right){
        this.velX =(Math.random()*-2)+.5;  //Neg speed
      }
      //no case
      if(!dotDirection.left && !dotDirection.right){
        this.velX =0
      }


    //both case
    if(dotDirection.up && dotDirection.down){
      if((Math.random()*2>1) ){              //X Direction
          this.velY =(Math.random()*2)+.5;   //Pos speed
      }else{
          this.velY =(Math.random()*-2)+.5;  //Neg speed
      }
    }
    //single cases
    if(dotDirection.down && !dotDirection.up){
      this.velY =(Math.random()*2)+.5;   //Pos speed
    }
    if(dotDirection.up && !dotDirection.down){
      this.velY =(Math.random()*-2)+.5;  //Neg speed
    }
    //no case
    if(!dotDirection.up && !dotDirection.down){
      this.velY =0
    }

     
    }
    updateDirection(){

    }
    move(width,height2,speed){                                 //updates position
        this.xPos+=(this.velX/3)*speed; 
        this.yPos+=(this.velY/3)*speed; 
        //Catches particles that go outside the right border
        if(this.xPos > width+100){
            this.xPos =-99;
        }
        //Catches particles that go outside the left border
        if(this.xPos <-100){
            this.xPos = width+100;
        }
        //catches particles that go outside the bottom border
        if(this.yPos > height2){
            this.yPos =0;
        }
        //catches particles that go outside the top border
        if(this.yPos <0){
            this.yPos=height2;
        }
    }
    updateSize(x,y){
      let q = Math.floor(Math.random()*(y-x))
      this.size=q+parseInt(x);
    }
    updateDirection(dotDirection){
     //both case
      if(dotDirection.right && dotDirection.left){
        if((Math.random()*2>1) ){              //X Direction
            this.velX =(Math.random()*2)+.5;   //Pos speed
        }else{
            this.velX =(Math.random()*-2)+.5;  //Neg speed
        }
      }
      //single cases
      if(dotDirection.right && !dotDirection.left){
        this.velX =(Math.random()*2)+.5;   //Pos speed
      }
      if(dotDirection.left && !dotDirection.right){
        this.velX =(Math.random()*-2)+.5;  //Neg speed
      }
      //no case
      if(!dotDirection.left && !dotDirection.right){
        this.velX =0
      }


    //both case
    if(dotDirection.up && dotDirection.down){
      if((Math.random()*2>1) ){              //X Direction
          this.velY =(Math.random()*2)+.5;   //Pos speed
      }else{
          this.velY =(Math.random()*-2)+.5;  //Neg speed
      }
    }
    //single cases
    if(dotDirection.down && !dotDirection.up){
      this.velY =(Math.random()*2)+.5;   //Pos speed
    }
    if(dotDirection.up && !dotDirection.down){
      this.velY =(Math.random()*-2)+.5;  //Neg speed
    }
    //no case
    if(!dotDirection.up && !dotDirection.down){
      this.velY =0
    }

     
    }
    updateOpacity(x,y){
      let q = Math.floor(Math.random()*(y-x))
      this.opacity=(q+parseInt(x))/100;
      console.log(this.opacity)
    }
    updateSpeed(x,y){
      let q = Math.floor(Math.random()*(y-x))
      this.speed=(q+parseInt(x))/100;
    }
}