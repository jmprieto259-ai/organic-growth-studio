import Navigation from "@/components/Navigation";
import SideBadge from "@/components/SideBadge";
import Hero from "@/components/Hero";

import ExpertiseBlock from "@/components/ExpertiseBlock";
import vaqueroImg from "@/assets/vaquero.jpg";
import Manifesto from "@/components/Manifesto";
import ClientsSection from "@/components/ClientsSection";
import StatsSection from "@/components/StatsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import SectionBlurReveal from "@/components/SectionBlurReveal";

const expertiseBlocks = [
  {
    stickyBarLeft: "El Caso Oviedo",
    stickyBarRight: "증명",
    bgWord: "VOTOS",
    placeholder: "[ Foto Jose con Oviedo ]",
    number: "01",
    code: "// 01",
    title: "La Prueba<br/>de Fuego",
    subtitle: "Caso Oviedo",
    h4Text: "De 1% de intención de voto a 1.2 millones de votos reales",
    paragraph:
      'El juego de las redes no lo gana quien tiene más plata para publicidad — lo gana quien tiene creatividad, estrategia y autenticidad. Asumí la dirección de redes de Juan Daniel Oviedo. Nos volvimos una máquina de contenido: <strong style="color:white">12 videos diarios</strong> explicando la coyuntura del país de manera simple, con libertad absoluta para ser auténtico. El resultado: 1.2 millones de votos. 100% orgánico.',
    skills: [
      "Dirección estratégica de contenido político",
      "12 videos diarios — 0 pesos en publicidad",
      "Autenticidad como arma diferenciadora",
      "De 1% a 1.2M votos sin pauta paga",
      "Narrativa simple para temas complejos",
    ],
  },
  {
    stickyBarLeft: "Grandes Ligas",
    stickyBarRight: "리그",
    bgWord: "RAPPI",
    placeholder: "[ Foto Jose con Andrés Bilbao ]",
    number: "02",
    code: "// 02",
    title: "Andrés<br/>Bilbao",
    subtitle: "Cofundador de Rappi",
    h4Text: "El asesor detrás de los founders más grandes del ecosistema tech de Latam",
    paragraph:
      'Soy el asesor de marca personal de los founders más influyentes de la región. Con <strong style="color:white">Andrés Bilbao</strong> (Rappi), <strong style="color:white">Santiago Pineda</strong> (Mensajeros Urbanos), <strong style="color:white">Nicolás Quijano</strong>, <strong style="color:white">Giovanni Stella</strong> (Ex Country Manager Google) y <strong style="color:white">Hugo Surek</strong>, construyo sistemas de contenido que posicionan a líderes de clase mundial.',
    skills: [
      "Andrés Bilbao — Cofundador de Rappi",
      "Santiago Pineda — CEO Mensajeros Urbanos",
      "Nicolás Quijano",
      "Giovanni Stella — Ex Country Manager Google",
      "Hugo Surek",
    ],
  },
  {
    stickyBarLeft: "Mi Historia",
    stickyBarRight: "역사",
    bgWord: "VAQUERO",
    placeholder: "[ Tu foto en el llano ]",
    image: vaqueroImg,
    imageOverlayText: "POR AHORA\nVAQUERO",
    number: "03",
    code: "// 03",
    title: "La<br/>Revelación",
    subtitle: "Mi Historia",
    h4Text: "Todo empezó mandando al carajo el \"deber ser\"",
    paragraph:
      'Pasé de ser líder de tecnología de una startup a perseguir mi sueño de irme al llano a vivir descalzo como vaquero. Usé las redes para documentar mi pasión. Me volví influencer sin planearlo y construí una comunidad de <strong style="color:white">1.7 millones de seguidores</strong> en TikTok, Instagram, YouTube y Facebook. Ahí descubrí que el crecimiento orgánico no necesita perfección, sino historias reales, constancia y entender cómo hackear el algoritmo.',
    skills: [
      "Crecimiento orgánico sin inversión publicitaria",
      "Comunidad de 1.7M en 4 plataformas simultáneas",
      "Historias reales como motor de viralidad",
      "Algoritmo hackeado desde adentro",
      "Constancia sobre perfección — siempre",
    ],
  },
];

const Index = () => {
  return (
    <>
      <div className="grain-overlay" />
      <SideBadge />
      <Navigation />
      <Hero />
      {expertiseBlocks.map((block, i) => (
        <SectionBlurReveal key={i}>
          <ExpertiseBlock {...block} />
        </SectionBlurReveal>
      ))}
      
      <SectionBlurReveal>
        <Manifesto />
      </SectionBlurReveal>
      <SectionBlurReveal>
        <ClientsSection />
      </SectionBlurReveal>
      <SectionBlurReveal>
        <StatsSection />
      </SectionBlurReveal>
      <SectionBlurReveal>
        <ExperienceSection />
      </SectionBlurReveal>
      <SectionBlurReveal>
        <AboutSection />
      </SectionBlurReveal>
      <SectionBlurReveal>
        <Footer />
      </SectionBlurReveal>
    </>
  );
};

export default Index;
