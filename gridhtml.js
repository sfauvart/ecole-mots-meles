let options = {
    cols: 10,
    rows: 8,
    disabledDirections: ["N", "W", "NE", "NW", "SE", "SW"], //  (any of "N", "S", "E", "W", "NE", "NW", "SE" or "SW")
    maxWords: 20,
    backwardsProbability: 0.3,
    upperCase: false,
    diacritics: true
};

function generate() {
    options.cols = +$('input[id="width"]').val()
    options.rows = +$('input[id="height"]').val()
    options.dictionary = $('input[id="words"]').val().split(' ')

    // Create a new puzzle
    const ws = new WordSearch(options);

    let nodesGrid = Array(ws.grid.length).fill(0);

    const grid = $('#grid');

    grid.empty();
    const title = document.createElement("h1");
    title.textContent = $('input[id="title"]').val();
    document.title = $('input[id="title"]').val();

    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    grid.append(title);
    grid.append(table);

    const list = document.createElement("ul");
    list.className = "cloud";
    options.dictionary.forEach(word => {
        const node = document.createElement("li");
        node.textContent = word;
        list.append(node);
    })
    grid.append(list);

    ws.grid.forEach((row, i) => {
        const nodeUl = document.createElement("tr");

        nodesGrid[i] = Array(row.length).fill(0);

        row.forEach((letter, j) => {
            const node = document.createElement("td");
            const textnode = document.createTextNode(letter);
            node.appendChild(textnode);
            nodeUl.appendChild(node);
            nodesGrid[i][j] = node;
        })
        tbody.append(nodeUl);
    });

    ws.words.forEach((word) => {
        word.path.forEach(path => {
            nodesGrid[path.y][path.x].className = 'blue';
        })
    })
}
