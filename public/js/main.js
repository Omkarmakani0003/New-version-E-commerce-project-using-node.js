(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: false,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();

        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
            
        } else {
            if (oldValue > 2) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        button.parent().parent().find('input').val(newVal);
        quantity(button.data('id'),newVal)
    });
    
})(jQuery);

function quantity(id,value){

    fetch('/cart-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id:id,quantity:value})
    }).then(res => res.json())
      .then(data => {
        if(data.success){
             document.getElementById(`total_${id}`).innerHTML = `<span class="cart-mobile" style="display: none;">Total : </span> Rs.${data.Quantity.quantity * data.Quantity.total}`
             const amount = document.querySelectorAll('.amount')
             let totalAmount = 0
             Array.from(amount).forEach((item)=>{
                 totalAmount += parseInt(item.innerText.split('.')[1])
             })
             document.getElementById('subTotal').innerText = `Rs. ${totalAmount}`
             const shippingCharge = parseInt(document.getElementById('shipping').innerText.split('.')[1])
             document.getElementById('Total').innerText = `Rs. ${totalAmount + shippingCharge}`
          }
        } 
      );
}

function cartRemove(id){
    fetch(`/cart-remove/${id}`, {
        method: 'DELETE',
    }).then(res => res.json())
      .then(data => {
        if(data.success){
             document.getElementById(`cart_${data.RemoveCart._id}`).remove()
             const amount = document.querySelectorAll('.amount')
             let totalAmount = 0
             Array.from(amount).forEach((item)=>{
                 totalAmount += parseInt(item.innerText.split('.')[1])
             })
             document.getElementById('subTotal').innerText = `Rs. ${totalAmount}`
             const shippingCharge = parseInt(document.getElementById('shipping').innerText.split('.')[1])
             const totalShipping = shippingCharge - data.Shipping
             document.getElementById('shipping').innerText = `Rs. ${totalShipping}`
             document.getElementById('Total').innerText = `Rs. ${totalAmount + totalShipping}`
             const rowCount = document.getElementById('rowCount')
             document.getElementById('cartCount').innerText = rowCount.rows.length
          }
        } 
      );
}

// Related products carousel
$(".related-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 30,
    dots: false,
    loop: true,
    nav : false,
    navText : [
        '<i class="fa fa-angle-left"></i>',
        '<i class="fa fa-angle-right"></i>'
    ],
    responsive: {
        0:{ items:2 },
        576:{ items:2 },
        768:{ items:3 },
        992:{ items:4 }
    }
});

// Featured products carousel
$(".featured-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1200,
    margin: 30,
    dots: false,
    loop: false,
    nav : false,
    navText : [
        '<i class="fa fa-angle-left"></i>',
        '<i class="fa fa-angle-right"></i>'
    ],
    responsive: {
        0:{ items:2 },
        576:{ items:2 },
        768:{ items:3 },
        992:{ items:4 }
    }
});

document.querySelectorAll('.toast').forEach(toastEl => {
    new bootstrap.Toast(toastEl, { delay: 2500 }).show();
});
