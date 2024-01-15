"use client";

import axios from "axios";

export default function MailMan() {
  const httpMethods = [
    { id: 1, name: "GET", func: axios.get },
    { id: 2, name: "POST", func: axios.post },
    { id: 3, name: "PATCH", func: axios.patch },
    { id: 4, name: "PUT", func: axios.put },
    { id: 5, name: "DELETE", func: axios.delete },
    { id: 6, name: "HEAD", func: axios.head },
    { id: 7, name: "OPTIONS", func: axios.options },
  ];

  async function handleInputFormSubmit(e: Event) {
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    const { link, body } = formJson;

    const methodToPerform = httpMethods.find(
      ({ id }) => Number(formJson.method) === id
    );

    const request = await methodToPerform?.func(`${link}`, `${body}`);
    console.log(request);
  }

  function send() {
    // const req = axios({method:'post'})
  }
  return (
    <div>
      <p>MailMan</p>
      <form onSubmit={(e) => handleInputFormSubmit(e.nativeEvent)}>
        <select name="method" id="method">
          {httpMethods.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <input type="text" name="link" id="link" />
        <label>
          Body:
          <textarea name="body" id="body" cols={30} rows={10}></textarea>
        </label>
        <button type="submit">Fire</button>
      </form>
    </div>
  );
}
