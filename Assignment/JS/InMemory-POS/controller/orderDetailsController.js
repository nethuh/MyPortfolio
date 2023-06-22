//add to cart event
$('#btnAddToCart').click(function(){
    $('#tblCart').empty();
    saveCart();
    loadAllCartItems();
    calculateSubTotal();
    removeFromCart();
    clearItemDetails()
})

//clear item details after add to cart event
function clearItemDetails(){
    $('#itemCodeCMB').val("");
    $('#itName').val("");
    $('#itPrice').val("");
    $('#itQty').val("");
    $('#itBuyQty').val("");
}

// save details cart
function saveCart(){
    let orderId= $('#orderId').val();
    let itemCode= $('#itemCodeCMB').val();
    let itemName= $('#itName').val();
    let itemPrice=$('#itPrice').val();
    let itemsBuyQty=$('#itBuyQty').val();
    let itemTotal=itemPrice*itemsBuyQty;

    var cartobj={

        orderId,
        itemCode,
        itemName,
        itemPrice,
        itemsBuyQty,
        itemTotal
    }
    cart.push(cartobj);
    console.log(cartobj);

    let currentQTY = $('#itQty').val();
    let min = currentQTY - itemsBuyQty;
    updateItemQty(itemCode,min);

}
//loas data to table
function loadAllCartItems(){
    $('#tblCart').empty();
    for (var i of cart){
        var TbaleRow=`<tr><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.itemPrice}</td><td>${i.itemsBuyQty}</td><td>${i.itemTotal}</td></tr>`
        $('#tblCart').append(TbaleRow)
    }
}

//reduce item qty after adding to cart
function updateItemQty(code,Qty){
    let itm = searchItem(code);
    if(itm !=null){
        itm.QTY = Qty;
    }
    loadAllItem();
    bindRowClickEventsItem();
}

//calculate subtotal
function calculateSubTotal(){
    let subTotal =0;
    for (let i of cart){
        subTotal += (parseInt(i.itemTotal))
    }
    console.log(subTotal);
    $('#subtotal').val(subTotal);
}
function removeFromCart(){
    alert('remove')
}
