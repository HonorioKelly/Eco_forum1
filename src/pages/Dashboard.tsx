import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Layout } from '@/components/layout/Layout';
import type { EnvironmentalData } from "@/types";
import { useAuth } from '@/context/AuthContext';
import { AirVent, ThermometerSun, CloudRain, AlertTriangle, MapPin } from "lucide-react";
import { BarChart, LineChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from "recharts";
import "./Dashboard.css";

//Qualidade do Ar
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

//  Qualidade da água
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

// Temperatura
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "good":
      return "status-good";
    case "moderate":
      return "status-moderate";
    case "poor":
      return "status-poor";
    case "hazardous":
      return "status-hazardous";
    default:
      return "status-default";
  }

};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "good":
      return "badge-good";
    case "moderate":
      return "badge-moderate";
    case "poor":
      return "badge-poor";
    case "hazardous":
      return "badge-hazardous";
    default:
      return "badge-default";
  }
};

const getStatusProgress = (value: number, type: string) => {
  if (type === "air") {
    if (value <= 50) return { value: (value / 50) * 100, status: "good" };
    if (value <= 100) return { value: ((value - 50) / 50) * 100, status: "moderate" };
    if (value <= 150) return { value: ((value - 100) / 50) * 100, status: "poor" };
    return { value: 100, status: "hazardous" };
  } else if (type === "water") {
    if (value >= 80) return { value: ((value - 80) / 20) * 100, status: "good" };
    if (value >= 50) return { value: ((value - 50) / 30) * 100, status: "moderate" };
    if (value >= 20) return { value: ((value - 20) / 30) * 100, status: "poor" };
    return { value: 100, status: "hazardous" };
  } else {
    if (value <= 25) return { value: (value / 25) * 100, status: "good" };
    if (value <= 32) return { value: ((value - 25) / 7) * 100, status: "moderate" };
    if (value <= 40) return { value: ((value - 32) / 8) * 100, status: "poor" };
    return { value: 100, status: "hazardous" };
  }
};

const Dashboard = () => {
  const { user } = useAuth(); 
  const [selectedTab, setSelectedTab] = useState("overview");
  const [alerts, setAlerts] = useState<EnvironmentalData[]>([]);

  useEffect(() => {
    const criticalItems = [
      ...mockAirData.filter(item => item.status === "poor" || item.status === "hazardous"),
      ...mockWaterData.filter(item => item.status === "poor" || item.status === "hazardous"),
      ...mockTemperatureData.filter(item => item.status === "poor" || item.status === "hazardous"),
    ];
    setAlerts(criticalItems);
  }, []);

  const renderDataCard = (title: string, icon: React.ReactNode, data: EnvironmentalData[]) => (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">
          {icon}
          <span className="card-title-text">{title}</span>
        </div>
        <button className="card-button">
          <a href={`/data#${title.toLowerCase()}`}>Ver todos</a>
        </button>
      </div>
      <div className="card-content">
        <div className="card-grid">
          {data.map((item) => {
            const progress = getStatusProgress(item.value, item.type);
            return (
              <div key={item.id} className="card-item">
                <div className="item-header">
                  <div className="item-location">
                    <MapPin className="item-location-icon" />
                    <h4>{item.location}</h4>
                  </div>
                  <span className={`item-status-badge ${getStatusBadge(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                <div className="item-data">
                  <span className="item-value">
                    {item.value} <span className="item-unit">{item.unit}</span>
                  </span>
                  <span className="item-time">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className={`progress-bar ${getStatusColor(progress.status)}`} style={{ width: `${progress.value}%` }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  
  return (
    <Layout requireAuth>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Bem-vindo de volta, {user?.name}! Aqui está o monitoramento atual dos dados ambientais.
          </p>
        </div>

        {alerts.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="icon" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              {alerts.length} pontos de monitoramento apresentam condições preocupantes.
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="tabs-section">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="air">Qualidade do Ar</TabsTrigger>
            <TabsTrigger value="water">Qualidade da Água</TabsTrigger>
            <TabsTrigger value="temperature">Temperatura</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="tab-content">
            <div className="grid-overview">
              {renderDataCard("Ar", <AirVent className="icon" />, mockAirData)}
              {renderDataCard("Água", <CloudRain className="icon" />, mockWaterData)}
              {renderDataCard("Temperatura", <ThermometerSun className="icon" />, mockTemperatureData)}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tendências Ambientais</CardTitle>
                <CardDescription>Dados dos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent className="card-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ar" stroke="#3a5a40" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="agua" stroke="#1a759f" />
                    <Line type="monotone" dataKey="temperatura" stroke="#e76f51" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="air" className="tab-content">
            <Card>
              <CardHeader>
                <CardTitle>Qualidade do Ar Detalhada</CardTitle>
                <CardDescription>Valores atuais de poluição do ar (µg/m³)</CardDescription>
              </CardHeader>
              <CardContent className="card-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockAirData.map(item => ({ name: item.location, valor: item.value, limite: 50 }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="valor" fill="#3a5a40" />
                    <Bar dataKey="limite" fill="#a3b18a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="water" className="tab-content">
            <Card>
              <CardHeader>
                <CardTitle>Qualidade da Água Detalhada</CardTitle>
                <CardDescription>Índice de qualidade da água (IQA)</CardDescription>
              </CardHeader>
              <CardContent className="card-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockWaterData.map(item => ({ name: item.location, valor: item.value, ideal: 80 }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="valor" fill="#1a759f" />
                    <Bar dataKey="ideal" fill="#76c893" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="temperature" className="tab-content">
            <Card>
              <CardHeader>
                <CardTitle>Temperatura Detalhada</CardTitle>
                <CardDescription>Registros de temperatura (°C)</CardDescription>
              </CardHeader>
              <CardContent className="card-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockTemperatureData.map(item => ({ name: item.location, temperatura: item.value, media: 27.5 }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="temperatura" fill="#e76f51" />
                    <Bar dataKey="media" fill="#fefae0" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
} 
export default Dashboard;
