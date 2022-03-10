
window.onload = () => {

    let brands = [];
	let types = [];
    pullData("types", showTypes);
    
function pullData(file, callback){
    return new Promise((resolve, reject)=>{
    $.ajax({
    url: `assets/data/${file}.json`,
    method: "get",
    dataType: "json",
    success: function(data){
    resolve(callback(data));
    },
    error:function(jqXHR, exception){
        reject(jqXHR.status);

        var msg = '';
        if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
        msg = 'Time out error.';
        } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
        } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        alert(msg);
        }
    });
    });
   }


   function showTypes(data){
    let counter = 0;
    let html = "";
    data.forEach(type => {
        counter++;
        html += `<a
        href="#"
        class="list-group-item list-group-item-action types active"
        data-custom-value="${types.id}"
        >${types.name} <small class="text-muted">(${counter})</small></a
      >`;
    });
    document.getElementById('types').innerHTML = html;
    types = data;
    $('.types').change(filterChange);
    
    fetchData("brands", showBrands);
}



















}



