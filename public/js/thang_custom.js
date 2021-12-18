document.addEventListener('DOMContentLoaded',()=>{
    const navEl=document.querySelectorAll('.nav-item')
    navEl.forEach(item=>{
        const arr=item.querySelector('a').href.split('/')
        const path='/'+arr[arr.length-1]
        if(path===window.location.pathname){
            item.classList.add('active')
        }
    })
    const userId=document.querySelector('input[name="userId"]').value ||false
    if(userId){
        if(JSON.parse(localStorage.getItem('cartLength'))){
            renderCartLength()
        }
        else{
            updateCart()
        }
    }
    else{
        updateCart()

    }
})
function updateCart(){
    const userId=document.querySelector('input[name="userId"]').value 
    if(userId){
        fetch(`${window.location.origin}/cart/get/${userId}`)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            localStorage.setItem('cartLength',JSON.stringify({quantity:res.quantity}))
            renderCartLength()
        })
    }
    else{
        let cart=JSON.parse(localStorage.getItem('cart'))
        const quantityCount=document.querySelector('.cart-count') || false
        quantityCount.innerText=cart.length
    }
}

function renderCartLength(){
    let cartLength=JSON.parse(localStorage.getItem('cartLength'))
    const quantityCount=document.querySelector('.cart-count') || false
    quantityCount.innerText=cartLength.quantity
}
function formatMoney(n, currency) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    })+ currency;
}

function showToast(image,text,check){
    let bg=''
    if(!check){
        bg='linear-gradient(180deg, #ffffff 0%, #ff8262 50%, #FF0000 100%);'
    }
    else{
        bg="linear-gradient(0deg, rgb(217, 175, 217) 0%, rgb(151, 217, 225) 100%);"
    }
    Toastify({
        text: text,
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        y:'50px',
        avatar:image,
        style: {
            background: bg,
        }
    }).showToast();

}


function addCart(e){
    const userId=document.querySelector('input[name="userId"]').value
    if(userId){
        fetch(`${window.location.origin}/cart/add`,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({studentId:userId,courseId:e.target.dataset.id})
        })
        .then(res=>res.json())
        .then(res=>{
            if (res.success){
                let currentCart=JSON.parse(localStorage.getItem('cartLength'))
                currentCart.quantity+=1
                localStorage.setItem('cartLength',JSON.stringify(currentCart))
                renderCartLength()
                showToast(e.target.dataset.image,'Thêm vào giỏ hàng thành công')
            }
            else{
                showToast(e.target.dataset.image,'Khóa học đã tồn tại trong giỏ hàng',false)
            }
        })
    }
    else{
        let currentCart=localStorage.getItem('cart')
        if(!currentCart){
            let newCart=[e.target.dataset.id]
            localStorage.setItem('cart',JSON.stringify(newCart))
            showToast(e.target.dataset.image,'Thêm vào giỏ hàng thành công')
        }
        else{
            currentCart=JSON.parse(currentCart)
            console.log(currentCart)
            if(currentCart.indexOf(e.target.dataset.id)<0){
                console.log('vo day')
                currentCart.push(e.target.dataset.id)
                localStorage.setItem('cart',JSON.stringify(currentCart))  
                showToast(e.target.dataset.image,'Thêm vào giỏ hàng thành công')
                const quantityCount=document.querySelector('.cart-count') || false
                quantityCount.innerText=currentCart.length
            }
            else{
                showToast(e.target.dataset.image,'Khóa học đã tồn tại trong giỏ hàng',false)
            }
            
        }
    }
    


    

}