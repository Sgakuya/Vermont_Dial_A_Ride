/*
    graphEdge class
    Stores a starting location, a finishing position, and the travel
    time from start to finish
*/
var graphEdge = /** @class */ (function () {
    // do i need to pass in g?
        function graphEdge(s, f, weight) {
            if (((typeof s === 'string') || s === null) 
            && ((typeof f === 'string') || f === null)   
            && ((typeof weight === 'number' || weight ===null)) )
            {
                var __args = arguments;
                    //set variables
                    this.startPos = s;
                    this.finishPos = f;
                    this.edgeWeight = weight;

                }else{
                    console.log("Vars: " + s + " " + f + " " + weight + " " );
                    throw new Error('invalid overload');
                }
                    
        }

        //Check to see if this graphEdge equals graphEdge lr
        graphEdge.prototype.equals = function (lr) {
            if ((this.startPos === lr.startPos) && (this.finishPos === lr.startPos) && this.edgeWeight === lr.edgeWeight)
                return true;
            return false;
        };

        //toString function
        graphEdge.prototype.toString = function () {
            return ("StartPos: " + this.startPos + ", FinishPos: " + this.finishPos + ", Travel Time: " + this.edgeWeight);
        };
    
        /**
         *
         * @param {graphEdge} lr
         * @return {number}
         */
        graphEdge.prototype.compareTo = function (lr) {
            if (this.edgeWeight > lr.edgeWeight)
                return 1;
            else if (this.edgeWeight === lr.edgeWeight)
                return 0;
            else
                return -1;
        };
        return graphEdge;
    }());
    

export{graphEdge};

    
    