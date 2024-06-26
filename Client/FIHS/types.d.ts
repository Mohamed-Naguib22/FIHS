interface DBItem {
    id: number,
}

interface HasImage extends DBItem {
    imgUrl: string,
}

interface WithTitle extends DBItem {
    title: string,

}


interface AgroCare extends HasImage {
    name: string,
    price: number,
    usageInstructions: string,
    manufactuer: string,
}

type ArticleCard = {
    position: number,
    title: string,
    link: string,
    snippet: string,
    resourceLink: string,
    author: string,
    authorProfileLink: string
}

type Fertilizer = AgroCare & {
    nutrientContent: string,
    imageURL: string
}

type Pesticide = AgroCare & {
    description: string,
    toxicity: string,
    type: string,
    imageURL: string
}

type ChatResponse = {
    answer: string
}

type WeatherStatus = {
    city: string,
    description: string,
    temperature: string,
    pressure: string,
    humidity: string,
    windSpeed: string,
    icon: string,
}
type Session = {
    isAuthenticated: boolean,
    emailConfirmed: boolean,
    firstName: string,
    lastName: string,
    imgUrl: string | null,
    email: string,
    phoneNumber: string,
    roles: string[],
    token: string,
    expiresOn: string,
    refreshTokenExpiration: string,
    favouriteId: number
}

type Paginate<T, N extends string> = Record<N, T[]> & { nextPage: number }


type Plant = HasImage & {
    name: string,
    description: string,
    commonUses: string,
    nutritionalValue: string,
    averageYield: number,
    sunlightReqs: string,
    irrigationReqs: number,
    plantingSeason: string,
    temperature: string,
    harvistingSeason: string,
    culivationTips: string,
    imageUrl: string,
    color: string,
    scientificName: string
}

type FullPlant = Plant & {
    isFav: boolean,
    plantTypes: PlantType[],
    soils: Soil[],
    diseases: Disease[],
    pests: Pest[]
}

type Pest = HasImage & {
    imageUrl: string,
    species: string,
    name: string,
    scientificName: string,
    damageSymptoms: string,
    controlMethods: string,
    description: string,
    lifeCycle: string,
    geographicDistribution: string,
    reproduction: string,
    plants: Plant[],
    pesticides: Pesticide[]
}

type Disease = HasImage & {
    imageUrl: string,
    species: string,
    name: string,
    scientificName: string,
    causes: string,
    description: string,
    treatments: string,
    symptoms: string,
    preventionMethods: string,
    plants: Plant[]
}

type Soil = HasImage & {
    texture: string,
    structure: string,
    pHLevel: string,
    nutrientContent: string,
    organicMatter: string,
    moistureRetention: string,
    drainage: string,
    cationExchangeCapacity: string,
}

type PlantType = DBItem & {
    name: string,
    heightRange: string,
    spreadRange: string,
    lifeCycle: string,
    imgURL: string
}


type IdentifyPlant = {
    suggestions: PlantSuggestion[]
}

type DetectDisease = {
    isHealthy: boolean,
    isPlant: boolean,
    suggestions: DiseaseSuggestion[]
}

type Suggestion = {
    probability: number,
    scientificName: string,
    description: string,
}

type PlantSuggestion = Suggestion & {
    commonNames: string[],
    confirmed: boolean,
    wikiUrl: string,
    imageUrl: string,
    taxonomy: Taxonomy
}

type Taxonomy = {
    class: string,
    genus: string,
    order: string,
    family: string,
    phylum: string,
    kingdom: string
}

type DiseaseSuggestion = Suggestion & {
    name: string,
    treatment: Treatment,
}

type Treatment = {
    chemical: string[],
    biological: string[],
    prevention: string[]
}

type Favourite = {
    plantId: number,
    favouriteId: number
}

type FavouriteResponse = {
    createdAt: string,
    favPlants: FavPlant[]
}
type FavPlant = {
    plantId: number,
    createdAt: string,
    plant: {
        id: string,
        name: string,
        imageUrl: string
    }
}


type TComment = DBItem & {
    entityType: 'plant' | 'disease' | 'pest',
    userId: string,
    commentBody: string,
    entityId: number,
    createdAt: string,
    user: {
        username: string,
        email: string,
        imgUrl: string
    }
}

type CropsRecommendedInput = {
    N: number,
    P: number,
    K: number,
    month: string,
    ph: number,
    city: string
}

type CropsRecommended = {
    recommended_crops: Crop[]
}

type Crop = {
    crop: string,
    probability: number
}

type ArticleTopic = DBItem & {
    name: string,
    addedOn: string
}