import joseAndresBilbao from "@/assets/jose-andres-bilbao.jpg";
import joseOviedo from "@/assets/jose-oviedo.png";
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
import LinkedInClosing from "@/components/LinkedInClosing";
import PlotTwistSection from "@/components/PlotTwistSection";
import SectionBlurReveal from "@/components/SectionBlurReveal";
import BilbaoStatsSection from "@/components/BilbaoStatsSection";
import { useSiteContent } from "@/hooks/use-site-content";

const Index = () => {
  const { getContent, getImage } = useSiteContent();

  const expertiseBlocks = [
    {
      stickyBarLeft: "Caso Oviedo",
      stickyBarRight: "",
      bgWord: "VOTOS",
      placeholder: "[ Foto Jose con Oviedo ]",
      image: getImage('oviedo', 'image', joseOviedo),
      imageOverlayText: "",
      imagePosition: "center 25%",
      number: "",
      code: "",
      title: getContent('oviedo', 'title', "CASO<br/>OVIEDO"),
      subtitle: getContent('oviedo', 'subtitle', "Campaña Presidencial"),
      subtitleColor: "#E8000D",
      h4Text: getContent('oviedo', 'headline', "De 1% de intención de voto a 1.2 millones de votos y ser la sorpresa de la gran consulta por Colombia."),
      paragraph: getContent('oviedo', 'body', 'Con estrategia 100% basada en redes sociales, transformamos una campaña presidencial. Aprendimos a hacer contenido orgánico, nos volvimos una máquina de producción y creamos un sistema de 18 videos diarios — y le dimos visibilidad a un candidato sin maquinaria, sin millones, sin partido. Solo contenido. El resultado: 1.2 millones de votos y quedar por encima de fuerzas políticas que llevan décadas en el poder.'),
      skills: [],
      panelClassName: "relative bg-primary h-auto md:h-[90vh] min-h-0 md:min-h-[576px] overflow-hidden",
      mobileContain: true,
    },
    {
      stickyBarLeft: "Caso Andrés Bilbao",
      stickyBarRight: "",
      bgWord: "RAPPI",
      placeholder: "[ Foto Jose con Andrés Bilbao ]",
      image: getImage('bilbao', 'image', joseAndresBilbao),
      imageOverlayText: "",
      imagePosition: "center 25%",
      number: "",
      code: "",
      title: getContent('bilbao', 'title', "ANDRÉS<br/>BILBAO"),
      subtitle: getContent('bilbao', 'subtitle', "Cofundador de Rappi"),
      subtitleColor: "#E8000D",
      h4Text: getContent('bilbao', 'headline', "De cero a la fama. En unos meses, Andrés Bilbao paso de ser un desoconcido a estar en todos lados"),
      paragraph: getContent('bilbao', 'body', 'Ayudé a Andrés a ser una de las voces más reconocidas del mundo de negocios en redes sociales. Presente en TikTok, Instagram, YouTube Shorts, Facebook y Twitter — todo orgánico. Su meta: 1 millón en Instagram para final de año.'),
      skills: [],
    },
    {
      stickyBarLeft: "@sabana_adentro",
      stickyBarRight: "",
      bgWord: "VAQUERO",
      placeholder: "[ Tu foto en el llano ]",
      image: getImage('sabana', 'image', vaqueroImg),
      imageOverlayText: "MI HISTORIA",
      number: "",
      code: "",
      title: getContent('sabana', 'title', "SABANA<br/>ADENTRO"),
      subtitle: getContent('sabana', 'subtitle', "Mi Historia"),
      subtitleColor: "#E8000D",
      h4Text: getContent('sabana', 'headline', "Pase de ser líder de tecnología en startups a vivir como vaquero y crear una comunidad de 1.7 millones de seguidores."),
      paragraph: getContent('sabana', 'body', 'Mandé a la mierda el deber ser. Me fui a cumplir mi sueño de vivir como vaquero en el llano, documentando todo en @sabana_adentro, me volví influencer y creé una comunidad de 1.7 millones de seguidores.'),
      skills: [],
      hideTopGradient: true,
    },
  ];

  return (
    <>
      <div className="grain-overlay" />
      <SideBadge />
      <Navigation />
      <Hero />
      <SectionBlurReveal>
        <Manifesto />
      </SectionBlurReveal>
      {/* Oviedo */}
      <SectionBlurReveal>
        <ExpertiseBlock {...expertiseBlocks[0]} />
      </SectionBlurReveal>
      {/* Bilbao */}
      <SectionBlurReveal>
        <ExpertiseBlock {...expertiseBlocks[1]} />
      </SectionBlurReveal>
      <SectionBlurReveal>
        <BilbaoStatsSection />
      </SectionBlurReveal>
      {/* Statement between Bilbao and Sabana Adentro */}
      <SectionBlurReveal>
        <StatementSection />
      </SectionBlurReveal>
      {/* Sabana Adentro */}
      <SectionBlurReveal>
        <ExpertiseBlock {...expertiseBlocks[2]} />
      </SectionBlurReveal>
      <SectionBlurReveal>
        <StatsSection />
      </SectionBlurReveal>
      <SectionBlurReveal>
        <PlotTwistSection />
      </SectionBlurReveal>
      <SectionBlurReveal>
        <LinkedInClosing />
      </SectionBlurReveal>
      <SectionBlurReveal>
        <ClientsSection />
      </SectionBlurReveal>
      <Footer />
    </>
  );
};

export default Index;
