var fdb = new ForerunnerDB();
var db = fdb.db("accounting");
var accountingCollection = db.collection('accounting');
accountingCollection.load();
function createAccountingHTMLString(date, category, item, cost){
return "<tr><td>"+date+"</td><td>"+category+"</td><td>"+item+"</td><td>"+cost+"</td></tr>"
}
setTimeout(function(){
var accountings = accountingCollection.find(
{},
{
$orderBy: {"date":-1},
$limit: 10
}
);
for (var i = 0; i < accountings.length; i++) {
$("#accountingTable").append(createAccountingHTMLString(accountings[i].date, accountings[i].category, accountings[i].item, accountings[i].cost))
}
}, 500);