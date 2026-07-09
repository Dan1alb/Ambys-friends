// mete el plugin ScrollTrigger para la animacion tipo apple
gsap.registerPlugin(ScrollTrigger);

    if (sessionStorage.getItem("introVista") === "true") {
    
//skipea la animacion si ya se vió
    document.getElementById("intro").style.display = "none";
    document.body.classList.remove("no-scroll");
    ScrollTrigger.refresh();

} else {
    // Linea de tiempo de la animacion
    const tlIntro = gsap.timeline({
        onComplete: () => {
            document.getElementById("intro").style.display = "none";
            document.body.classList.remove("no-scroll");
            ScrollTrigger.refresh();
            
            //lo que nos dice que ya se reprodujo la animacion
            sessionStorage.setItem("introVista", "true");
        }
    });

    tlIntro.to({}, { duration: 4 }) //duracion video

    .to("#intro-media", { 
        opacity: 0, 
        duration: 0.4,
        onComplete: () => {
            //Cambio al logo
            document.getElementById("intro-media").style.display = "none";
            document.getElementById("intro-logo").style.display = "block";
        }
    })

    .to("#intro-logo", { 
        opacity: 1, 
        duration: 0.5 
    })

    .to({}, { duration: 1 })//duracion logo

    .to("#intro", { 
        opacity: 0, 
        duration: 0.6 
    });
}

// timeline del scroll 
let tlScroll = gsap.timeline({
    scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "+=2500",
        scrub: 1,
        pin: true,
        anticipatePin: 1
    }
});

// El movimiento de la aniumacion apple !!SE HACE UN CAGADERO ASI Q AGUAS!!
tlScroll.to("#ambys", {
    scale: 1,
    opacity: 1,
    x: -300,
    duration: 1
})
    .to("#sal", {
        scale: 1,
        opacity: 1,
        x: 0,
        duration: 1
    }, "-=0.4")
    .to("#amandra", {
        scale: 1,
        opacity: 1,
        x: 300,
        duration: 1
    }, "-=0.4")
    .to(".contenedor-monos", {
        scale: 2.5,
        opacity: 0,
        duration: 1,
        delay: 0.5
    });

    