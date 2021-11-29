document.addEventListener('DOMContentLoaded',()=>{
    const navEl=document.querySelectorAll('.nav-item')
    console.log(navEl)
    navEl.forEach(item=>{
        const arr=item.querySelector('a').href.split('/')
        const path='/'+arr[arr.length-1]
        console.log(path)
        if(path===window.location.pathname){
            item.classList.add('active')
        }
    })
})