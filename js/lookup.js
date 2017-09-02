var fdb = new ForerunnerDB();
var db = fdb.db("accounting");
var accountingCollection = db.collection('accounting');
accountingCollection.load();
function createAccountingHTMLString(date, category, item, cost){
return "<tr><td>"+date+"</td><td>"+category+"</td><td>"+item+"</td><td>"+cost+"</td></tr>"
}
$("#lookup").click(function(){
$("#accountingTable").find("tr").remove();
if( $('input[name=method]:checked').val() == "curMonth"){
var date = new Date();
var year = date.getUTCFullYear();
var month = date.getUTCMonth() + 1;
if (month < 10){
month = "0" + month;
}
var dateString = year + "-" + month + "-01";
var accountings = accountingCollection.find(
{
date: {
$gte: dateString
}
}
);
for (var i = 0; i < accountings.length; i++) {
$("#accountingTable").append(createAccountingHTMLString(accountings[i].date, accountings[i].category, accountings[i].item, accountings[i].cost))
}
}else{
var fromTime = $("#fromTime").val();
var toTime = $("#toTime").val();
var accountings = accountingCollection.find(
{
date: {
$gte: fromTime,
$lte: toTime
}
}
);
for (var i = 0; i < accountings.length; i++) {
$("#accountingTable").append(createAccountingHTMLString(accountings[i].date, accountings[i].category, accountings[i].item, accountings[i].cost))
}
}
});