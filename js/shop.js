window.onload = () => {
  var brands = [];
  var types = [];

  pullData("types", showTypes);
  pullData("brands", showBrands);
  pullData("products", showProducts);

  console.log(brands);
  console.log(types);

  function pullData(file, callback) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `data/${file}.json`,
        method: "get",
        dataType: "json",
        success: function (data) {
          resolve(callback(data));
        },
        error: function (jqXHR, exception) {
          reject(jqXHR.status);

          var msg = "";
          if (jqXHR.status === 0) {
            msg = "Not connect.\n Verify Network.";
          } else if (jqXHR.status == 404) {
            msg = "Requested page not found. [404]";
          } else if (jqXHR.status == 500) {
            msg = "Internal Server Error [500].";
          } else if (exception === "parsererror") {
            msg = "Requested JSON parse failed.";
          } else if (exception === "timeout") {
            msg = "Time out error.";
          } else if (exception === "abort") {
            msg = "Ajax request aborted.";
          } else {
            msg = "Uncaught Error.\n" + jqXHR.responseText;
          }
          alert(msg);
        },
      });
    });
  }

  function showTypes(data) {
    let html = "";
    data.forEach((type) => {
      html += `<a
        href="#"
        class="list-group-item list-group-item-action types"
        data-custom-value="${type.id}"
        >${type.name} <small class="text-muted">()</small></a
      >`;
    });
    $(".types:first").addClass("active"); // kako dodati prvom elementu klasu active ?
    document.getElementById("types").innerHTML = html;
    types = data;
    // $('.types').change(filterChange);
  }

  function showBrands(data) {
    console.log("showBrands funkcija");
    let html = "";
    data.forEach((brand) => {
      html += `<a
        href="#"
        class="list-group-item list-group-item-action brands"
        data-custom-value="${brand.id}"
        >${brand.name} <small class="text-muted">()</small></a
      >`;
    });
    $(".brands:first").addClass("active"); // kako dodati prvom elementu klasu active ?
    document.getElementById("brands").innerHTML = html;
    brands = data;
    // $('.brands').change(filterChange);
  }

  function showProducts(data) {
    // data = brandFilter(data);
    // data = categoryFilter(data);
    // data = sort(data);

    let html = "";
    data.forEach((product) => {
      html += `<div class="col-sm-6 col-md-6 col-lg-4 col-xl-4">
        <div class="products-single fix">
          <div class="box-img-hover">
            <div class="type-lb">
              <p class="sale">Sale</p>
            </div>
            <img
              src="${product.image.src}"
              class="img-fluid"
              alt="${product.image.src}"
            />
            <div class="mask-icon">
              <a class="cart" href="#">Add to Cart</a>
            </div>
          </div>
          <div class="why-text">
            <h4>${product.name}</h4>
            <h4>${getBrandOfProduct(product.brand)} - ${getTypeOfProduct(
        product.brand
      )}</h4>
            <h5>${product.price.newPrice}</h5>
          </div>
        </div>
      </div>`;
    });
    document.getElementById("product").innerHTML = html;
  }

  function getBrandOfProduct(id) {
    return brands.filter((b) => b.id == id)[0].name;
  }

  function getTypeOfProduct(id) {
    return types.filter((b) => b.id == id)[0].name;
  }

  function countType(data, typeId) {
    let counter = 0;
    data.forEach((product) => {
      if (product.type === typeId) {
        counter++;
      }
    });
    return counter;
  }

  function countBrand(data, brandId) {
    let counter = 0;
    data.forEach((product) => {
      if (product.brand === brandId) {
        counter++;
      }
    });
    return counter;
  }
};
