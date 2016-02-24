var rowCount = 0;
var table = document.getElementById('pizza-table');
var currentRow = table.rows[rowCount];

var database = [
  { type:"Cheese", price: 9.75 },
  { type:"Pepperoni", price: 10.75 },
  { type:"Deluxe", price: 15.99 },
  { type:"Hawaiian", price: 12.75 },
  { type:"Barbecue Chicken", price: 14.50 },
  { type:"Taco Supreme", price: 12.50 }
];


function addField() {
  rowCount++;
  currentRow = table.insertRow(rowCount);
  currentRow.insertCell(0);
  currentRow.insertCell(1);
  currentRow.insertCell(2);
  currentRow.cells[0].innerHTML
      = "<input id=\"item\" type=\'number\' min=\"1\" max=\"6\" />";
  currentRow.cells[1].innerHTML
      = "<input id=\"qty\" type=\'number\' min=\"0\"/>";
  currentRow.cells[2].innerHTML
      = "<input type=\"button\" value=\"Submit\" onClick=\"onSubmit()\">";

}

function insertValues() {
  var currItem = document.getElementById("item").value;
  var price = database[currItem-1].price;
  var quantity = document.getElementById("qty").value;
  var currTotal = price * quantity;
  currentRow.cells[0].innerHTML = currItem;
  currentRow.cells[1].innerHTML = quantity == '' ? 0 : quantity; // <3 ternary operators
  currentRow.cells[2].innerHTML = "$ " + currTotal.toFixed(2);
}

function onSubmit() {
  insertValues();
  addField();
}

function menuInit() {
  document.write("<table id=\"pizza-menu\"><tbody>")
  document.write("<tr><th>Item No.</th><th>Kind</th><th>Price</th></tr>")
  var size = database.length;
  for (var i = 0; i < size; i++) {
    document.write("<tr><td>" + (i + 1)
                + "</td><td>" + database[i].type
                + "</td><td>$"+ database[i].price.toFixed(2) + "</td></tr>")
  }
  document.write("</tbody></table>");
  addField();
}


document.onkeydown = function listen(e) {
  e = e || event;
  if (e.keyCode == '13') {
    onSubmit();
  }
}
