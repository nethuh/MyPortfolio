//customer save button event
$("#customerSave-btn").click(function (){
    saveCustomer();

    loadAllCustomer();

    bindRowClickEventsCustomer();

    clearCustomer();

    alert("Customer Successfully Saved!")

});

//customer save function
function saveCustomer(){
    let customerID = $("#txtCustID").val();
    let customerName = $("#txtCustName").val();
    let customerAddress = $("#txtCustAddress").val();
    let customerSalary = $("#txtCustSalary").val();

    var customerObj = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        salary: customerSalary
    }

    customerArray.push(customerObj);
    /*bindRowClickEvents();
    loadAllCustomer();*/
    console.log(customerObj);
}

//customer clear function
function clearCustomer(){
    $('#txtCustID').val('');
    $('#txtCustName').val('');
    $('#txtCustAddress').val('');
    $('#txtCustSalary').val('');
    console.log("clean");

}

$("#customerClear-btn").click(function (){
    clearCustomer();
});

//customer get all button event
$("#customerGetAll-btn").click(function (){
    loadAllCustomer();
    clearCustomer();
});

//customer load all button event
function loadAllCustomer(){

    //remove all the table body content before adding data
    $("#tblCustomer").empty();

    for (var customer of customerArray){

        // Using String Literals to do the same thing as above
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;

        //then add it to the table body of customer table
        $("#tblCustomer").append(row);
        console.log("printed");
    }
}

//customer table row click event and load to text field
function bindRowClickEventsCustomer() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let salary = $(this).children(":eq(3)").text();
        console.log(id, name, address, salary);

        //setting table details values to text fields
        $('#txtCustID').val(id);
        $('#txtCustName').val(name);
        $('#txtCustAddress').val(address);
        $('#txtCustSalary').val(salary);
    });
}


//customer search button event

//customer delete button event
$('#customerDelete-btn').click(function (){
    let cusId=$("#txtCustID").val();
    console.log(cusId);
    let option=confirm('Do you want to delete this customer'+cusId)
    if(option){
        if(deleteCustomer(cusId)){
            Swal.fire({
                icon: 'delete',
                title: 'Deleted...',
                text: 'Customer Successfully Deleted!',
            })
            $('#txtCustId').val('')
            $('#txtcustName').val('')
            $('#txtcustAddress').val('')
            $('#txtcustSalary').val('')
        }
        else{
            Swal.fire("No such customer to delete. please check the id" )
        }
    }
})

//customer delete function
function deleteCustomer(customerID){
    let customer= searchCustomer(customerID)
    if(customer!=null){
        let indexNo= customerArray.indexOf(customer);
        customerArray.splice(indexNo,1);
        loadAllCustomer();
        return true;
    }else{
        return false;
    }
}

//customer update button event
$('#customerUpdated-btn').click(function(){
    let customerId=$('#txtCustID').val()
    let response=updateCustomer(customerId)
    if(response){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Customer Updated Successfully',
            showConfirmButton: false,
            timer: 1500
        });
        /*$('#txtCustId').val('')
        $('#txtCustName').val('')
        $('#txtCustAddress').val('')
        $('#txtCustSalary').val('')*/

        clear();
    }
    else{
        Swal.fire("Update Failed..!" );
    }
})

//customer update function
function updateCustomer(customerID){
    let customer= searchCustomer(customerID)
    if(customer !=null){
        customer.id=$('#txtCustID').val()
        customer.name= $('#txtCustName').val()
        customer.address= $('#txtCustAddress').val()
        customer.salary= $('#txtCustSalary').val()
        loadAllCustomer();
        return true
    }
    else{
        return false
    }
}
