var cy = cytoscape({
    container: document.getElementById("cy"), // container to render in
});

cy.add([
    { group: 'nodes', data: { id: 'n0' }, position: { x: 1000, y: 100 } },
    { group: 'nodes', data: { id: 'n1' }, position: { x: 200, y: 200 } },
    { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } }
]);

cy.center();
cy.fit();