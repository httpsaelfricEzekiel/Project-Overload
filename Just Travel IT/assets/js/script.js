window.addEventListener("scroll", () => {
    let lastScrollTop = 0;
    const navbar = document.getElementById("home");

    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop ||         scrollTop < lastScrollTop){
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-0.10rem";
    }
    lastScrollTop = scrollTop;
    console.log(lastScrollTop);
})