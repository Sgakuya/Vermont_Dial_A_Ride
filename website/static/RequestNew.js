import{graphNew} from './graphNew.js';
var RequestNew = /** @class */ (function () {
    //input similar to the original java code
    function RequestNew(s, f, pt, g,r,u) { 
        if((typeof g === 'object')){

        this.startPos = s;
        this.finishPos = f;
        this.pickTime = pt;
        this.weight = g.getEdgeWeight(this.startPos,this.finishPos);
        this.finishTime = this.pickTime + this.weight;
        this.f_value = 0;
        this.shift = 0;
        this.rider = r;
        this.username = u;
        }
    }

    //Get the X3 value, else return 100,000
    RequestNew.prototype.getX3 = function(lrl,g){
        var min = 100000;
        for(var i = 0; i<lrl.length; i++){
            var x = lrl[i];
            if(this.equals(lrl)) continue;
            if(this.finishTime<=x.pickTime){
                var distToNext = g.getEdgeWeight(this.finishPos,x.startPos);
                if(distToNext<min) min = distToNext;
        }
        }
    
        return min;
    }
    //Sets f value
    RequestNew.prototype.setf = function (weight1, weight2, weight3, input1, input2, input3) {
        this.f_value = weight1 * input1 + weight2 * input2 + weight3 * input3;
    };

    //Checks to see if this request equals request lr
    RequestNew.prototype.equals = function (lr) {
        if ((this.startPos === lr.startPos) && (this.finishPos === lr.startPos) && this.pickTime === lr.pickTime)
            return true;
        return false;
    };

    //toString method
    RequestNew.prototype.toString = function () {
        if (this.pickTime % 60 < 10 && this.finishTime % 60 < 10) {
            return "StartPos: " + this.startPos + ", FinishPos: " + this.finishPos + ", (" + (this.pickTime / 60 | 0) + ":0" + this.pickTime % 60 + "," + (this.finishTime / 60 | 0) + ":0" + this.finishTime % 60 + "); ";
        }
        if (this.pickTime % 60 < 10) {
            return "StartPos: " + this.startPos + ", FinishPos: " + this.finishPos + ", (" + (this.pickTime / 60 | 0) + ":0" + this.pickTime % 60 + "," + (this.finishTime / 60 | 0) + ":" + this.finishTime % 60 + "); ";
        }
        if (this.finishTime % 60 < 10) {
            return "StartPos: " + this.startPos + ", FinishPos: " + this.finishPos + ", (" + (this.pickTime / 60 | 0) + ":" + this.pickTime % 60 + "," + (this.finishTime / 60 | 0) + ":0" + this.finishTime % 60 + "); ";
        }
        return "StartPos: " + this.startPos + ", FinishsPos: " + this.finishPos + ", (" + (this.pickTime / 60 | 0) + ":" + this.pickTime % 60 + "," + (this.finishTime / 60 | 0) + ":" + this.finishTime % 60 + "); ";
    };

   
    /**
     *
     * @param {RequestNew} lr
     * @return {number}
     */
     RequestNew.prototype.compareTo = function (lr) {
        if (this.f_value > lr.f_value)
            return 1;
        else if (this.f_value === lr.f_value)
            return 0;
        else
            return -1;
    };
    return RequestNew;
}());



RequestNew = RequestNew;
RequestNew["__class"] = "Request1D";
RequestNew["__interfaces"] = ["java.lang.Comparable"];
export{RequestNew};

