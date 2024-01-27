"use client";

import { useState } from "react";
import "./csv-to-json.css";

export default function JsonToCsv() {
  const [output, setOutput] = useState<string>("Output will appear here");

  function getStringFromEvent(e: Event): string {
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    return `${formJson.input}`;
  }

  function csvToJson(csvString: string): string {
    try {
      const lines = csvString.split("\n");
      const headers = lines[0].split(",");

      const jsonArray: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(",");
        if (currentLine.length !== headers.length) {
          throw new Error("CSV data is inconsistent.");
        }

        const obj: any = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentLine[j];
        }
        jsonArray.push(obj);
      }

      return JSON.stringify(jsonArray);
    } catch (error) {
      console.error("Error converting CSV to JSON:", error);
      return "";
    }
  }

  function handleInputFormSubmit(e: Event) {
    e.preventDefault();

    const csvString: string = getStringFromEvent(e);
    const jsonString: string = csvToJson(csvString);
    setOutput(jsonString);
  }

  function copyOutputToClipboard() {
    navigator.clipboard.writeText(output);
  }

  return (
    <div className="tool-container">
      <div className="tool-title">CSV to JSON</div>
      <div className="csv-to-json">
        <div className="input-div">
          <div>CSV:</div>
          <div className="form-container">
            <form onSubmit={(e) => handleInputFormSubmit(e.nativeEvent)}>
              <textarea name="input" id="input" spellCheck={false} placeholder="Enter Here"></textarea>
              <button className="button" type="submit">
                Convert
              </button>
            </form>
          </div>
        </div>
        <div className="output-div">
          <div>JSON: </div>
          <div>
            <textarea
              value={output}
              readOnly={true}
              spellCheck={false}
            ></textarea>
            <button className="button" onClick={copyOutputToClipboard}>
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
