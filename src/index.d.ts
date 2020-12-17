/// <reference types="node" />
export interface Node {
    name: string;
    id: string;
    url: string;
    token: string;
}
export interface FileResponse {
    node: Node;
    response: {
        success: boolean;
        message?: string;
        fix?: string;
        id?: number;
    };
}
export declare class FileStorage {
    private nodes;
    constructor(nodes: Node[]);
    private getNode;
    saveFile(data: Buffer, nodeID?: string): Promise<FileResponse>;
    getFile(fileID: number, nodeID: string): Promise<Buffer>;
}
