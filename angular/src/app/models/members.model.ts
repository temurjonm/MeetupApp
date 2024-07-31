import { IPhoto } from "./photo.model"

export interface IMember {
    id: number
    username: string
    age: number
    knownAs: string
    created: string
    lastActive: string
    gender: string
    introduction: any
    interests: string;
    lookingFor: string
    city: string
    country: string
    photoUrl: string
    photos: IPhoto[]
  }
  
  