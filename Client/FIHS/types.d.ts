interface DBItem {
    id: number,
}

interface HasImage extends DBItem {
    imgUrl: string,
}

interface WithTitle extends DBItem {
    title: string,

}

interface ArticleItem extends HasImage, WithTitle {
    author: string,
}

interface AgroCare extends HasImage {
    name: string,
    price: number,
    usageInstructions: string,
    manufactuer: string,
}

type Article = ArticleItem & {
    overview: string,
    numOfLikes: number,
}

type ArticleByID = Article & {
    publicationDate: string,
    liked: boolean,
    articleSections: (WithTitle & { content: string, articleId: number })[],
    articleTags: (DBItem & { tag: string, articleId: number })[],
    similarArticles: Article[]
}

type Fertilizer = AgroCare & {
    nutrientContent: string
}

type Pesticide = AgroCare & {
    description: string,
    toxicity: string,
    type: string,
    imageUrl: string
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
    FavouriteId: number
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
    harvistingSeason: string,
    culivationTips: string,
    imageUrl: string
}

type FullPlant = Plant & {
    color: string,
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
    lifeCycle: string
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

type TComment = DBItem & {
    EntityType: 'plant' | 'disease' | 'pest',
    CommentBody: string,
    EntityId: number,
    CreatedAt: string,
    user: {
        username: string,
        imgUrl: string
    }
}
