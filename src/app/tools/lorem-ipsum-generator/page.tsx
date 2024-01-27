"use client";

import { useState } from "react";
import { LoremIpsum } from "lorem-ipsum";
import "./lorem.css";

export default function LoremIpsumGenerator() {
  const [output, setOutput] = useState<string>("Lorem");
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 2,
      min: 2,
    },
    wordsPerSentence: {
      max: 2,
      min: 2,
    },
  });

  function handleInputFormSubmit(e: Event) {
    e.preventDefault();
    setOutput("");
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const loremGenerator = new LoremIpsum({
      sentencesPerParagraph: {
        max: Number(formJson.sentence),
        min: Number(formJson.sentence),
      },
      wordsPerSentence: {
        max: Number(formJson.words),
        min: Number(formJson.words),
      },
    });
    const lorem = loremGenerator.generateParagraphs(Number(formJson.para));

    setOutput(lorem);
  }

  function copyOutputToClipboard() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className="tool-container">
      <div className="tool-title">Lorem ipsum generator</div>
      <div className="tool">
        {/* <div className="form"> */}
        <form onSubmit={(e) => handleInputFormSubmit(e.nativeEvent)}>
          <div className="form-item">
            <div>Words Per Sentence:</div>
            <input type="text" name="words" id="words" defaultValue={16} />
          </div>
          <div className="form-item">
            <div>Sentences Per Paragraph:</div>
            <input type="text" name="sentence" id="sentence" defaultValue={8} />
          </div>
          <div className="form-item">
            <div>No of Paragraphs:</div>
            <input type="text" name="para" id="para" defaultValue={7} />
          </div>
          <div className="form-item">
            <button className="button" type="submit">
              Generate
            </button>
          </div>
        </form>
        {/* </div> */}
        <div className="output">
          <textarea
            name="output"
            id="output"
            value={output}
            cols={30}
            rows={10}
            readOnly={true}
          ></textarea>
          <button className="button" onClick={copyOutputToClipboard}>
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
