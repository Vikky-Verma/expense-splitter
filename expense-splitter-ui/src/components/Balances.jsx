import { useEffect, useState } from "react";
import axios from "axios";

function Balances() {
  const [balances, setBalances] = useState({});

  useEffect(() => {
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/balances/");

    setBalances(response.data);
  };

  return (
    <div className="card">
      <h2>Balances</h2>

      {Object.entries(balances).map(([name, amount]) => (
        <div className="balance-item" key={name}>
          <p className={
            amount >= 0 
            ? "balance-positive"
            : "balance-negative"
            }
       >
            {name}: ₹ {amount.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Balances;
