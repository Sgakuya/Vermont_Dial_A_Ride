
var graphNew = /** @class */ (function () {
    function graphNew() {
        this.vtMap = ({});
        this.locations = [];

    }

    graphNew.prototype.addVertex = function (n, p) {
                (this.vtMap[n] = new Vertex(n, p));
    };
    graphNew.prototype.addEdge = function (v1, v2, weight) {
        var edge = new Edge(v1.name, v2.name, weight);
                (v1.edges[v2.name] = edge);
    };
    graphNew.prototype.getEdgeWeight = function (s1, s2) {
        if (s1 === s2) {
            return 0;
        }
        return  (function (m, k) { return m[k] === undefined ? null : m[k]; })((function (m, k) { return m[k] === undefined ? null : m[k]; })(this.vtMap, s1).edges, s2).weight;
    };
    graphNew.prototype.printEdges = function (){
        for(let i = 0; i<this.locations.length; i++){
            for(let j = 0; j<this.locations.length; j++){
            }
        }
    };
    graphNew.prototype.printgraphNew = function () {
        {
            var arr = /* entrySet */ (function (o) {
                var s = []; for (var e in o)
                    s.push({ k: e, v: o[e], getKey: function () { return this.k; }, getValue: function () { return this.v; } }); return s;
            })(this.vtMap);
            for (var i = 0; i < arr.length; i++) {
                var e = arr[i];
                {
                    console.info("Key: " + e.getKey() + " Value: " + e.getValue().toString());
                    //console.info(this.getEdgeWeight('Burlington','Middlebury College'));
                }
            }
        }
    };
    return graphNew;
}());

graphNew = graphNew;
graphNew["__class"] = "graphNew";
var Vertex = /** @class */ (function () {
    function Vertex(n, p) {
        if (this.name === undefined) {
            this.name = null;
        }
        if (this.pos === undefined) {
            this.pos = 0;
        }
        if (this.edges === undefined) {
            this.edges = null;
        }
        this.name = n;
        this.pos = p;
        this.edges = ({});
    }
    Vertex.prototype.toString = function () {
        var res = this.name + " " + this.pos + "\n";
        {
            var arr = /* entrySet */ (function (o) {
                var s = []; for (var e in o)
                    s.push({ k: e, v: o[e], getKey: function () { return this.k; }, getValue: function () { return this.v; } }); return s;
            })(this.edges);
            for (var i = 0; i < arr.length; i++) {
                var e = arr[i];
                {
                    res += e.toString() + "\n";
                }
            }
        }
        return res;
    };
    return Vertex;
}());
Vertex = Vertex;
Vertex["__class"] = "Vertex";
var Edge = /** @class */ (function () {
    function Edge(s, d, w) {
        if (this.source === undefined) {
            this.source = null;
        }
        if (this.destination === undefined) {
            this.destination = null;
        }
        if (this.weight === undefined) {
            this.weight = 0;
        }
        this.source = s;
        this.destination = d;
        this.weight = w;
    }
    Edge.prototype.toString = function () {
        return this.source + " to " + this.destination + ": " + this.weight + " minutes driving";
    };
    return Edge;
}());
Edge = Edge;
Edge["__class"] = "Edge";

export { graphNew, Vertex, Edge };