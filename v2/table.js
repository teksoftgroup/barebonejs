export class TableColumn {
    constructor(id){
        this.id = id;
    }

    getData(row){
        return row[this.id];
    }
}

export class Table {
    constructor(columnNames){
        this.data = [];
        this.columns = new Map();

        columnNames.forEach((name, index) => {
            this.columns.set(name, new TableColumn(index));
        })
    }

    addRow(row){
        this.data.push(row);
    }

    getColumn(name){
        return this.columns.get(name);
    }

    forEachRow(callback){
        this.data.forEach(callback);
    }
}

// Usage example
// let table = new Table(['age', 'name']);
// table.addRow([24, 'Pascal']);
// table.addRow([25, 'Bascal']);

// let column = table.getColumn('age');

// table.forEachRow(row => {
//     console.log(column.getData(row));
// });