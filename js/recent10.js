var fdb = new ForerunnerDB();
var db = fdb.db("accounting")
var accountingCollection = db.Collection('accounting');
accountingCollection.load();

