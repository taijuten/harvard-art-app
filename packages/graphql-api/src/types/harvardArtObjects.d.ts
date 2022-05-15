
export interface HarvardArtObject {
    creditline?: string
    id: number
    primaryimageurl?: string
    rank: number
    title: string
    url: string
}

export interface HarvardArtObjectsData {
    records: ArtObject[]
}

export interface HarvardArtObjectsVars {
    classification?: string|number
    verificationLevel?: number
    size?: number
    page?: number
}
