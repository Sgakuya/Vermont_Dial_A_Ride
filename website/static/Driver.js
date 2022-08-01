//Driver Class to hold instances of driver
//similar to java code
//only difference is graph is passed into constructor to help calculate distances

export class Driver {
    constructor(name, origin, g){
        this.name = name;
        this.origin = origin;
        this.numRequests = 0;
        this.requests = [];
        this.graph = g;
    }

    //this might not work as intended
    //debug
    addRequest(lr){
        this._numRequests++;
        this._requests.push(lr);
    }

    remRequest(lr){
        this._numRequests--;
        var newArr = [];
        newArr = this._requests.filter(lr);
        Object.assign(this._requests, newArr);
    }

    editNumReq(val){
        this._numRequests = 0;
    }

    set name(n){
        this._name = n;
    }

    set origin(o){
        this._origin = o;
    }

    set numRequests(x){
        this._numRequests = x;
    }

    set requests(rList){
        this._requests = rList;
    }

    get name(){
        return this._name;
    }

    get numReq(){
        return this._numRequests;
    }

    get origin(){
        return this._origin;
    }

    get requests(){
        return this._requests;
    }

    //function to get distance between specified request and this driver
    distToReq(reqStartPos){
        return this.graph.getEdgeWeight(this._origin, reqStartPos);
    }

    //function to check equality of drivers
    equals(DriverB){
        if(this.name == DriverB.name && this.origin == DriverB.origin && this.numRequests == DriverB.numRequests){
            return true
        }
        return false;
    }

}