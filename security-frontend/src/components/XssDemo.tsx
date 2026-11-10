import { useState } from "react";

const XssDemo = () => {
  const [comment, setComment] = useState("");

  return (
    <section>
      <h2>XSS-demo</h2>

      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Skriv en kommentar"
      />

      <h3>Säker rendering</h3>
      <p>{comment}</p>

      <h3>Osäker rendering</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: comment
        }}
      />
    </section>
  );
};

export default XssDemo;