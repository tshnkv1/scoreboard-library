import { Match } from "./types";

class ScoreBoard {
    private matches: Match[];

    constructor() {
        this.matches = [];
    }

    public startMatch(homeTeam: string, awayTeam: string): string {
        const match: Match = {
            id: crypto.randomUUID(),
            homeTeam,
            awayTeam,
            homeScore: 0,
            awayScore: 0,
            startTime: new Date(),
        };
        this.matches.push(match);
        return match.id;
    };

    private findMatch(id: string): Match | undefined {
        return this.matches.find(match => match.id === id);
    }

    public updateScore(id: string, homeScore: number, awayScore: number): void {
        const match = this.findMatch(id);

        if(!match) {
            throw new Error('Match not found!');
        }

        match.homeScore = homeScore;
        match.awayScore = awayScore;
    }

    public finishMatch(id: string): void {
        this.matches = this.matches.filter(match => match.id !== id);
    }

    public getSummary(): string[] {
        return this.matches
        .sort((a, b) => {
            const aMatchTotalScore = a.homeScore + a.awayScore;
            const bMatchTotalScore = b.homeScore + b.awayScore;

            return bMatchTotalScore === aMatchTotalScore
                ? b.startTime.getTime() - a.startTime.getTime()
                : bMatchTotalScore - aMatchTotalScore
            }
        )
        .map(({homeTeam, awayTeam, homeScore, awayScore}, index) => 
            `${index + 1}. ${homeTeam} ${homeScore} - ${awayScore} ${awayTeam}`);
    }
}

export default ScoreBoard;
