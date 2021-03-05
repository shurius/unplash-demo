export const LAST_SEARCH = "LAST_SEARCH";

export interface LastSearch {
    type: typeof LAST_SEARCH
    name: string
}

export const lastSearch = (name: string) => {
    return {type: LAST_SEARCH, name}
};
