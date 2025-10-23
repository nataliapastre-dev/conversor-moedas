import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [moedaOrigem, setMoedaOrigem] = useState("BRL");
  const [moedaDestino, setMoedaDestino] = useState("USD");
  const [valor, setValor] = useState(1);
  const [resultado, setResultado] = useState(null);
  const [taxas, setTaxas] = useState({});

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/BRL")
      .then((res) => res.json())
      .then((data) => setTaxas(data.rates))
      .catch((err) => console.error("Erro ao buscar taxas:", err));
  }, []);

  useEffect(() => {
    if (taxas[moedaDestino]) {
      const valorConvertido = valor * taxas[moedaDestino];
      setResultado(valorConvertido.toFixed(2));
    }
  }, [valor, moedaDestino, taxas]);

  const moedas = Object.keys(taxas);

  const inverterMoedas = () => {
    const temp = moedaOrigem;
    setMoedaOrigem(moedaDestino);
    setMoedaDestino(temp);
    setResultado(null);
  };

  const bandeiras = {
    BRL: "🇧🇷",
    USD: "🇺🇸",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    JPY: "🇯🇵",
    CAD: "🇨🇦",
    AUD: "🇦🇺",
    CHF: "🇨🇭",
    ARS: "🇦🇷",
    CLP: "🇨🇱",
  };

  return (
    <div className="container">
      <h1>Conversor de Moedas</h1>

      <div className="card">
        <div className="campo">
          <label>Valor:</label>
          <input
            type="number"
            min="0"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
          />
        </div>

        <div className="moedas">
          <div className="select-group">
            <label>De:</label>
            <div className="select-wrapper">
              <span className="flag">{bandeiras[moedaOrigem]}</span>
              <select
                value={moedaOrigem}
                onChange={(e) => setMoedaOrigem(e.target.value)}
              >
                {moedas.map((moeda) => (
                  <option key={moeda} value={moeda}>
                    {bandeiras[moeda]} {moeda}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="botao-inverter" onClick={inverterMoedas}>
            🔁
          </button>

          <div className="select-group">
            <label>Para:</label>
            <div className="select-wrapper">
              <span className="flag">{bandeiras[moedaDestino]}</span>
              <select
                value={moedaDestino}
                onChange={(e) => setMoedaDestino(e.target.value)}
              >
                {moedas.map((moeda) => (
                  <option key={moeda} value={moeda}>
                    {bandeiras[moeda]} {moeda}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {resultado && (
          <p className="resultado">
            💸 {valor} {moedaOrigem} ={" "}
            <strong>{resultado} {moedaDestino}</strong>
          </p>
        )}
      </div>

      <footer>
        <p>Desenvolvido por <strong>Natália Pastre 💻</strong></p>
      </footer>
    </div>
  );
}
