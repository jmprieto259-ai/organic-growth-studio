import Navigation from "@/components/Navigation";
import SideBadge from "@/components/SideBadge";
import Hero from "@/components/Hero";
import StatementSection from "@/components/StatementSection";
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
    stickyBarLeft: "Caso Oviedo",
    stickyBarRight: "증명",
    bgWord: "VOTOS",
    placeholder: "[ Foto Jose con Oviedo ]",
    number: "01",
    code: "// 01",
    title: "Caso<br/>Oviedo",
    subtitle: "Campaña Presidencial",
    h4Text: "De 1% de intención de voto a 1.2 millones de votos y ser la sorpresa de la gran consulta por Colombia",
    paragraph:
      'Las redes no las gana quien tiene más plata — las gana quien tiene estrategia, creatividad y autenticidad. Asumí la dirección de redes de Juan Daniel Oviedo. Nos volvimos una máquina de contenido, publicando hasta 18 videos diarios, explicando la coyuntura del país de manera simple, con libertad absoluta para ser auténtico y mostrando su autenticidad. El resultado: 1.2 millones de votos.',
    skills: [
      "Instagram — 675,000 seguidores",
      "TikTok — 421,000 seguidores",
      "De 1% a 1.2 millones de votos en la gran consulta por Colombia",
    ],
  },
  {
    stickyBarLeft: "Caso Andrés Bilbao",
    stickyBarRight: "리그",
    bgWord: "RAPPI",
    placeholder: "[ Foto Jose con Andrés Bilbao ]",
    number: "02",
    code: "// 02",
    title: "Andrés<br/>Bilbao",
    subtitle: "Cofundador de Rappi",
    h4Text: "Asesor en redes sociales de Andrés Bilbao y 30X. Lo ayudo con storytelling, estrategia de redes sociales y crecimiento orgánico en TikTok, Instagram, Facebook, YouTube Shorts.",
    paragraph:
      'De cero a la fama con Andrés Bilbao.',
    skills: [
      "Instagram — 480,000 seguidores",
      "TikTok — 200,000 seguidores",
      "LinkedIn — 110,000 seguidores",
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
      <SectionBlurReveal>
        <StatementSection />
      </SectionBlurReveal>
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
