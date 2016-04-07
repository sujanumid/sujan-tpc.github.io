$('.owl-carousel').owlCarousel({
    loop:true,
    margin:0,
    nav:true,
    navText:['<i class="glyphicon glyphicon-chevron-left"></i>','<i class="glyphicon glyphicon-chevron-right"></i>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
})

var elem ='<h1 class="pop-balance">1.99</h1>'+
    '<button id="close-popover" data-toggle="clickover" class="btn btn-small btn-danger" onclick="buy(this)" price="1.99">Buy!</button>';



$('.can a').popover({
    animation:true,
    content:elem,
    placement:'top',
    html:true,
    container:'body',
    trigger: 'focus'
});

$('#add-value').on('click',function(e){
    patt = /^\d*(\.\d+)?$/;
    input = $(this).parents('.val-enter').find(":input")
    balance = input.val();
    old_balance = parseFloat($('.balance').text());
    if(balance.match(patt)){
        new_balance = old_balance + parseFloat(balance);
        $('.balance').text(parseFloat(new_balance).toFixed(2))
        input.val("");
    }else{
        alert("Please enter a valid amount!")
    }
})

function buy(e){
    elem = e;
    price = parseFloat($(elem).attr('price'));
    getBalance = parseFloat($('.balance').text());
    console.log(getBalance);
    if(getBalance >= price){
        new_balance = getBalance - price;
        $('.balance').text(parseFloat(new_balance).toFixed(2));
        alert("Please pick up your soda! Enjoy your day!")
    }else{
        alert("Please add balance!")
    }
}

