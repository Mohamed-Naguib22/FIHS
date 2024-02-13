interface DBItem {
    id: number,
}

interface HasImage extends DBItem {
    imgUrl: string,
    imageURL: string,
}

interface WithTitle extends DBItem {
    title: string,

}

interface ArticleItem extends HasImage, WithTitle {
    author: string,
    publicationDate: string,
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
    articleSections: WithTitle &{ content: string, articleId: number }[],
    articleTags: DBItem &{ tag: string, articleId: number }[],
    similarArticles: Article[]
}

type Fertilizer =  AgroCare &{
    nutrientContent: string
}

type Pesticide = AgroCare &{
    description: string,
    toxicity: string,
    type: string
}

type GPT_Response = {
    answer: string
}

type WeatherStatus = {
    city: string,
    description: string,
    temperature: string,
    pressure: string,
    humidity: string,
    windSpeed: string
}