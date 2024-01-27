"use client";
import axios from "axios";
import "./dns.css";
import { useState } from "react";

export default function DnsResolver() {
  const [ip, setIp] = useState<string>("");
  function getStringFromEvent(e: Event): string {
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    return `${formJson.site}`;
  }

  async function handleInputFormSubmit(e: Event) {
    e.preventDefault();

    const website: string = getStringFromEvent(e);

    const response = await axios.get(
      `https://dns.google/resolve?name=${website}&type=A`
    );
    const answers = response.data["Answer"] as [];

    setIp(answers.map(({ data }) => data).join(`, `));
  }

  return (
    <div className="tool-container">
      <div className="tool-title">DNS RESOLVER</div>
      <div className="tool">
        <form onSubmit={(e) => handleInputFormSubmit(e.nativeEvent)}>
          <input
            type="text"
            name="site"
            id="site"
            spellCheck={false}
            placeholder="Enter Website Here"
          ></input>
          <button className="button" type="submit">
            Analyze
          </button>
        </form>
        <div className="output">{ip}</div>
      </div>
    </div>
  );
}
