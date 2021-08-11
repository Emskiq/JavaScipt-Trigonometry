var vector={
    _x:1,
    _y:0,

    create:function(x,y){
        var obj=Object.create(this);
        obj.setX(x);
        obj.setY(y);
        return obj;
    },
    setX:function(value){
        this._x=value;
    },
    getX:function(){
        return this._x;
    },
    setY:function(value){
        this._y=value;
    },
    getY:function(){
        return this._y;
    },
    setAngle:function(angle){
        var lenght=this.getLength();
        this._x=Math.cos(angle)*lenght;
        this._y=Math.sin(angle)*lenght;
    },
    getAngle:function(){
        return Math.atan2(this._y,this._x);
    },
    setLength:function(lenght){
        var angle=this.getAngle();
        this._x=Math.cos(angle)*lenght;
        this._y=Math.sin(angle)*lenght;
    },
    getLength:function(){
        return Math.sqrt(this._x*this._x+this._y*this._y);
    },
    add:function(v2){
        return vector.create(this._x+v2.getX(),this._y+v2.getY());
    },
    subtract:function(v2){
        return vector.create(this._x0-v2.getX(),this._y-v2.getY());
    },
    multiply:function(val){
        return vector.create(this._x*val,this._y*val);
    },
    devide:function(val){
        return vector.create(this._x0/val,this._y/val);
    },
    addTo:function(v2){
        this._x+=v2.getX();
        this._y+=v2.getY();
    },
    subtractFrom:function(v2){
        this._x-=v2.getX();
        this._y-=v2.getY();
    },
    multiplyBy:function(val){
        this._x*=val;
        this._y*=val;
    },
    devideBy:function(val){
        this._x/=val;
        this._y/=val;
    },
};
/*
var v1=vector.create(10,5),
    v2=v1.multiply(2);

console.log(v1.getLength());
console.log(v2.getLength());*/













/*
window.onload=function(){    
    var canvas=document.getElementById("canvas"),
        context=canvas.getContext("2d"),
        width=canvas.width=window.innerWidth,
        height=canvas.height=window.innerHeight;

}*/