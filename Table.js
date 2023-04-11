/**
 * @param {*} B - BellmanFord Object
 */
function bellmClickHandler(B){
    document.getElementById('table-view').textContent = "";
    makeTables();
    let res = stepper2.next().value;
    for (const [key1,value1] of Object.entries(B.bfTable)) {
            const table = document.getElementById('table'+key1);
            for (const [key2, value2] of Object.entries(value1)){
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                nameCell.textContent = key2;
                const distCell = document.createElement('td');
                console.log(value2[0]);
                distCell.textContent = value2[0];
                row.appendChild(nameCell);
                row.appendChild(distCell);
                table.appendChild(row);
            }

        };
}

/**
 * 
 * @param {*} dijk - Dijkstra object
 */
function dijkClickHandler(dijk){
    document.getElementById('table-view').textContent = "";
    const tv = document.getElementById('table-view');
    const table = document.createElement('table');
    const title = document.createElement('caption');
    title.textContent = dijk.start;
    table.setAttribute('id', 'table'+dijk.start);
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

    
    stepper.next();
    
    for (const [key,value] of Object.entries(dijk.dijkstraDistances)) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = "Node: "+key;
        const distCell = document.createElement('td');
        distCell.textContent = value[0];
        row.appendChild(nameCell);
        row.appendChild(distCell);
        table.appendChild(row);

    };
    
}

function makeTables(){
    const tv = document.getElementById('table-view')
    for (const iterator of nodes) {
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