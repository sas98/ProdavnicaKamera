
window.onload = () => {

    let brands = [];
	let types = [];
    pullData("types", showTypes);
    
function pullData(file, callback){
    return new Promise((resolve, reject)=>{
    $.ajax({
    url: `/data/${file}.json`,
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
    
    let html = "";
    data.forEach(type => {
        html += `<a
        href="#"
        class="list-group-item list-group-item-action types"
        data-custom-value="${type.id}"
        >${type.name} <small class="text-muted">()</small></a
      >`;

      
    });
    $('.types:first').addClass('active');// kako dodati prvom elementu klasu active ?
    document.getElementById('types').innerHTML = html;
    types = data;
    $('.types').change(filterChange);
    
    pullData("brands", showBrands);
}


function showBrands(data){
   
    let html = "";
    data.forEach(brand => {
        html += `<a
        href="#"
        class="list-group-item list-group-item-action brands"
        data-custom-value="${brand.id}"
        >${brand.name} <small class="text-muted">()</small></a
      >`;

      
    });
    $('.brands:first').addClass('active');// kako dodati prvom elementu klasu active ?
    document.getElementById('types').innerHTML = html;
    brands = data;
    $('.brands').change(filterChange);
    
    pullData("products", showProducts);
}



function showProducts(data){
    data = brandFilter(data);
    data = categoryFilter(data);
    data = sort(data);
    let html = "";
    data.forEach(product => {
        html+= `<div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100">
          <a href="#"><img class="card-img-top" src="assets/img/${product.image.src}" alt="${product.image.alt}"></a>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">${product.name}</a>
            </h4>
            <h6>${getProductBrand(product.brand)}</h6>
            <h5>$${product.price.currentPrice}</h5>
            ${product.price.priceBeforeDiscount ? "<s>$" + product.price.priceBeforeDiscount + "</s>" : ""}
            <p style="color: blue;">${product.freeShipping ? "Free shipping" : ""}</p>
            <p class="card-text">
              ${getProductCategories(product.categories)}
            </p>
            <p class="card-text">${product.description}</p>
          </div>
        </div>
      </div>`;
    });
    document.getElementById('products').innerHTML = html;
}



















}



