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
import PinSection from "@/components/PinSection";


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
    placeholder: "",
    image: casoRappiImg,
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
    title: "@sabana<br/>adentro",
    subtitle: "Mi Historia",
    h4Text: "Mandé a la mierda el deber ser y me fui a vivir como vaquero al llano",
    paragraph:
      'Pasé de ser líder de tecnología en una startup a perseguir mi sueño de irme a vivir al llano descalzo como vaquero en los grandes hatos del llano. Usé las redes sociales para contar mi historia y en un año y medio pasé de cero a 1.7 millones de seguidores.',
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

      {/* Statement — has its own sticky system */}
      <StatementSection />

      {/* Expertise blocks — scrub-pinned */}
      {expertiseBlocks.slice(0, 2).map((block, i) => (
        <PinSection key={i} scrollLength={1.5} stagger={0.1}>
          <ExpertiseBlock {...block} />
        </PinSection>
      ))}

      <PinSection scrollLength={1.4} stagger={0.1}>
        <ExpertiseBlock {...expertiseBlocks[2]} />
      </PinSection>

      <StatsSection />

      {/* Manifesto — scrub-pinned, longer scroll */}
      <PinSection scrollLength={1.5} stagger={0.08}>
        <Manifesto />
      </PinSection>

      {/* Clients — scrub-pinned */}
      <PinSection scrollLength={1} stagger={0.12}>
        <ClientsSection />
      </PinSection>

      {/* Footer — scrub-pinned briefly */}
      <PinSection scrollLength={0.8} stagger={0.1}>
        <Footer />
      </PinSection>
    </>
  );
};

export default Index;
