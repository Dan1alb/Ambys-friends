// mete el plugin ScrollTrigger para la animacion tipo apple
gsap.registerPlugin(ScrollTrigger);

// --- ANIMACIÓN DE INTRODUCCIÓN ---
gsap.to("#intro", {
    opacity: 0,
    duration: 0.4, // Cuánto tarda en desvanecerse (1 segundo)
    delay: 5,    // Cuánto tiempo se muestra antes de desvanecerse (Ej: 3 segundos. ¡Ajustalo a lo que dure tu GIF!)
    onComplete: () => {
        // Cuando termina la animación, ocultamos el div por completo
        document.getElementById("intro").style.display = "none";

        // Le regresamos el scroll a la página
        document.body.classList.remove("no-scroll");

        // Refrescamos ScrollTrigger por si las dimensiones cambiaron
        ScrollTrigger.refresh();
    }
});

// timeline del scroll 
let tl = gsap.timeline({
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
tl.to("#ambys", {
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
