import dots from "../assets/dots.svg"
import {useCallback} from "react";
export const Header = ({setChannels}:{setChannels: React.Dispatch<React.SetStateAction<string[]>>}) => {
    const dotsCallback = useCallback(()=>{
        const nick = prompt("Ник на твитче:")
        if(nick !== null){
            setChannels([nick])
        }
    },[setChannels])
    return (
        <>
            <div className="header">
                <button className="settings nondisp"><img src={dots} alt=""/></button>
                <p className={"title"}>КОНТЕКСТНО+</p>
                <button className="settings" onClick={dotsCallback}>
                    <img src={dots} alt=""/>
                </button>
            </div>
        </>
    );
};
