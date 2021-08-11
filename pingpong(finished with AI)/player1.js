var player={
    x:1,
    y:0,
    width:0,
    height:0,
    create:function(x,y,width,height){
        var obj=Object.create(this);
        obj.x=x;
        obj.y=y;
        obj.width=width;
        obj.height=height;
        return obj;
    },
    update:function(newY){
        this.y=newY;
    }
};
