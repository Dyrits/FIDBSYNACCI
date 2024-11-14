import { useEffect, useRef, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5100/api/"
});

const Fibonacci = () => {
  const input = useRef<HTMLInputElement>(null);
  const [indexes, setIndexes] = useState<number[]>([]);
  const [values, setValues] = useState<number[]>([]);

  const min = Math.max(0, ...indexes);
  const max =  Math.min(1477, min + 25);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    input.current && await api.post("/fibonacci", { index: input.current.value });
    await setData();
  }

  async function setData() {
    {
      const { data } = await api.get("/fibonacci/indexes");
      setIndexes(data.map((index: { id: number, number: number }) => index.number));
    }
    {
      const { data } = await api.get("/fibonacci/values");
      setValues(data);
    }
  }

  useEffect(() => {
    setData().then(() => {
    });
  }, []);

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <label>
        <input style={{ width: "50%" }} type="number" min={ min } max={ max } ref={ input } placeholder={`Enter a value between ${min} and ${max}`} />
        </label>
        <button>Sumbit</button>
      </form>
      <h2>I've asked for the following indexes:</h2>
      <p>
        { indexes.join(", ") }
      </p>
      <h2>Calculated fibonacci values up to the highest index:</h2>
      <table style={ { borderCollapse: "collapse" } }>
        <thead>
        <tr>
          <th style={ { border: "1px solid black", padding: "8px" } }>Index</th>
          <th style={ { border: "1px solid black", padding: "8px" } }>Value</th>
        </tr>
        </thead>
        <tbody>
        { Object.entries(values).map(([key, value]) => (
          <tr key={ key }>
            <td style={ { border: "1px solid black", padding: "8px" } }>{ key }</td>
            <td style={ { border: "1px solid black", padding: "8px" } }>{ value }</td>
          </tr>
        )) }
        </tbody>
      </table>
    </>
  );

};

export default Fibonacci;