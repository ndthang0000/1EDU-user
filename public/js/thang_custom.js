document.addEventListener('DOMContentLoaded',()=>{
    const navEl=document.querySelectorAll('.nav-item')
    navEl.forEach(item=>{
        const arr=item.querySelector('a').href.split('/')
        const path='/'+arr[arr.length-1]
        if(path===window.location.pathname){
            item.classList.add('active')
        }
    })
    updateCart()
})
function updateCart(){
    let currentCart=JSON.parse(localStorage.getItem('cart'))
    const quantityCount=document.querySelector('.cart-count')
    if(!currentCart){
        quantityCount.innerText='0'
        return
    }
    quantityCount.innerText=currentCart.length
}
function formatMoney(n, currency) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    })+ currency;
}
function showToast(image){
    Toastify({
        text: "Thêm vào giỏ hàng thành công",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        y:'50px',
        avatar:image,
        style: {
            background: "linear-gradient(0deg, rgb(217, 175, 217) 0%, rgb(151, 217, 225) 100%);",
        }
    }).showToast();

}
function addCart(e){
    let currentCart=localStorage.getItem('cart')
    console.log(e.target.dataset.id)
    if(!currentCart){
        let newCart=[{id:e.target.dataset.id,quantity:1}]
        localStorage.setItem('cart',JSON.stringify(newCart))
        updateCart()
        showToast(e.target.dataset.image)
    }
    else{
        currentCart=JSON.parse(currentCart)
        for (let i=0;i<currentCart.length;i++){
            if(currentCart[i].id===e.target.dataset.id){
                currentCart[i].quantity+=1
                localStorage.setItem('cart',JSON.stringify(currentCart)) 
                updateCart()
                showToast(e.target.dataset.image)
                return
            }
        }
        let newItem={
            id:e.target.dataset.id,
            quantity:1
        }
        console.log('vo day')
        currentCart.push(newItem)
        localStorage.setItem('cart',JSON.stringify(currentCart))  
        showToast(e.target.dataset.image)
        updateCart()   
    }

}