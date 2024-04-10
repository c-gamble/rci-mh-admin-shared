export type Provider = {
    _id: string,
    name: string,
    imageURL: string,
    bio: string,
    website: string,
    zipcode: string,
    phone: string,
    email: string,
    tags: string[],
    hidden: boolean, // defaults to false 
    selected: boolean // defaults to true
}