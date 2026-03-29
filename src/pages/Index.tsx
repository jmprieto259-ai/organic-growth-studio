import Navigation from "@/components/Navigation";
import SideBadge from "@/components/SideBadge";
import Hero from "@/components/Hero";
import StatementSection from "@/components/StatementSection";
import ExpertiseBlock from "@/components/ExpertiseBlock";
import vaqueroImg from "@/assets/vaquero.jpg";
import Manifesto from "@/components/Manifesto";
import ClientsSection from "@/components/ClientsSection";
import StatsSection from "@/components/StatsSection";
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
    title: "CASO<br/>OVIEDO",
    subtitle: "Campaña Presidencial",
    h4Text: "De 1% de intención de voto a 1.2 millones de votos y ser la sorpresa de la gran consulta por Colombia.",
    paragraph:
      'Con estrategia 100% basada en redes sociales, transformamos una campaña presidencial. Aprendimos a hacer contenido orgánico, nos volvimos una máquina de producción y creamos un sistema de 18 videos diarios — y le dimos visibilidad a un candidato sin maquinaria, sin millones, sin partido. Solo contenido. El resultado: 1.2 millones de votos y quedar por encima de fuerzas políticas que llevan décadas en el poder.',
    skills: [],
  },
  {
    stickyBarLeft: "Caso Andrés Bilbao",
    stickyBarRight: "",
    bgWord: "RAPPI",
    placeholder: "[ Foto Jose con Andrés Bilbao ]",
    number: "",
    code: "",
    title: "ANDRÉS<br/>BILBAO",
    subtitle: "Cofundador de Rappi",
    h4Text: "De cero a la fama. En unos meses, Andrés Bilbao paso de ser un desoconcido a estar en todos lados",
    paragraph:
      'Hoy es una de las voces más reconocidas del mundo de negocios en redes sociales. Presente en TikTok, Instagram, YouTube Shorts, Facebook y Twitter — todo orgánico. Su meta: 1 millón en Instagram para final de año.',
    skills: [],
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
    title: "SABANA<br/>ADENTRO",
    subtitle: "Mi Historia",
    h4Text: "Pase de ser líder de tecnología en startups a vivir como vaquero y crear una comunidad de 1.7 millones de seguidores.",
    paragraph:
      'Mandé a la mierda el deber ser. Me fui a cumplir mi sueño de vivir como vaquero en el llano, documentando todo en @sabana_adentro, me volví influencer y creé una comunidad de 1.7 millones de seguidores.',
    skills: [],
    hideTopGradient: true,
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
        <StatsSection />
      </SectionBlurReveal>
      
      <SectionBlurReveal>
        <Manifesto />
      </SectionBlurReveal>
      <SectionBlurReveal>
        <ClientsSection />
      </SectionBlurReveal>
      <SectionBlurReveal>
        <Footer />
      </SectionBlurReveal>
    </>
  );
};

export default Index;
