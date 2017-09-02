var fdb = new ForerunnerDB();
var db = fdb.db("accounting")
var accountingCollection = db.Collection('accounting');
accountingCollection.load();

$("#submit").click(function(){
	var date = $("#date").val()
	var category = $("#category").val()
	var item = $("#item").val()
	var cost = $("#cost").val()
	
	var newAccounting = {
		date: date,
		category: category,
		item: item,
		cost: cost
	}
	accountingCollection.insert(newAccounting);
	accountingCollection.save()

	var date = $("#date").val("")
	var category = $("#category").val("")
	var item = $("#item").val("")
	var cost = $("#cost").val("")
	alert("儲存成功")
})
	
