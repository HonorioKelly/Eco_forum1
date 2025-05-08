import React from 'react';
import './Register.css';

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
