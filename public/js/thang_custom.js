document.addEventListener('DOMContentLoaded',()=>{
    const navEl=document.querySelectorAll('.nav-item')
    navEl.forEach(item=>{
        const arr=item.querySelector('a').href.split('/')
        const path='/'+arr[arr.length-1]
        if(path===window.location.pathname){
            item.classList.add('active')
        }
    })
})
function formatMoney(n, currency) {
    return n.toFixed(0).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        })+ currency;
    }