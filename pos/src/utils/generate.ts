


export function generateId(chars : string, len : number): string {
    const idLength = len;
    const characters: string = chars;
    let id: string = "";
    for (let i = 0; i < idLength; i++) {
        const index = Math.floor(Math.random() * characters.length);
        id += characters[index];
    }
    return id;
}