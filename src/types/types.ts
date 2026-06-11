export interface IPet {
    id: string,
    nickname: string,
    category: string,
    birthday: string,
    gender: string,
    image: string,
}

export interface IImage {
    id: string;
    image: string;
    number: number;
}

export interface IPetDetails {
    id: string,
    nickname: string,
    category: string,
    size: number,
    character: string,
    birthday: string,
    gender: string,
    wool: string,
    for_family: boolean,
    for_dogs: boolean,
    for_cats: boolean,
    is_guest: boolean,
    description: string,
    curator_id: string,
    created_at: string,
    images: IImage[]
}

export interface IMessenger {
    id: string,
    messenger: string,
    nickname: string,
}

export interface ICurator {
    id: string,
    last_name: string,
    first_name: string,
    description: string,
    image: string,
    phone_number: string,
    messengers: IMessenger[]
}

export interface IRequest {
    id: string,
    status: string,
    name: string,
    contact: string,
    by_phone: boolean,
    on_messenger: boolean,
    comment?: string,
    pet_id?: string,
    pet_nickname: string,
}

export interface ICreateRequest {
    name: string,
    contact: string,
    by_phone: boolean,
    on_messenger: boolean,
    comment?: string,
    pet_id?: string,
}