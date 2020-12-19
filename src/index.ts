import fetch from 'node-fetch';
import FormData from 'form-data';

export interface Node {
  name: string,
  id: string,
  url: string,
  token: string;
}

export interface FileResponse {
  node: Node,
  response: {
    success: boolean,
    message?: string,
    fix?: string,
    id?: number;
  }
}

export class FileStorage {
  private nodes: Node[];

  constructor(nodes: Node[]) {
    // Make sure people are actually using nodes
    if(!nodes) throw new Error('Missing nodes')
    // Make this.nodes nodes
    this.nodes = nodes;
  }

  private getNode(nodeID?: string): Node | null {
    // If there is a nodeID, return that node or null
    if (nodeID) return this.nodes.find(n => n.id == nodeID) || null;
    // Get a number between 0 and this.nodes.length
    let nodeNum = Math.floor(Math.random() * this.nodes.length);
    // return the random node or null
    return this.nodes[nodeNum] || null;
  }

  // No callbacks because fuck callbacks thats why
  public async saveFile(data: Buffer, nodeID?: string): Promise<FileResponse> {
    // Get a node, throw an error if none
    let node: Node = this.getNode(nodeID);
    if (!node) throw TypeError(`Expected "Node" got "${typeof node}"`);
    // Get formData ready
    let formData = new FormData();
    formData.append('file', data);
    // Make a POST request with FormData as body
    let response = await fetch(node.url + 'save', {
      method: 'post',
      headers: {
        token: node.token,
      },
      body: formData,
    });
    // Parse the response
    let jsonResponse = await response.json();
    // Return with the node number
    let fileResponse: FileResponse = { node: node, response: jsonResponse }
    return fileResponse;
  }

  public async getFile(fileID: number, nodeID: string): Promise<Buffer> {
    // Get a node, throw an error if none
    let node: Node = this.getNode(nodeID);
    if (!node) throw TypeError(`Expected "Node" got "${typeof node}"`);
    // Make a GET request
    let response = await fetch(node.url + 'get/' + fileID, {
      method: 'get',
      headers: {
        token: node.token
      }
    })
    // Return the Buffer since it has no idea what is stored in that buffer
    let responseBuffer: Buffer = await response.buffer();
    return responseBuffer;
  }

  public async delFile(fileID: number, nodeID: string): Promise<Buffer> {
    // Get a node, throw an error if none
    let node: Node = this.getNode(nodeID);
    if (!node) throw TypeError(`Expected "Node" got "${typeof node}"`);
    // Make a GET request
    let response = await fetch(node.url + 'delete/' + fileID, {
      method: 'get',
      headers: {
        token: node.token
      }
    })
    // Return the Buffer since it has no idea what is stored in that buffer
    let responseBuffer: Buffer = await response.buffer();
    return responseBuffer;
  }
}