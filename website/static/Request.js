
//1D request, used for simulation purposes.
/*
    Has the hard coded locations of:
    Burlington
    BTV
    Montpelier
    Vergennes
    Weybridge
    Middlebury College
    Cornwall
    Lake dunmore
    Rutland
    Brandon
*/

var Request1D = /** @class */ (function () {
    //input similar to the original java code
    function Request1D(s, f, pt, dot,g) {
        if (((typeof s === 'number') || s === null) && ((typeof f === 'number') || f === null) && ((typeof pt === 'number') || pt === null) && ((typeof dot === 'boolean') || dot === true) && ((typeof g === 'object') || g === null) ) {
            var __args = arguments;

            //the user selected dropoff time
            this.locations = ["Burlington", "BTV", "Montpelier", "Vergennes", "Weybridge", "Middlebury College", "Cornwall", "Lake Dunmore", "Rutland", "Brandon"];
            this.startPos = this.locations[s];
            this.finishPos = this.locations[f];
            this.finishTime = pt;
            this.weight = g.getEdgeWeight(this.startPos,this.finishPos);
            this.pickTime = this.finishTime - this.weight;
            this.f_value = 0;
            this.isDot = dot;
            this.shift = 0;
        }
        else if (((typeof s === 'string') || s === null) && ((typeof f === 'string') || f === null) && ((typeof g === 'object') || g === null) && ((typeof pt === 'number') || pt === null) && ((typeof pt === 'number') || pt === null) && ((typeof dot === 'boolean') || dot === false) ) {
            var __args = arguments;

            //the user selected pickup time
            this.locations = ["Burlington", "BTV", "Montpelier", "Vergennes", "Weybridge", "Middlebury College", "Cornwall", "Lake Dunmore", "Rutland", "Brandon"];
            this.startPos = s;
            this.finishPos = f;
            this.pickTime = pt;
            this.weight = g.getEdgeWeight(this.startPos,this.finishPos);
            this.finishTime = this.pickTime + this.weight;
            this.f_value = 0;
            this.isDot = dot;
            this.shift = 0;
        }
        else if (((typeof s === 'number') || s === null) && ((typeof f === 'number') || f === null) && ((typeof g === 'object') || g === null) && ((typeof pt === 'number') || pt === null) && ((typeof pt === 'number') || pt === null) && ((typeof dot === 'boolean') || dot === false) ) {
            var __args = arguments;


            this.locations = ["Burlington", "BTV", "Montpelier", "Vergennes", "Weybridge", "Middlebury College", "Cornwall", "Lake Dunmore", "Rutland", "Brandon"];
            this.startPos = this.locations[s];
            this.finishPos = this.locations[f];
            this.pickTime = pt;
            this.weight = g.getEdgeWeight(this.startPos,this.finishPos);
            this.finishTime = this.weight + this.pickTime;
            this.f_value = 0;
            this.isDot = dot;
            this.shift = 0;
        }
        else
            throw new Error('invalid overload');
    }

    //Get the X3 value, else return 100,000
    Request1D.prototype.getX3 = function(lrl,g){
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
    Request1D.prototype.setf = function (weight1, weight2, weight3, input1, input2, input3) {
        this.f_value = weight1 * input1 + weight2 * input2 + weight3 * input3;
    };

    //Checks to see if this request equals request lr
    Request1D.prototype.equals = function (lr) {
        if ((this.startPos === lr.startPos) && (this.finishPos === lr.startPos) && this.pickTime === lr.pickTime)
            return true;
        return false;
    };

    //toString method
    Request1D.prototype.toString = function () {
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
     * @param {Request1D} lr
     * @return {number}
     */
    Request1D.prototype.compareTo = function (lr) {
        if (this.f_value > lr.f_value)
            return 1;
        else if (this.f_value === lr.f_value)
            return 0;
        else
            return -1;
    };
    return Request1D;
}());



Request1D = Request1D;
Request1D["__class"] = "Request1D";
Request1D["__interfaces"] = ["java.lang.Comparable"];
export{Request1D};

