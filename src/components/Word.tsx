import {IWord} from "../interfaces/IWord.js";

export const Word = ({word}:{word:IWord}) => {
    let width = 100 - (word.rank/10);
    if (width < 0) width = 1;
    return (
        <div className="word">
            <div className="color_progress" style={{width:width+"%"}}></div>
            <span className="z-three">{word.word}</span><span className="z-three">{word.rank}</span>
        </div>
    );
};
