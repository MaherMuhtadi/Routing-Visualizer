var cy = cytoscape({
    container: document.getElementById("cy"), // container to render in
});

// test nodes
cy.add([
    { group: 'nodes', data: { id: 'n0' }},
    { group: 'nodes', data: { id: 'n1' }},
    { group: 'nodes', data: { id: 'n2' }},
    { group: 'nodes', data: { id: 'n3' }},
    { group: 'nodes', data: { id: 'n4' }},
    { group: 'nodes', data: { id: 'n5' }},
    { group: 'nodes', data: { id: 'n6' }},
    { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } },
    { group: 'edges', data: { id: 'e1', source: 'n3', target: 'n2' } },
    { group: 'edges', data: { id: 'e2', source: 'n6', target: 'n0' } },
    { group: 'edges', data: { id: 'e3', source: 'n4', target: 'n5' } }
]);

cy.layout({
    name: "concentric",
    minNodeSpacing: 50
}).run();