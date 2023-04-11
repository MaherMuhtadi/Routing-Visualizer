class BFord{
    /**
     * 
     * @param {*} graph - a graph object 
     * @param {*} start 
     * @param {*} end 
     */
    constructor(graph, start, end){
        this.G = graph;
        this.start = start;
        this.end = end;
        this.bfTable = {};
    
    }

    *stepThrough(){
        if (this.G.nodes.includes(this.start) && this.G.nodes.includes(this.end)) {
            let propagationTable = {};
            for (let i of this.G.nodes) {
                let currTable = {};
                for (let j of this.G.nodes) {
                    if (i === j) {
                        currTable[j] = [0, [j]];
                    } else {
                        currTable[j] = [Infinity, []];
                    }
                }
                this.bfTable[i] = { ...currTable };
                propagationTable[i] = { ...currTable };
            }
            yield;
            
            let update = true;
            while (update) {
                update = false;
                for (let i of this.G.nodes) {
                    for (let j of this.G.edges) {
                        if (j[0] === i || j[1] === i) {
                            let other = j[0] === i ? j[1] : j[0];
                            for (let k of this.G.nodes) {
                                if (this.bfTable[other][k][0] + j[2] < propagationTable[i][k][0]) {
                                    propagationTable[i][k] = [this.bfTable[other][k][0] + j[2], [i].concat(this.bfTable[other][k][1])];
                                    update = true;
                                    
            
                                }
                            }
                        }
                    }
                }
                for (let i of this.G.nodes) {
                    let currTable = {};
                    for (let j of G.nodes) {
                        currTable[j] = [propagationTable[i][j][0], [...propagationTable[i][j][1]]];
                    }
                    this.bfTable[i] = { ...currTable };
                    
                }
                yield;
            }
           
        }
    }

}