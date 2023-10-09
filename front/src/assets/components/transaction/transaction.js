import "../transaction/transaction.css";
import Button from "../button/button";
import { useEffect, useState } from "react";

function Transaction() {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch("../datas/transactions.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container-account">
      {data.map((item) => (
        <section key={item.id} className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">{item.title}</h3>
            <p className="account-amount">{item.price}</p>
            <p className="account-amount-description">{item.description}</p>
          </div>

          <Button title={"View transaction"} size="high" />
        </section>
      ))}
    </div>
  );
}

export default Transaction;
