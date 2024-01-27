"use client";
import axios from "axios";
import "./ip.css";
import { useState } from "react";
import { ipDataType } from "./ip-data.type";

export default function IpChecker() {
  const [ipData, setIpData] = useState<ipDataType>({
    ip: "",
    network: "",
    version: "",
    city: "",
    region: "",
    region_code: "",
    country: "",
    country_name: "",
    country_code: "",
    country_code_iso3: "",
    country_capital: "",
    country_tld: "",
    continent_code: "",
    postal: "",
    timezone: "",
    utc_offset: "",
    country_calling_code: "",
    currency: "",
    currency_name: "",
    languages: "",
    asn: "",
    org: "",
  });

  function getStringFromEvent(e: Event): string {
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    return `${formJson.ip}`;
  }

  async function handleInputFormSubmit(e: Event) {
    e.preventDefault();

    const ip: string = getStringFromEvent(e);

    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const data = response.data as ipDataType;
    setIpData(data);

    console.log(response.data as ipDataType);
  }

  return (
    <div className="tool-container">
      <div className="tool-title">IP INFO CHECKER</div>
      <form onSubmit={(e) => handleInputFormSubmit(e.nativeEvent)}>
        <input
          type="text"
          name="ip"
          id="ip"
          spellCheck={false}
          placeholder="Enter IP Here"
        ></input>
        <button className="button" type="submit">
          Analyze
        </button>
      </form>
      {ipData.ip && (
        <div className="output">
          <div className="table-row">
            <div>IP</div>
            <div>{ipData?.ip}</div>
          </div>
          <div className="table-row">
            <div>Organization</div>
            <div>{ipData?.org}</div>
          </div>
          <div className="table-row">
            <div>IP Version</div>
            <div>{ipData?.version}</div>
          </div>
          <div className="table-row">
            <div>Network</div>
            <div>{ipData?.network}</div>
          </div>
          <div className="table-row">
            <div>Location</div>
            <div>
              {[
                ipData?.city,
                ipData?.region,
                ipData?.country,
                ipData.continent_code,
              ]
                .filter(Boolean)
                .join(`, `)}
            </div>
          </div>
          <div className="table-row">
            <div>Coordinates</div>
            <div>
              {ipData.latitude &&
                `latitude: ${ipData.latitude} longitude: ${ipData.longitude}`}
            </div>
          </div>
          <div className="table-row">
            <div>Country Capital</div>
            <div>{ipData.country_capital}</div>
          </div>
          <div className="table-row">
            <div>Country TLD</div>
            <div>{ipData.country_tld}</div>
          </div>
          <div className="table-row">
            <div>Timezone</div>
            <div>{ipData.timezone}</div>
          </div>
          <div className="table-row">
            <div>UTC offset</div>
            <div>{ipData.utc_offset}</div>
          </div>
          <div className="table-row">
            <div>Currency</div>
            <div>
              {ipData.currency_name &&
                `${ipData.currency_name} (${ipData.currency})`}
            </div>
          </div>
          <div className="table-row">
            <div>Languages</div>
            <div>{ipData.languages}</div>
          </div>
        </div>
      )}
    </div>
  );
}
