import {FormEventHandler, useState} from "react";

export const Input = ({onEnter}:{onEnter: (val:string)=>void}) => {
    const [inputValue, setInputValue] = useState("");

    const onSubmit : FormEventHandler= (e)=>{
        console.log(inputValue);
        onEnter(inputValue);
        setInputValue("");
        e.preventDefault();
    }

    return (
        <div className="main_input">
            <form action="" onSubmit={onSubmit}>
                <input
                    className="main_input"
                    placeholder="введите слово"
                    value={inputValue}
                    onChange={(e)=>setInputValue(e.target.value)}
                />
            </form>
        </div>
    );
};
