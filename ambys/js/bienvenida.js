document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const intro = document.getElementById("intro");
    const video = document.getElementById("intro-media");
    const logo = document.getElementById("intro-logo");

    // Función unificada para levantar el telón de intro y reactivar el scroll
    const finalizarIntro = () => {
        if (!intro) return;
        intro.style.display = "none";
        document.body.classList.remove("no-scroll");
        
        // Recalcular posiciones del DOM una vez liberado el espacio
        ScrollTrigger.refresh();
    };

    // 1. Control de visualización inicial
    if (sessionStorage.getItem("introVista") === "true") {
        finalizarIntro();
    } else {
        const tlIntro = gsap.timeline({
            onComplete: () => {
                finalizarIntro();
                sessionStorage.setItem("introVista", "true");
            }
        });

        tlIntro
            .to({}, { duration: 3.8 }) // Reproducción del video
            .to(video, {
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    video.style.display = "none";
                    logo.classList.remove("intro-logo-oculto");
                }
            })
            .to(logo, {
                opacity: 1,
                duration: 0.5
            })
            .to({}, { duration: 1 }) // Tiempo en pantalla del logo
            .to(intro, {
                opacity: 0,
                duration: 0.6
            });
    }

    // 2. Timeline de personajes fijados con ScrollTrigger
    const contenedorCards = document.querySelector(".contenedor-personajes");
    const cards = [
        document.getElementById("card-ambys"),
        document.getElementById("card-sal"),
        document.getElementById("card-amandra")
    ];

    if (contenedorCards && cards.every(Boolean)) {
        const tlCards = gsap.timeline({
            scrollTrigger: {
                trigger: "#personajes",
                start: "top top",
                end: "+=1800",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        // Entrada coordinada: Sal al centro, luego Ambys y Amandra
        tlCards
            .fromTo("#card-sal", 
                { opacity: 0, scale: 0.75, y: 40 },
                { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }
            )
            .fromTo("#card-ambys", 
                { opacity: 0, scale: 0.75, y: 40 },
                { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" },
                "-=0.6"
            )
            .fromTo("#card-amandra", 
                { opacity: 0, scale: 0.75, y: 40 },
                { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" },
                "-=0.6"
            )
            .to({}, { duration: 0.4 }) // Pausa visible mientras el usuario lee
            .to(".contenedor-personajes", {
                scale: 1.6,
                opacity: 0,
                filter: "blur(6px)",
                duration: 1.2,
                ease: "power1.in"
            });
    }

    // Recalcular ScrollTrigger cuando carguen las imágenes externas
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });
});