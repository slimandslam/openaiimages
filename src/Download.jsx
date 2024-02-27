import { useState } from "react";
import { writeFile, BaseDirectory } from '@tauri-apps/plugin-fs';
import { fetch } from '@tauri-apps/plugin-http';
import { save } from '@tauri-apps/plugin-dialog';
import { Store } from "@tauri-apps/plugin-store";
import { isWindows, isLinux, isIOS, isAndroid } from "./Oscheck";
import Swal from 'sweetalert2';

async function Download(showSpinner) {

    let url = document.getElementById("theimg").src;

    const filePath = await save({
      filters: [{
      name: 'Image',
      extensions: ['png']
     }]
    });

    if (filePath === null) return;

     const params =  {
           model: "dall-e-3",
           prompt: prompt,
           n: 1,
           size: "1024x1024",
           quality: "standard",
           style: "vivid",
           response_format: "url"
     };

    document.getElementById('theimg').style.display = 'none';
    showSpinner(true);

    try {
      const response  =  await fetch(url);
      const buffer = await response.arrayBuffer();
      await writeFile(filePath, new Uint8Array(buffer));
      showSpinner(false);
      document.getElementById('theimg').style.display = '';
        Swal.fire({
         text: 'Image downloaded successfully',
        confirmButtonText: 'Ok'
       });
      } catch (error) {
      showSpinner(false);
      document.getElementById('theimg').style.display = '';
       Swal.fire({
          title: "Error downloading image: "+error,
          confirmButtonColor:  "#0275d8",
          });
      }

    return;

}

export { Download };
