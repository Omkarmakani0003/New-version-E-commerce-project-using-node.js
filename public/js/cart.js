
    function addtocart() {
        
    const qty = document.getElementById('qty').value;
    const productId = document.getElementById('productId').value;
    
    const price = document.getElementById('price').value
    
    const selectedVariations = {};
    const radios = document.querySelectorAll('input[type="radio"]');
    const variationTypes = [...new Set(Array.from(radios).map(r => r.name))];
 
    variationTypes.forEach(type => {
        const checked = document.querySelector(`input[name="${type}"]:checked`);
        if (checked) {
            const label = document.querySelector(`label[for="${checked.id}"]`);
            if (type === 'Color') {
                selectedVariations[type] = label.style.backgroundColor;
            } else {
                selectedVariations[type] = label.textContent;
            }
        }
    });

    const cartData = {
        productId: productId,
        quantity: qty,
        price: price,
        variations: selectedVariations
    };

    fetch('/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData)
    }).then(res => res.json())
      .then(data => {
        if(data.success){
            // document.getElementById('mobile-cartCount').innerText = data.cartCount 
            document.getElementById('cartCount').innerText = data.cartCount
            document.getElementById('toastContainer').innerHTML  = `
             <div class="toast align-items-center text-bg-success border-0 show">
              <div class="d-flex align-items-center">
               <div class="toast-body">
                Cart added successfully
               </div>
              <button type="button" class="btn-close btn-close-white ms-auto me-2" data-bs-dismiss="toast" aria-label="Close"></button>
             </div>
            </div>
            `
            setTimeout(()=>{
                document.getElementById('toastContainer').innerHTML  = ``
            },2000)
          }else{
             window.location = '/login'
          }
        } 
      );
    
}


    function buynow() {
    const qty = document.getElementById('qty').value;
    const productId = document.getElementById('productId').value;
    const price = document.getElementById('price').value
    
    const selectedVariations = {};
    const radios = document.querySelectorAll('input[type="radio"]');
    const variationTypes = [...new Set(Array.from(radios).map(r => r.name))];
 
    variationTypes.forEach(type => {
        const checked = document.querySelector(`input[name="${type}"]:checked`);
        if (checked) {
            const label = document.querySelector(`label[for="${checked.id}"]`);
            if (type === 'Color') {
                selectedVariations[type] = label.style.backgroundColor;
            } else {
                selectedVariations[type] = label.textContent;
            }
        }
    });

    const buyNowData = {
        productId: productId,
        quantity: qty,
        price: price,
        variations: selectedVariations
    };
   
     fetch('/buynow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buyNowData)
    }).then(res => res.json())
      .then(data => {
        if(data.success){
           window.location = '/checkout'
        }else{
            window.location = '/login'
        }
      })

}

