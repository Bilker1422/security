import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css"; // import Bootstrap CSS

export default function Main() {
  const [A, setA] = useState("");
  const [B, setB] = useState("");
  const [Plain, setPlain] = useState("");
  const [Updated, setUpdated] = useState(Plain);

  const handleChangeA = (e) => {
    setA(e.target.value);
  };
  const handleChangeB = (e) => {
    setB(e.target.value);
  };
  const handleChangePlain = (e) => {
    setPlain(e.target.value.toUpperCase());
  };
  const encrypt = () => {
    let a = parseInt(A);
    let b = parseInt(B);
    if (GCD(a, 26) != 1) {
      alert("A and 26 are not coprime");
      return;
    }
    let cipher = "";
    console.log(Plain);

    for (let i = 0; i < Plain.length; i++) {
      if (Plain[i] >= "A" && Plain[i] <= "Z") {
        console.log();
        cipher += String.fromCharCode(
          ((((a * (Plain[i].charCodeAt(0) - "A".charCodeAt(0)) + b) % 26) +
            26) %
            26) +
            "A".charCodeAt(0)
        );
        console.log(cipher);
      } else {
        cipher += Plain[i];
      }
    }
    setUpdated(cipher);
  };
  const decrypt = () => {
    let a = Inverse(parseInt(A));
    let b = parseInt(B);
    let cipher = "";
    if (a !== -1) {
      for (let i = 0; i < Plain.length; i++) {
        if (Plain[i] >= "A" && Plain[i] <= "Z") {
          cipher += String.fromCharCode(
            ((((a * (Plain[i].charCodeAt(0) - "A".charCodeAt(0) - b)) % 26) +
              26) %
              26) +
              "A".charCodeAt(0)
          );
          console.log(cipher);
        } else {
          cipher += Plain[i];
        }
      }
    }
    setUpdated(cipher);
  };
  const GCD = (A, B) => {
    if (A < B) {
      let s = A;
      A = B;
      B = s;
    }
    if (B == 0) return A;
    return GCD(B, A % B);
  };
  const Inverse = (A) => {
    for (let i = 1; i <= 26; i++) {
      if (((A % 26) * (i % 26)) % 26 == 1) return i;
    }
    return -1;
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle w-50">
      <div className="d-flex flex-column">
        <div className="form-group">
          <label htmlFor="plainText">Plain Text:</label>
          <input
            type="text"
            className="form-control"
            id="plainText"
            name="plainText"
            onChange={handleChangePlain}
          />
        </div>
        <div className="form-group">
          <label htmlFor="aValue">Enter a value for A:</label>
          <input
            type="text"
            className="form-control"
            id="aValue"
            name="aValue"
            onChange={handleChangeA}
          />
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="bValue">Enter a value for B:</label>
          <input
            type="text"
            className="form-control"
            id="bValue"
            name="bValue"
            onChange={handleChangeB}
          />
        </div>
        <div className="d-flex justify-content-between p-5">
          <button className="btn btn-primary" onClick={encrypt}>
            Encrypt
          </button>
          <button className="btn btn-primary" onClick={decrypt}>
            Decrypt
          </button>
        </div>
        <div className="overflow-y-auto">
          <h4 className="">
            <span id="saskfismkf">Cipher: </span>
            {Updated}
          </h4>
        </div>
      </div>
    </div>
  );
}
