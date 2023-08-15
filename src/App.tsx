import tmi from "tmi.js"

import './App.css'

import {Header} from "./components/Header.js";
import {TipButton} from "./components/TipButton.js";
import {useCallback, useEffect, useState} from "react";
import {Info} from "./components/Info.js";
import {Input} from "./components/Input.js";
import {Guide} from "./components/Guide.js";
import {IWord} from "./interfaces/IWord.js";
import {Words} from "./components/Words.js";
import {Completed} from "./components/Completed.js";

interface Challange {
    id?: string;
    name?: string;
    type?: string;
}


function App() {
    const [channels, setChannels] = useState<string[]>([]);
    const [client, setClient] = useState(new tmi.Client({channels: []}));

    const [completed, setCompleted] = useState<boolean>(false);
    const [tries, setTries] = useState<number>(0);
    const [words, setWords] = useState<IWord[]>([]);
    const [winner, setWinner] = useState<string>("");

    const [challengeId, setChallengeId] = useState<string>("");
    const [challenge, setChallenge] = useState<Challange>({});


    const updateChallenge = () => {
        if (challengeId !== "") {
            fetch("/api/get_challenge_info?challenge_id=" + challengeId)
                .then(r => r.json())
                .then(r => setChallenge(r))
                .then(() => fetch(
                    "/api/get_history?challenge_id=" + challengeId +
                    "&user_id=" + localStorage.token))
                .then(r => r.json())
                .then(r => {
                    setWords(r.words);
                    setTries(r.tries);
                    setCompleted(r.completed);
                })
        }
    }



    const addWord = useCallback(
        (val: string, chatter: string = "") => {
            if (challenge.id && localStorage.token && challenge.type){
                fetch("/api/get_score?challenge_id=" + challenge.id +
                    "&user_id=" + localStorage.token +
                    "&challenge_type=" + challenge.type + encodeURI("&word=" + val))
                    .then(r => r.json())
                    .then(r => {
                        if (r.completed === true) {
                            setCompleted(r.completed);
                            setWinner(chatter)
                        }
                        if (r.error === false) {
                            setTries(l => l + 1);
                            setWords(l => [...l, {word: r.word, rank: r.rank}].sort((a, b) => a.rank - b.rank));
                        } else {
                            console.error(r.details);
                        }
                    });
            }
        },
        [challenge, challengeId],
    );


    useEffect(() => {
        if(channels.length > 0){
            setClient(new tmi.Client({channels}))
        }
    }, [channels]);

    useEffect(() => {
        console.log("Вроде бы, первый рендер");
        (async () => {
            if (localStorage.token === undefined) {
                const initialize_session = await fetch("/api/initialize_session")
                    .then(r => r.json())
                localStorage.token = initialize_session.token
            }

            const last_challenge = await fetch("/api/get_last_challenge")
                .then(r => r.json())
            setChallengeId(last_challenge.id)
            updateChallenge()

        })();
    }, []);

    useEffect(() => {
        console.log("Рендер 2")
        client.connect();
        if (Object.keys(challenge).length == 3) {
            client.on('message', (channel, tags, message) => {
                console.log(`${tags['display-name']}: ${message}`, challenge);
                addWord(message, tags['display-name'])
            });
        }

        return () => {
            client.disconnect()
            console.log("Убийство хука")
        };
    }, [addWord, challenge, client]);

    useEffect(() => {
        updateChallenge();
    }, [challengeId]);


    return (
        <div className="container">
            <Header setChannels={setChannels}/>
            {completed && <Completed gameId={challenge.name as string} tries={tries} winner={winner}/>}
            <TipButton/>
            <Info gameId={challenge.name as string} tries={tries}/>
            <Input onEnter={(val: string) => {
                addWord(val, "")
            }}/>
            {tries <= 0 && <Guide/>}
            {tries > 0 && <Words words={words}/>}
        </div>
    )
}

export default App
