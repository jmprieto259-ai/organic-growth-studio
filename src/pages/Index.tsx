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
    stickyBarRight: "",
    bgWord: "VOTOS",
    placeholder: "[ Foto Jose con Oviedo ]",
    number: "",
    code: "",
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
    stickyBarRight: "",
    bgWord: "RAPPI",
    placeholder: "[ Foto Jose con Andrés Bilbao ]",
    number: "",
    code: "",
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
    stickyBarLeft: "@sabana_adentro",
    stickyBarRight: "",
    bgWord: "VAQUERO",
    placeholder: "[ Tu foto en el llano ]",
    image: vaqueroImg,
    imageOverlayText: "MI HISTORIA",
    number: "",
    code: "",
    title: "Mi<br/>Historia",
    subtitle: "@sabana_adentro",
    h4Text: "Mandé a la mierda el deber ser y me fui a vivir como vaquero",
    paragraph:
      'Pasé de ser CEO de tecnología en una startup a perseguir mi sueño de irme al llano descalzo como vaquero. Usé las redes para contar mi historia y en año y medio pasé de cero a 1.7 millones de seguidores.',
    skills: [],
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
