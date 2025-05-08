import { useNavigate } from "react-router-dom";
import { AirVent, ThermometerSun, CloudRain, ArrowRight } from "lucide-react";
import React from 'react';
import './Index.css';
import { Button } from '@/components/ui/button';


interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
}

const features: Feature[] = [
  { icon: AirVent, title: "Qualidade do Ar", description: "Monitore partículas e gases." },
  { icon: CloudRain, title: "Água Limpa", description: "Acompanhe níveis de pH e impurezas." },
  { icon: ThermometerSun, title: "Temperatura", description: "Veja o clima em tempo real." },
];

const testimonials: Testimonial[] = [
  { quote: "Fantástico para minha comunidade!", author: "Maria A." },
  { quote: "Fácil, útil e intuitivo.", author: "João P." },
  { quote: "Me mantém informado todo dia.", author: "Letícia M." },
];

const isAuthenticated = false;

export default function Index () {
  const navigate = useNavigate();



  return (
    <div className="container">
    {/* Hero */}
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Monitore e Compartilhe Dados Ambientais</h1>
          <p>
            Acompanhe a qualidade do ar, da água e a temperatura em tempo real. 
            Junte-se à nossa comunidade de ambientalistas e contribua para um futuro mais sustentável. 
          </p>
          <div className="hero-buttons">
            <Button 
              className="primary"
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}>
              {isAuthenticated ? "Acessar Dashboard" : "Começar Agora"}
              <ArrowRight className="icon" />
            </Button>
            <Button 
              className="outline"
              variant="outline" onClick={() => navigate("/about")}>
              Saiba mais
            </Button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/termômetro.jpg" alt="Dashboard ambiental" />
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="features">
      <h2>Recursos do EcoConnect</h2>
      <p>Nossa plataforma oferece ferramentas para monitoramento ambiental e discussâo comunitária.</p>
      <div className="feature-list">
        {features.map((feature, index) => (
          <div key={index} className="card">
            <feature.icon className="icon" />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Testimonials */}
    <section className="testimonials">
      <h2>O que dizem nossos usuários</h2>
      <div className="testimonial-list">
        {testimonials.map((item, index) => (
          <div key={index} className="card">
            <blockquote>"{item.quote}"</blockquote>
            <footer>{item.author}</footer>
          </div>
        ))}
      </div>
    </section>

    {/* Call to Action */}
    <section className="cta">
      <h2>Junte-se à nossa comunidade</h2>
      <p>
        Registre-se agora para acessar dados ambientais e participar de discussões sobre sustentabilidade.
      </p>
      <Button
        onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
        variant="secondary"
      >
        {isAuthenticated ? "Acessar Dashboard" : "Criar uma conta"}
        <ArrowRight className="icon" />
      </Button>
    </section>
  </div>
  );
};

