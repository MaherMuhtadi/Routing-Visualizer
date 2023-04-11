/**
 * Generates table at each step of the Dijkstra's algorithm
 * @param {*} dijk - Dijkstra object
 */
function dijkstraTableGenerator(dijk){
    document.getElementById('table-view').textContent = "";
    const tv = document.getElementById('table-view');
    const table = document.createElement('table');
    table.setAttribute('id', 'table'+dijk.start);
    const headerRow = document.createElement('tr'); 
    const nodeHeader = document.createElement('th');
    nodeHeader.textContent = 'Node';
    const distanceHeader = document.createElement('th');
    distanceHeader.textContent = 'Distance from '+dijk.start;
    headerRow.appendChild(nodeHeader);
    headerRow.appendChild(distanceHeader);
    table.appendChild(headerRow);
    tv.appendChild(table);
    
    for (const [key,value] of Object.entries(dijk.dijkstraDistances)) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = key;
        const distCell = document.createElement('td');
        distCell.textContent = value[0];
        row.appendChild(nameCell);
        row.appendChild(distCell);
        table.appendChild(row);
    };    
}

/**
 * Generates table at each step of the Bellman-Ford algorithm
 * @param {*} B - BellmanFord Object
 */
function bellmanTableGenerator(B){
    document.getElementById('table-view').textContent = "";
    makeTables(B);
    for (const [key1,value1] of Object.entries(B.bfTable)) {
            const table = document.getElementById('table'+key1);
            for (const [key2, value2] of Object.entries(value1)){
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                nameCell.textContent = key2;
                const distCell = document.createElement('td');
                distCell.textContent = value2[0];
                row.appendChild(nameCell);
                row.appendChild(distCell);
                table.appendChild(row);
            }
        };
}

function makeTables(algorithm){
    const tv = document.getElementById('table-view')
    for (const iterator of algorithm.G.nodes) {
        const table = document.createElement('table');
        const title = document.createElement('caption');
        title.textContent = iterator;
        table.setAttribute('id', 'table'+iterator);
        const headerRow = document.createElement('tr'); 
        const nodeHeader = document.createElement('th');
        nodeHeader.textContent = 'Node';
        const distanceHeader = document.createElement('th');
        distanceHeader.textContent = 'Distance';
        headerRow.appendChild(nodeHeader);
        headerRow.appendChild(distanceHeader);
        table.appendChild(title);
        table.appendChild(headerRow);
        tv.appendChild(table);
    }
}