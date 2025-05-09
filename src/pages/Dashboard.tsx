import React from 'react';
import './Dashboard.css';
import { EnvironmentalData } from '@/types';


const mockAirData: EnvironmentalData[] = [
  {
    id: "1",
    type: "air",
    value: 45,
    unit: "µg/m³",
    location: "São Paulo - Centro",
    timestamp: new Date().toISOString(),
    status: "moderate",
  },
  {
    id: "2",
    type: "air",
    value: 22,
    unit: "µg/m³",
    location: "Rio de Janeiro - Ipanema",
    timestamp: new Date().toISOString(),
    status: "good",
  },
  {
    id: "3",
    type: "air",
    value: 75,
    unit: "µg/m³",
    location: "Belo Horizonte - Centro",
    timestamp: new Date().toISOString(),
    status: "poor",
  },
];

const mockWaterData: EnvironmentalData[] = [
  {
    id: "4",
    type: "water",
    value: 85,
    unit: "IQA",
    location: "Rio Tietê - Nascente",
    timestamp: new Date().toISOString(),
    status: "good",
  },
  {
    id: "5",
    type: "water",
    value: 42,
    unit: "IQA",
    location: "Rio Tietê - São Paulo",
    timestamp: new Date().toISOString(),
    status: "poor",
  },
  {
    id: "6",
    type: "water",
    value: 68,
    unit: "IQA",
    location: "Baía de Guanabara",
    timestamp: new Date().toISOString(),
    status: "moderate",
  },
];

const mockTemperatureData: EnvironmentalData[] = [
  {
    id: "7",
    type: "temperature",
    value: 28.5,
    unit: "°C",
    location: "São Paulo",
    timestamp: new Date().toISOString(),
    status: "moderate",
  },
  {
    id: "8",
    type: "temperature",
    value: 32.8,
    unit: "°C",
    location: "Rio de Janeiro",
    timestamp: new Date().toISOString(),
    status: "poor",
  },
  {
    id: "9",
    type: "temperature",
    value: 26.2,
    unit: "°C",
    location: "Curitiba",
    timestamp: new Date().toISOString(),
    status: "good",
  },
];

const chartData = [
  {
    name: "Jan",
    ar: 40,
    agua: 75,
    temperatura: 25,
  },
  {
    name: "Fev",
    ar: 45,
    agua: 72,
    temperatura: 26,
  },
  {
    name: "Mar",
    ar: 50,
    agua: 68,
    temperatura: 27,
  },
  {
    name: "Abr",
    ar: 55,
    agua: 65,
    temperatura: 28,
  },
  {
    name: "Mai",
    ar: 60,
    agua: 62,
    temperatura: 29,
  },
  {
    name: "Jun",
    ar: 65,
    agua: 58,
    temperatura: 30,
  },
];

















const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Painel do Usuário</h1>
        <p>Bem-vindo de volta!</p>
      </header>

      <main className="dashboard-main">
        <div className="card">
          <h2>Qualidade do Ar</h2>
          <p>Boa (Índice: 42)</p>
        </div>
        <div className="card">
          <h2>Temperatura</h2>
          <p>27°C</p>
        </div>
        <div className="card">
          <h2>Nível da Água</h2>
          <p>Normal</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
