import { useState } from "react";
import { useEffect } from 'react';
import { Store } from "@tauri-apps/plugin-store";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
  
export default function Settings(props) {
  const [openaival, Setopenaival] = useState("");

   useEffect(() => {
     async function setvals() {
       const store = new Store(".settings.json");
       let js1 = null;
       try { js1 = await store.get("openai"); } catch(e) {}
       if (js1 !== null) Setopenaival(js1.val);
     }
     setvals();
  }, []); 

  async function StoreSettings() {
  
    const store = new Store(".settings.json");
    let h = document.getElementById('openai');
    h.value = h.value.replace(/\s+/g,'');
 
  try {
  await store.set("openai", { val: h.value });
  await store.save();
 
  } catch(error) {
    console.log("SETTINGS ERROR:", JSON.stringify(error));
  }

  props.hideit();
  }

  return (
    <Modal backdrop="static" keyboard={false} show={props.showit} size="lg">
       <Modal.Header>
            <Button size="sm" className="ms-2" variant="secondary" onClick={() => props.hideit()}>
            Cancel
          </Button>
          <Button size="sm" className="ms-2" variant="primary" onClick={() => StoreSettings()}>
            Save
          </Button>
        </Modal.Header>
      <Modal.Body>
         <Form>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">OpenAI API Key</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your OpenAI API Key"
                id="openai"
                defaultValue={openaival}
              />
           </Form.Group>
          </Form>

       </Modal.Body>
    </Modal>
  );
}

