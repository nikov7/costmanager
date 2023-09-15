/*
    Nikita Vinnik 312535529
    Bar Salem 207351784
    Netanel Aharoni 312541576
*/

// idb namespace
const idb = {};

// Constructor function to set the current database instance
idb.Database = function(db) {
    let _db = db;

    this.getDB = function() {
        return _db;
    }
}

// Add a cost entry to the database
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

// Open the costs database with the given name and version
idb.openCostsDB = function(name, version) {
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

