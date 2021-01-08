import React, { useState } from "react";
import "./index.css";

export default function Calculator() {
  const [values, setValues] = useState({
    inp1: "",
    inp2: "",
    result: 0,
    symbol: "+",
    counter: 0,
    reset: true,
  });

  const { inp1, inp2, result, symbol, counter, reset } = values;

  const onSubmit = (sym) => () => {
    switch (sym) {
      case "+":
        setValues({
          ...values,
          symbol: "+",
          result: inp1 + inp2,
          counter: counter + 1,
          reset: false,
        });
        break;
      case "-":
        setValues({
          ...values,
          symbol: "-",
          result: inp1 - inp2,
          counter: counter + 1,
          reset: false,
        });
        break;

      case "*":
        setValues({
          ...values,
          symbol: "*",
          result: inp1 * inp2,
          counter: counter + 1,
          reset: false,
        });
        break;

      case "/":
        setValues({
          ...values,
          symbol: "/",
          result: Math.round((inp1 / inp2) * 100) / 100,
          counter: counter + 1,
          reset: false,
        });
        break;
      default:
        onReset();
    }
  };

  const onReset = () => {
    setValues({
      ...values,
      reset: true,
      inp1: "",
      inp2: "",
      symbol: "+",
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: parseInt(event.target.value) });
  };

  return (
    <div className="layout-column align-items-center">
      <div data-testid="total-operations" className="pt-50 total-operations">
        Total operations performed: {counter}
        <p style={{ opacity: reset ? "0" : "" }}></p>
      </div>
      <div className="card">
        <section className="card-text">
          <div className="layout-row justify-content-around align-items-center mt-40">
            <input
              type="number"
              className="ml-3 mr-3"
              data-testid="app-input1"
              onChange={handleChange("inp1")}
              value={inp1}
              autoComplete="off"
              placeholder="Eg: 1"
              name="input1"
            />
            <label
              className="ml-2 mr-2 symbol text-center"
              data-testid="selected-operator"
            >
              {symbol}
            </label>
            <input
              type="number"
              data-testid="app-input2"
              onChange={handleChange("inp2")}
              value={inp2}
              autoComplete="off"
              className="ml-3 mr-3"
              placeholder="Eg: 2"
            />
          </div>
          <div className="layout-row justify-content-around mt-30">
            <button
              onClick={onSubmit("+")}
              className="operationFont"
              type="submit"
              data-testid="addButton"
            >
              +
            </button>
            <button
              onClick={onSubmit("-")}
              className="operationFont"
              type="submit"
              data-testid="subtractButton"
            >
              -
            </button>
            <button
              onClick={onSubmit("*")}
              className="operationFont"
              type="submit"
              data-testid="multiplyButton"
            >
              *
            </button>
            <button
              onClick={onSubmit("/")}
              className="operationFont"
              type="submit"
              data-testid="divideButton"
            >
              /
            </button>
          </div>
          <div className="layout-row justify-content-between align-items-center mt-30">
            <button
              onClick={onReset}
              type="reset"
              data-testid="resetButton"
              className="outline danger"
            >
              Reset
            </button>
            {!reset && (
              <div className="layout-row justify-content-center align-items-center result-container">
                <div
                  data-testid="result"
                  className="result-value ma-0 slide-up-fade-in"
                  style={{ display: reset ? "none" : "" }}
                >
                  Result: {result}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
