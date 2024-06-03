export const API_KEY='AIzaSyAYX8UoDOiWYsxl6dUtrzQH4p5KbF-zLro';
export const value_converter = (value)=>{
    if(value>=1000000)
    {
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000)
    {
        return Math.floor(value/1000)+"K";
    }
    else{
        return value;
    }
}