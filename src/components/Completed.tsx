interface ICompletedProps {
    gameId: string;
    tries: number;
    winner: string;
}


export const Completed = ({gameId, tries, winner}:ICompletedProps) => {
    const num_word = (num_value : number, words : string[]) => {
        const value = Math.abs(num_value) % 100;
        const num = value % 10;
        if(value > 10 && value < 20) return words[2];
        if(num > 1 && num < 5) return words[1];
        if(num == 1) return words[0];
        return words[2];
    } // snipp.ru, спасибо
    const triesWord = ["попытку","попытки","попыток"];
    return (
        <div className="completed">
            <p className="completed_congr">Поздравляем!</p>
            <p className="completed_first">
                {winner === "" && "Вы угадали слово "}
                {winner !== "" && winner+" угадал(-а) слово "}
                <strong>{gameId}</strong>
            </p>
            <p className="completed_second">Чат произвёл <strong>{tries}</strong> {num_word(tries,triesWord)}</p>
        </div>
    );
};
