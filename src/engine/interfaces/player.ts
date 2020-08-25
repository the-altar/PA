export interface iPlayer {
    username: string,
    avatar: string,
    id: string,
    elo: number,
    wins: number,
    losses: number,
    streak: number,
    isTurn: boolean,
    rank: string
}