import {IWord} from "../interfaces/IWord.js";
import {Word} from "./Word.js";

export const Words = ({words}:{words:IWord[]}) => {
    return (
        <div className="words">
            {words && words.map(el => {
                return <Word word={el} key={el.rank}/>
            })}
        </div>
    );
};
