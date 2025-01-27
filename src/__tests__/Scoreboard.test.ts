import ScoreBoard from '../Scoreboard';


describe('ScoreBoard', () => {
    let scoreBoard: ScoreBoard;
    let mockUuidCounter = 0;

    beforeEach(() => {
        scoreBoard = new ScoreBoard();

        jest.spyOn(global.crypto, 'randomUUID').mockImplementation(() => {
            mockUuidCounter += 1;
            return `00000000-0000-0000-0000-00000000000${mockUuidCounter}`;
        });

        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-01-01T12:00:00Z'));
    });

    it('WHEN we start the match THEN id of the created match is returned', () => {
        // WHEN
        const matchId = scoreBoard.startMatch('Team A', 'Team B');

        // THEN
        expect(matchId).toBe('00000000-0000-0000-0000-000000000001');
    });

    it('WHEN we update the match score THEN the score data is changed', () => {
        // WHEN
        const matchId = scoreBoard.startMatch('Team A', 'Team B');
        scoreBoard.updateScore(matchId, 3, 2);
    
        // THEN
        const summary = scoreBoard.getSummary();
        expect(summary).toContain('1. Team A 3 - 2 Team B');
    });

    it('WHEN the score of a non-existing match is updated THEN an error is returned', () => {
        expect(() => scoreBoard.updateScore('invalid-id', 3, 2)).toThrow('Match not found!');
    });

    it('WHEN there are existing matches and we output summary THEN the value for existing matches is output', () => {
        // WHEN
        const matchId = scoreBoard.startMatch('Team A', 'Team B');
        scoreBoard.finishMatch(matchId);
    
        // THEN
        const summary = scoreBoard.getSummary();
        expect(summary).toHaveLength(0);
    });

    it('WHEN there are several current matches in the output THEN the later match is displayed first in the list', () => {
        // GIVEN
        const match1 = scoreBoard.startMatch('Team A', 'Team B');

        jest.setSystemTime(new Date('2025-01-01T12:30:00Z'));
        const match2 = scoreBoard.startMatch('Team C', 'Team D');
    
        // WHEN
        scoreBoard.updateScore(match1, 2, 2);
        scoreBoard.updateScore(match2, 3, 1);
    
        // THEN
        const summary = scoreBoard.getSummary();
        expect(summary[0]).toBe('1. Team C 3 - 1 Team D');
        expect(summary[1]).toBe('2. Team A 2 - 2 Team B');
    });
    
})