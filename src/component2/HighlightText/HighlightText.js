import React, {useState} from "react";
import './HighlightText.css'

function HighlightText (text, highlight, textToMatch, colorToMatch, clickhighlight, newrefSentence) {
    
    // const textToMatch = JSON.parse(window.sessionStorage.getItem("user-highlight-ref"))[text]
    // const colorToMatch = JSON.parse(window.sessionStorage.getItem("user-highlight-color"))[text]

    const matchRegex = RegExp(textToMatch.join("|"), "ig");
    const matches = [...text.matchAll(matchRegex)];


    const [hover, setHover] = useState(false);
    // console.log("newref", newrefSentence)
    console.log("hmm", text, textToMatch, colorToMatch)
    const keySubstr = text.substring(0, 10)
    return (
        textToMatch.length > 0 
        ? (
            <>
                {text.split(matchRegex).map((nonBoldText, index, arr) => (
                <>
                    <span 
                        key={`${keySubstr}-${index}-nonbold`}
                        className={ 
                            hover && highlight.includes(text.trim()) 
                            ? 'underline-highlight' 
                            : (
                                newrefSentence === text.trim() && highlight.includes(text.trim()) 
                                ? 'bold-highlight'
                                : ''
                            )
                        }
                        onClick={(e)=>clickhighlight(e, text)}
                        onMouseEnter={()=>setHover(true)}
                        onMouseLeave={()=>setHover(false)}
                    >
                        {nonBoldText}
                    </span>
                    <span
                        key={`${keySubstr}-${index}-bold`}
                        className={ 
                            hover && highlight.includes(text.trim()) 
                            ? 'underline-highlight' 
                            : (
                                newrefSentence === text.trim() && highlight.includes(text.trim()) 
                                ? 'bold-highlight'
                                : ''
                            )
                        }
                        onClick={(e)=>clickhighlight(e, text)}
                        onMouseEnter={()=>setHover(true)}
                        onMouseLeave={()=>setHover(false)}
                    >
                        {index + 1 !== arr.length && (
                            <mark class={hover || newrefSentence === text.trim() ? colorToMatch[matches[index]] : null}>{matches[index]}</mark>
                        )}
                    </span>
                </>
                )
                )}
                &nbsp;
            </>
            )
        : (
            <span
                className={ 
                    hover && highlight.includes(text.trim()) 
                    ? 'underline-highlight' 
                    : (
                        newrefSentence == text.trim()
                        ? 'bold-highlight'
                        : ''
                    )
                }
                onMouseEnter={()=>setHover(true)}
                onMouseLeave={()=>setHover(false)}
            >
                {text}&nbsp;
            </span>
        )
    )   
};
  
export default HighlightText;