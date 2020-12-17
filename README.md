## file-storage-node-handler

For use with [file-storage-node](https://github.com/AlexanderPaolini/file-storage-node)

A wrapper to store files in a node/subserver system.

---

## FileStorage

### FileStorage.saveFile()

`FileStorage.saveFile(data, nodeID?)`

**`returns`** - `FileResponse`

Returns a FileResponse including the node it was sent to and the response of the server.

- **`data (Buffer)`** - The data to be saved.
- **`nodeID (string)`** - The ID of the node.

### FileStorage.getFile()

`FileStorage.getFile(fileID, nodeID)`

**`returns`** - `Buffer`

Returns a Buffer from the server, if the file exists.

- **`fileID (string)`** - The ID of the file.
- **`nodeID (string)`** - The ID of the node.

---

### Example

```js
const nodes = [
  {
    url: "http://localhost:3000/",
    id: "1",
    name: "iddd",
    token: "token",
  },
];

const fs = require("fs");
const storageHandler = require("file-storage-node-handler");
const StorageHandler = new storageHandler.FileStorage(nodes);

// Returns a FileResponse
const inResponse = await StorageHandler.saveFile(fs.readFileSync("./in.png"));

// Returns a Buffer
const outResponse = await StorageHandler.getFile(
  inResponse.response.id,
  inResponse.node.id
);
fs.writeFileSync("./out.png", outResponse);
```

---

### Contributors:

none :(
