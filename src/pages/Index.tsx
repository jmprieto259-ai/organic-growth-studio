import Navigation from "@/components/Navigation";
import SideBadge from "@/components/SideBadge";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import ExpertiseBlock from "@/components/ExpertiseBlock";
import vaqueroImg from "@/assets/vaquero.jpg";
import Manifesto from "@/components/Manifesto";
import ClientsSection from "@/components/ClientsSection";
import StatsSection from "@/components/StatsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const expertiseBlocks = [
  {
    stickyBarLeft: "Mi Historia",
    stickyBarRight: "역사",
    bgWord: "VAQUERO",
    placeholder: "[ Tu foto en el llano ]",
    image: vaqueroImg,
    number: "01",
    code: "// 01",
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
  {
    stickyBarLeft: "El Caso Oviedo",
    stickyBarRight: "증명",
    bgWord: "VOTOS",
    placeholder: "[ Foto con Oviedo / campaña ]",
    number: "02",
    code: "// 02",
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
    stickyBarLeft: "Los Cracks y Marcas",
    stickyBarRight: "리그",
    bgWord: "FOUNDERS",
    placeholder: "[ Foto con founders / logos ]",
    number: "03",
    code: "// 03",
    title: "Grandes<br/>Ligas",
    subtitle: "Top Founders Latam",
    h4Text: "Asesorando a los líderes más grandes del ecosistema tech de Latam",
    paragraph:
      'Soy el asesor de los founders más influyentes: Andrés Bilbao (Rappi), Daniel Bilbao (Truora), Santiago Pineda (Mensajeros Urbanos), Giovanni Stella (Ex Country Manager de Google). En startups, ayudé a Trii a lograr <strong style="color:white">el mayor número de descargas en su historia</strong> con contenido 100% orgánico. Y logré que negocios como Friogan o una subasta de ganado generaran millones de reproducciones.',
    skills: [
      "Andrés Bilbao — Cofundador de Rappi",
      "Daniel Bilbao — Truora",
      "Santiago Pineda — Mensajeros Urbanos",
      "Giovanni Stella — Ex Country Manager Google",
      "Trii, Mejor CDT, Cíclico, TuEme",
    ],
  },
  {
    stickyBarLeft: "Mi Sistema",
    stickyBarRight: "시스템",
    bgWord: "SISTEMA",
    placeholder: "[ Imagen creación de contenido ]",
    number: "04",
    code: "// 04",
    title: "El Sistema<br/>Orgánico",
    subtitle: "Las 4P del Contenido",
    h4Text: "Entiendo el mundo de lo orgánico y construyo sistemas para que tú también lo domines",
    paragraph:
      'En redes solo hay tres caminos: entretener, educar o inspirar. Mi sistema define tu <strong style="color:white">Personaje, Producto, Personalidad y Posicionamiento</strong> — las 4P — para diferenciarte del resto. Te enseño a meter la creación de contenido en tu rutina usando estructuras probadas de retención de atención. La constancia le gana a la perfección, siempre.',
    skills: [
      "Generar Valor Real: Entretener, Educar o Inspirar",
      "Las 4P: Personaje, Producto, Personalidad, Posicionamiento",
      "Storytelling con estructuras probadas de retención",
      "Sistemas para crear contenido sin fricción diaria",
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
      <WorkSection />
      {expertiseBlocks.map((block, i) => (
        <ExpertiseBlock key={i} {...block} />
      ))}
      <Manifesto />
      <ClientsSection />
      <StatsSection />
      <ExperienceSection />
      <AboutSection />
      <Footer />
    </>
  );
};

export default Index;
