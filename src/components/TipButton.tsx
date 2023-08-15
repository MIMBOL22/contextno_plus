import light from "../assets/light.svg"
export const TipButton = () => {
    return (
        <>
            <div className="tip">
                <button className="tip" onClick={()=>{alert("Не всё так просто")}}>
                    <img src={light} alt=""/>
                </button>
            </div>
        </>
    );
};
