import { writeFile } from '@tauri-apps/plugin-fs';
import { fetch } from '@tauri-apps/plugin-http';
import { save } from '@tauri-apps/plugin-dialog';
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

    document.getElementById('theimg').style.display = 'none';
    showSpinner(true);

    try {
      const response  =  await fetch(url);
      const buffer = await response.arrayBuffer();
      await writeFile(filePath, new Uint8Array(buffer));
      showSpinner(false);
      document.getElementById('theimg').style.display = '';
        Swal.fire({
         text: 'Image is saved to your device',
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
