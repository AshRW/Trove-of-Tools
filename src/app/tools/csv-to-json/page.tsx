"use client";

import { useState } from "react";

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
    <div>
      <p>CSVtoJSON</p>
      <form onSubmit={(e) => handleInputFormSubmit(e.nativeEvent)}>
        <label>
          CSV:
          <textarea name="input" id="input" cols={30} rows={10}></textarea>
        </label>

        <button type="submit">Convert</button>
      </form>
      <label>
        JSON: <input value={output} readOnly={true} />
      </label>
      <button onClick={copyOutputToClipboard}>Copy JSON</button>
    </div>
  );
}
