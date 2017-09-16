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
var eatCost = 0;
var playCost = 0;
var otherCost = 0;
for (var i = 0; i < accountings.length; i++) {
if(accountings[i].category == "吃的"){
eatCost += accountings[i].cost / 1;
} else if(accountings[i].category == "玩的"){
playCost += accountings[i].cost / 1;
} else if(accountings[i].category == "其他"){
otherCost += accountings[i].cost / 1;
}
}
var totalCost = eatCost + playCost + otherCost;
$("#eatCost").text(eatCost)
$("#eatProportion").text(Math.round((eatCost/totalCost)*100) + "%")
$("#playCost").text(playCost)
$("#playProportion").text(Math.round((playCost/totalCost)*100) + "%")
$("#otherCost").text(otherCost)
$("#otherProportion").text(Math.round((otherCost/totalCost)*100) + "%")
$("#totalCost").text(totalCost)
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
var eatCost = 0;
var playCost = 0;
var otherCost = 0;
for (var i = 0; i < accountings.length; i++) {
if(accountings[i].category == "吃的"){
eatCost += accountings[i].cost / 1;
} else if(accountings[i].category == "玩的"){
playCost += accountings[i].cost / 1;
} else if(accountings[i].category == "其他"){
otherCost += accountings[i].cost / 1;
}
}
var totalCost = eatCost + playCost + otherCost;
$("#eatCost").text(eatCost)
$("#eatProportion").text(Math.round((eatCost/totalCost)*100) + "%")
$("#playCost").text(playCost)
$("#playProportion").text(Math.round((playCost/totalCost)*100) + "%")
$("#otherCost").text(otherCost)
$("#otherProportion").text(Math.round((otherCost/totalCost)*100) + "%")
$("#totalCost").text(totalCost)
}
});
