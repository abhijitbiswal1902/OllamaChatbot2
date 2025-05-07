import React from "react";
import "./Message.css";

function Message({ response }) {
  return (
    <div className="response-box">
      <h3>Generated SQL Query:</h3>
      <pre>{response.query || "No query generated."}</pre>

      {response.data && (
        <>
          <h3>Query Result:</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(response.data[0] || {}).map((col, i) => (
                  <th key={i}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {response.data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {response.error && <p style={{ color: "red" }}>{response.error}</p>}
    </div>
  );
}

export default Message;
