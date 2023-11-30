import { marked } from "marked";
import React, { useRef, useState } from "react";
import "./styles.css";

const SecondaryEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = () => {
    if (divRef.current) {
      const inputValue = divRef.current.textContent || "";
      setMarkdown(inputValue);
    }
  };

  const restoreCursorPosition = () => {
    if (divRef.current) {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(divRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      const formattedContent = marked(markdown);
      divRef.current!.innerHTML = formattedContent;
      restoreCursorPosition();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100vh",
      }}
    >
      {/* <div
        ref={divRef}
        contentEditable
        onInput={handleInputChange}
        style={{ border: "1px solid #ccc", minHeight: "200px", padding: "8px" }}
        // onKeyDown={handleInputKeyDown}
      /> */}
      <h1>Teste de Vídeo</h1>
      <iframe
        src="https://morningstarcombr-my.sharepoint.com/personal/adalberto_neves_morningstar_com_br/_layouts/15/embed.aspx?UniqueId=fc44a71f-2a9c-4720-8053-17be252f1f38&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create"
        width="640"
        height="360"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="ADC _ Boas Práticas para uma Comunicação Remota Eficiente20230725_170208-Gravação de Reunião.mp4"
      ></iframe>
    </div>
  );
};

export default SecondaryEditor;
