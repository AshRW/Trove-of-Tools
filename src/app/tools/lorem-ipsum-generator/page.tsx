"use client";

import { useState } from "react";
import { LoremIpsum } from "lorem-ipsum";

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
    <div>
      <p>Lorem ipsum generator</p>
      <div>
        <form onSubmit={(e) => handleInputFormSubmit(e.nativeEvent)}>
          <label>
            Words Per Sentence:
            <input type="text" name="words" id="words" defaultValue={16} />
          </label>
          <label>
            Sentences Per Paragraph:
            <input type="text" name="sentence" id="sentence" defaultValue={8} />
          </label>
          <label>
            No of Paragraphs:
            <input type="text" name="para" id="para" defaultValue={7} />
          </label>

          <button type="submit">Generate</button>
        </form>
        <button onClick={copyOutputToClipboard}>Copy Text</button>
        <textarea
          name="output"
          id="output"
          value={output}
          cols={30}
          rows={10}
          readOnly={true}
        ></textarea>
      </div>
    </div>
  );
}
