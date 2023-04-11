var net = cytoscape({
    container: document.getElementById("canvas"), // container to render in
    style: [
        {
            selector: 'node',
            style: {
                'label': 'data(label)', // uses the "label" property value from node's data property
                'text-valign': 'center', // sets vertical alignment of label
                'text-halign': 'center' // sets horizontal alignment of label
            }
        },
        {
            selector: 'edge',
            style: {
                'label': 'data(weight)', // uses the "weight" property value from edge's data property as the label
                'text-margin-x': 10, // sets margin for label along the x-axis
                'text-margin-y': -10 // sets margin for label along the y-axis
            }
        }
    ],
});

var g = new graph();

/**
 * Builds a sample graph
 */
function buildDefault() {
    g.nodes = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6']
    g.edges = [['n1', 'n2', 5], 
             ['n1', 'n4', 6], 
             ['n1', 'n3', 3], 
             ['n2', 'n4', 4], 
             ['n2', 'n5', 2], 
             ['n2', 'n6', 2], 
             ['n3', 'n4', 2], 
             ['n3', 'n6', 8], 
             ['n5', 'n6', 7]]
    
    for (let node of g.nodes) {
        net.add({group: "nodes", data: {id: node, label: node}});
    }
    for (let edge of g.edges) {
        net.add({group: "edges", data: {id: edge[0]+"_"+edge[1], weight: edge[2], source: edge[0], target: edge[1]}});
    }
    net.layout({name: "grid"}).run();
}

/**
 * Takes the value from node input field and adds the node to the graph.
 * If successful, renders the node on the canvas.
 */
function renderNode() {
    let node = document.getElementById("node").value;
    
    if (g.addNode(node)) {
        net.add({group: "nodes", data: {id: node, label: node}});
        net.layout({name: "grid"}).run();
    }
}

/**
 * Takes the values from edge input fields and adds the edge to the graph.
 * If successful, renders the edge on the canvas.
 */
function renderEdge() {
    let node_x = document.getElementById("node_x").value;
    let node_y = document.getElementById("node_y").value;
    let weight = Number(document.getElementById("weight").value);
    
    if (g.addEdge(node_x, node_y, weight)) {
        net.add({group: "edges", data: {id: node_x+"_"+node_y, weight: weight, source: node_x, target: node_y}});
    }
}

function colorNode(node, color) {
    identity = '[id = "' + node + '"]';
    net.nodes(identity).style('background-color', color);
}

function colorEdge(edge, color) {
    identity = '[id = "' + edge[0]+"_"+ edge[1] + '"]';
    net.edges(identity).style('line-color', color);
}

function resetColors() {
    for (let node of g.nodes){
        identity = '[id = "' + node + '"]';
        net.nodes(identity).style('background-color', 'grey');
    }
    for (let edge of g.edges){
        identity = '[id = "' + edge[0]+"_"+ edge[1] + '"]';
        net.edges(identity).style('line-color', 'grey');
    }
}

/**
 * Takes the values from path input fields and creates a Dijkstras object using them and the graph.
 * Disables the algorithm buttons until the algorithm goes to completion. 
 * Steps through the edges and generates the path.
 */
function pathDijkstras() {
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    
    let d = new Dijkstras(g, start, end);
    console.log("new d created");
    console.log(d)
    let step = d.stepThrough();

    if (!d.solved) {
       
        for (let button of document.getElementsByClassName("locked-button")) {
            button.disabled = true;
        }
        document.getElementById("d-step").disabled = false;
    }

    resetColors();

    document.getElementById("d-step").addEventListener("click", () => {
        step.next();

        resetColors();
        for (let edge of d.dijkstraPossibleEdges) {
            colorEdge([edge[0], edge[1]], "orange");
        }
        for (let node of d.dijkstraNodes) {
            colorNode(node, "green");
        }
        for (let edge of d.dijkstraEdges) {
            colorEdge([edge[0], edge[1]], "green");
        }

        dijkstraTableGenerator(d);

        if (d.solved) {
            path = d.dijkstraDistances[end][1];
            resetColors();

            for (let node of path){
                colorNode(node, "green");
            }
            for (var i = 0; i < path.length - 1; i++) {
                colorEdge([path[i], path[i+1]], "green");
                colorEdge([path[i+1], path[i]], "green");
            }

            for (let button of document.getElementsByClassName("locked-button")) {
                button.disabled = false;
            }
            document.getElementById("d-step").disabled = true;
            d = null;
        }
    });
}

function pathBellman() {
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    
    let b = new BellmanFord(g, start, end);
    let step = b.stepThrough();

    if (!b.solved) {
        for (let button of document.getElementsByClassName("locked-button")) {
            button.disabled = true;
        }
        document.getElementById("b-step").disabled = false;
    }

    resetColors();

    document.getElementById("b-step").addEventListener("click", () => {
        step.next();
        console.log(b);
        bellmanTableGenerator(b);

        if (b.solved) {
            path = b.bfTable[start][end][1];

            for (let node of path){
                colorNode(node, "green");
            }
            for (var i = 0; i < path.length - 1; i++) {
                colorEdge([path[i], path[i+1]], "green");
                colorEdge([path[i+1], path[i]], "green");
            }


            for (let button of document.getElementsByClassName("locked-button")) {
                button.disabled = false;
            }
            document.getElementById("b-step").disabled = true;
            b = null;
        }
    });
}