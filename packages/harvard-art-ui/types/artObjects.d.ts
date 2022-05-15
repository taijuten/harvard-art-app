
export interface ArtObject {
    creditline: string
    id: number
    primaryimageurl: string
    rank: number
    title: string
    url: string
}

export interface ArtObjectsData {
    artObjects: ArtObject[]
}

export interface ArtObjectVars {
    classification?: string|number
    verificationLevel?: number
    size?: number
    page?: number
}
