export const Info = ({gameId, tries}:{gameId:string, tries: number}) => {
    return (
        <div className="info">
            <p className="gameId">
                Игра: {gameId}
            </p>
            <p className="tries">
                Попыток: {tries}
            </p>
        </div>
    );
};
