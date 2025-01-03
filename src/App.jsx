import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { GearFill } from "react-bootstrap-icons";
import { fetch } from "@tauri-apps/plugin-http";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { Store } from "@tauri-apps/plugin-store";
import Settings from "./Settings";
import { Download } from "./Download";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [spin, showSpinner] = useState(false);
  const [content, setContent] = useState(null);
  const [settings, setSettings] = useState(false);
  const hideSettings = () => setSettings(false);

  function statusCheck(code, msg) {
    switch (code) {
      case 400:
        ShowMsg("Status code 400: " + msg);
        break;
      case 401:
        ShowMsg(
          "Status code 401: You have a missing or invalid API key. Click the gear in the lower left-hand corner to add an API key",
        );
        break;
      case 429:
        ShowMsg("Status code 429: You exceeded your quota or rate limit");
        break;
      case "500":
        ShowMsg(
          "Status code 500: Openai's server had a problem with your request",
        );
        break;
      case "503":
        ShowMsg(
          "Status code 503: Openai's server is overloaded. Try again later",
        );
        break;
      default:
        ShowMsg("Status code " + code + ": Unknown status code -- Sorry");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    if (prompt === null || prompt === "") {
      Swal.fire({
        text: "Please provide a prompt",
        confirmButtonText: "Ok",
      });
      return;
    }

    ClearEntry();

    const store = await Store.load("keys.json");
    const apikey = await store.get("openai");

    if (apikey === null || typeof apikey === "undefined") {
      statusCheck(401, "");
      return;
    }

    const url = "https://api.openai.com/v1/images/generations";
    showSpinner(true);

    const params = {
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid",
      response_format: "url",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          Authorization: "Bearer " + apikey.val,
          "Content-Type": "application/json",
        },
      });

      showSpinner(false);

      const responseJSON = await response.json();

      if (!response.ok) {
        statusCheck(response.status, responseJSON.error.message);
        return;
      }

      let rvprompt = null;
      if (typeof responseJSON.data[0].revised_prompt !== "undefined")
        rvprompt = responseJSON.data[0].revised_prompt;
      ShowImg(responseJSON.data[0].url, rvprompt);
    } catch (error) {
      ShowMsg(error);
      showSpinner(false);
    }
  }

  async function ShowImg(url, rvprompt) {
    if (rvprompt === null) rvprompt = "There is no revised prompt";
    setContent(
      <Image
        title={rvprompt}
        className="centerfit"
        id="theimg"
        onClick={() => Download(showSpinner)}
        src={url}
      />,
    );
  }

  function ShowMsg(content) {
    setContent(
      <p className="d-flex justify-content-center align-items-center vh-100">
        <strong>{content}</strong>
      </p>,
    );
  }

  function ClearEntry() {
    setContent(null);
  }

  useEffect(() => {
    let isEmpty = document.getElementById("thepic").innerHTML === "";
    if (isEmpty) {
      setContent(
        <center>
          <h1>PICTURE THIS</h1>
        </center>,
      );
    }
  }, []);

  function gotoSettings() {
    setSettings(true);
  }

  return (
    <Container className="sizing" fluid>
      {settings ? <Settings showit={settings} hideit={hideSettings} /> : null}

      <Row className="imght d-flex justify-content-center align-items-center">
        <div
          id="thepic"
          className="d-flex justify-content-center align-items-center w-100 h-100"
        >
          {content}
          {spin && (
            <Spinner
              style={{ display: "block", margin: "0 auto" }}
              className="ballsize"
              animation="grow"
              variant="primary"
            />
          )}
        </div>
      </Row>

      <Row className="bottom mb-2">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <InputGroup>
            <Button
              title="Your API Key"
              className="border-0"
              onClick={() => gotoSettings()}
              variant="outline-primary"
            >
              <span>
                <GearFill size={32} />
              </span>
            </Button>
            <Form.Control
              style={{ backgroundColor: "#d3d3d3" }}
              placeholder="What kind of image do you want OpenAI to create?"
              aria-label="The Prompt"
              aria-describedby="The Prompt"
              onChange={(e) => setPrompt(e.currentTarget.value)}
            />
            <Button onClick={handleSubmit} variant="primary" id="mainbut">
              Create Image
            </Button>
          </InputGroup>
        </Form>
      </Row>
    </Container>
  );
}

export default App;
