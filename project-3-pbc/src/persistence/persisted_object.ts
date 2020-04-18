

export interface DocumentData {
    [field: string]: any
}

export interface DatabaseDocument {
    id: string, 
    data: DocumentData
}