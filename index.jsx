
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0.3);
  const [loanProgram, setLoanProgram] = useState("Foreign National");
  const [interestRate, setInterestRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const loanAmount = purchasePrice * (1 - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = term * 12;
  const monthlyPayment = loanAmount
    ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments))
    : 0;

  const closingCosts = loanAmount * 0.03;
  const cashToClose = purchasePrice * downPayment + closingCosts;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <Head>
        <title>Calculadora de Préstamos</title>
      </Head>
      <h1>Calculadora de Préstamos</h1>
      <input
        type="number"
        placeholder="Precio de compra"
        onChange={(e) => setPurchasePrice(Number(e.target.value))}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="number"
        step="0.01"
        placeholder="% Down Payment (ej. 0.3 para 30%)"
        onChange={(e) => setDownPayment(Number(e.target.value))}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <select
        value={loanProgram}
        onChange={(e) => setLoanProgram(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      >
        <option>Foreign National</option>
        <option>DSCR</option>
        <option>Bank Statement</option>
        <option>Profit and Loss</option>
        <option>W2 / Full Doc</option>
        <option>FHA</option>
        <option>Conventional</option>
        <option>Construction</option>
      </select>
      <input
        type="number"
        step="0.01"
        placeholder="Tasa de interés (%)"
        value={interestRate}
        onChange={(e) => setInterestRate(Number(e.target.value))}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="number"
        placeholder="Término (años)"
        value={term}
        onChange={(e) => setTerm(Number(e.target.value))}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <div style={{ marginTop: '20px' }}>
        <p><strong>Loan Amount:</strong> ${loanAmount.toLocaleString()}</p>
        <p><strong>Pago mensual estimado (P&I):</strong> ${monthlyPayment.toFixed(2)}</p>
        <p><strong>Costos de cierre (estimado 3%):</strong> ${closingCosts.toLocaleString()}</p>
        <p><strong>Total a llevar al cierre:</strong> ${cashToClose.toLocaleString()}</p>
      </div>
    </div>
  );
}
