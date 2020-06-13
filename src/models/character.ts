import mongoose from 'mongoose'
export const Schema = mongoose.Schema
export const ObjectId = mongoose.SchemaTypes.ObjectId
export const Mixed = mongoose.SchemaTypes.Mixed

export interface ICharacterModel extends mongoose.Document {
    name: string;
    banner: string;
    releaseStatus: boolean;
    facepic: string;
    type: ITypeList;
    energyGain: Array<Number>;
    hitPoints: Number;
    description: String;
    skills: Array<ISkill>
}

interface ISkill {
    banner: string;
    name: string;
    skillpic: string;
    type: ITypeList;
    startCooldown: Number;
    baseCooldown: Number;
    class: String;
    cost:Array<Number>;
    description: String;
    disabled: boolean;
    energyGain: Array<Number>;
    limit?:Number 
} 

interface ITypeList {
    normal?: boolean;
    fire?: boolean;
    fighting?: boolean;
    water?: boolean;
    flying?: boolean;
    grass?: boolean;
    poison?: boolean;
    electric?: boolean;
    ground?: boolean;
    psychic?: boolean;
    rock?: boolean;
    ice?: boolean;
    bug?: boolean;
    dragon?: boolean;
    ghost?: boolean;
    dark?: boolean;
    steel?: boolean;
    fairy?: boolean;    
}

const schema = new Schema({
    "name": {
        "type": String
    },
    "banner": String,
    "releaseStatus": Boolean,
    "facepic": {
        "type": String
    },
    "type": {},
    "energyGain": [],
    "hitPoints": {
        "type": Number
    },
    "description": {
        "type": String
    },
    "skills": {
        "type": [
            Schema.Types.Mixed
        ]
    }
})

export const CharacterDB = mongoose.model<ICharacterModel>('character', schema)

