import "./feature.css";
import { useEffect, useState } from "react";

function Feature() {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch("../datas/features.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="features">
      {data.map((item) => (
        <div className="feature-item" key={item.id}>
          <img className="feature-icon" src={item.image} alt="logo" />
          <h1 className="feature-item-title">{item.title}</h1>
          <p className="feature-item-description">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Feature;
