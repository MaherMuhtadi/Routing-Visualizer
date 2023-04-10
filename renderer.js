var net = cytoscape({
    container: document.getElementById("canvas"), // container to render in
    style: [{
          selector: 'node',
          style: {
            'label': 'data(label)', // uses the "label" property from node's data property as the label
          }
        }],
});

var nodes = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6'];
var edges = [['n1', 'n2', 5], ['n1', 'n4', 6], ['n1', 'n3', 3], ['n2', 'n4', 4], ['n2', 'n5', 2], ['n2', 'n6', 2], ['n3', 'n4', 2], ['n3', 'n6', 8], ['n5', 'n6', 7]];
g = new graph(nodes, edges);

for (let node of g.nodes) {
    net.add({group: "nodes", data: {id: node, label: node}});
}
for (let edge of g.edges) {
    net.add({group: "edges", data: {id: edge[0]+edge[1], source: edge[0], target: edge[1]}});
}

net.layout({
    name: "grid",
}).run();