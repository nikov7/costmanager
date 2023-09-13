const idb = {};

// Constructor for the idb.Database class
idb.Database = function (db) {
    let _db = db;

    // Method to get the database instance
    this.getDB = function () {
        return _db;
    }
}

// Method to add a cost to the database
idb.Database.prototype.addCost = function (cost) {
    return new Promise((resolve, reject) => {
        // Create a request to add the cost to the database
        let request = this.getDB().transaction(["costs"], "readwrite").objectStore("costs").add(cost);

        // Handle the success event when the cost is added
        request.onsuccess = (event) => {
            console.log("addCost(): added entry.");
            resolve(true);
        };

        // Handle errors when adding the cost
        request.onerror = (event) => {
            console.log("addCost(): problem with adding entry.");
            reject(false);
        };
    });
};

// Method to open the IndexedDB database
idb.openCostsDB = function (name, version) {
    return new Promise((resolve, reject) => {
        // Create a request to open the database
        let request = indexedDB.open(name, version);

        // Handle errors when opening the database
        request.onerror = (event) => {
            reject(null);
        };

        // Handle the success event when the database is opened
        request.onsuccess = (event) => {
            let db = event.target.result;
            resolve(new idb.Database(db));
        };

        // Handle the event when an upgrade is needed (e.g., first time database creation)
        request.onupgradeneeded = (event) => {
            console.log("upgrade needed");
            let db = event.target.result;
            // Create an object store named "costs" with auto-incrementing key
            let objectStore = db.createObjectStore("costs", { autoIncrement: true });
        };
    });
};
