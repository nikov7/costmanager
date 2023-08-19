const idb = {};

idb.Database = function(db) {
    let _db = db;

    this.getDB = function() {
        return _db;
    }
}

idb.Database.prototype.addCost = function(cost) {

    return new Promise((resolve, reject) => {

        let request = this.getDB().transaction(["costs"], "readwrite").objectStore("costs").add(cost);

        request.onsuccess = (event) => {
            console.log("addCost(): added entry.");
            resolve(true);
        };

        request.onerror = (event) => {
            console.log("addCost(): problem with adding entry.");
            reject(false);
        };

    });
};

idb.openDB = function(name, version) {
    return new Promise((resolve, reject) => {

        let request = indexedDB.open(name, version);
        request.onerror = (event) => {
            reject(null);
        };

        request.onsuccess = (event) => {
            let db = event.target.result;
            resolve(new idb.Database(db));
        };

        request.onupgradeneeded = (event) => {
            console.log("upgrade needed");
            let db = event.target.result;
            //let objectStore = db.createObjectStore("costs", {keyPath:"id"});
            let objectStore = db.createObjectStore("costs", {autoIncrement: true});
        };

    });
};

