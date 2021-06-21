import { createContext, ReactNode, useState } from "react";

interface Property {
    id: string;
    name: string;
    dtype: string;
    adress: string;
    area_property: number;
    city: string;
    cod_address: string;
    description: string;
    neighborhood: string;
    number: number;
    price: number;
    state: string;
    block: string;
    rooms: number;
}

interface SearchContextData{
    search:string;
    searchUpdate:(param:string)=>void;
    properties:Property[];
    propertiesBackup:Property[];
    propertiesUpdate:(properties:Property[])=>void;
    propertiesSetBackup:(properties:Property[])=>void;
}


export const SearchContext = createContext({} as SearchContextData)

interface SearchProviderProps{
    children:ReactNode;
}

export function SearchProvider({children}:SearchProviderProps){
    const [search, setSearch] = useState('property');
    const [properties, setProperties] = useState<Property[]>([]);
    const [propertiesBackup, setPropertiesBackup] = useState<Property[]>([]);
    function searchUpdate(param:string){
        setSearch(param);
    }
    function propertiesUpdate(properties:Property[]){
        setProperties(properties)
    }
    function propertiesSetBackup(properties:Property[]){
        setPropertiesBackup(properties)
    }
    return (
        <SearchContext.Provider value={{
            search,
            searchUpdate,
            properties,
            propertiesBackup,
            propertiesUpdate,
            propertiesSetBackup
        }}>
            {children}
        </SearchContext.Provider>
    )
}
