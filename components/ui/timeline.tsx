"use client";

// Compact adaptation of the horizontal timeline reference supplied by the user.
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const journey = [
  {
    number: "01",
    title: "Diagnóstico",
    text: "Entendemos o negócio, a oferta, o público e os objetivos que devem orientar a operação.",
  },
  {
    number: "02",
    title: "Estrutura",
    text: "Organizamos mensagens, públicos, campanhas e medição para aprender com clareza.",
  },
  {
    number: "03",
    title: "Ativação",
    text: "Colocamos a estratégia no ar com acompanhamento próximo e comunicação constante.",
  },
  {
    number: "04",
    title: "Evolução",
    text: "Testamos hipóteses, realocamos investimento e transformamos aprendizados em crescimento.",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-method-card]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-method-dot]");
      const connectors = gsap.utils.toArray<HTMLElement>("[data-method-connector]");

      gsap.fromTo(
        cards,
        { autoAlpha: 0.28, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.11,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        dots,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.45,
          stagger: 0.12,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        connectors,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.58,
          stagger: 0.12,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
            once: true,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="method-timeline" id="metodo" aria-label="Método de trabalho da Pravo">
      <div className="method-intro">
        <p className="section-label light-label">Nosso método</p>
        <h3>Clareza em cada decisão.</h3>
        <p>Quatro movimentos conectados em um ciclo contínuo de aprendizado e performance.</p>
      </div>

      <div className="method-timeline-viewport">
        <div className="method-timeline-track">
          {journey.map((item, index) => (
            <article data-method-card key={item.number}>
              <div className="method-timeline-node" aria-hidden="true">
                <i data-method-dot />
                {index < journey.length - 1 && <b data-method-connector />}
              </div>
              <span>{item.number}</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <p className="method-mobile-hint" aria-hidden="true">Deslize para explorar <span>→</span></p>
    </section>
  );
}
