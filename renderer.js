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