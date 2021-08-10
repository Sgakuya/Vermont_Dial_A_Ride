
var graphEdge = /** @class */ (function () {
    // do i need to pass in g?
        function graphEdge(s, f, weight) {
            if (((typeof s === 'string') || s === null) 
            && ((typeof f === 'string') || f === null)   
            && ((typeof weight === 'number' || weight ===null)) )
            {
                var __args = arguments;
    
                    this.startPos = s;
                    this.finishPos = f;
                    this.edgeWeight = weight;

                }else{
                    console.log("Vars: " + s + " " + f + " " + weight + " " );
                    throw new Error('invalid overload');
                }
                    
        }

        graphEdge.prototype.equals = function (lr) {
            if ((this.startPos === lr.startPos) && (this.finishPos === lr.startPos) && this.edgeWeight === lr.edgeWeight)
                return true;
            return false;
        };

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
    

    
    