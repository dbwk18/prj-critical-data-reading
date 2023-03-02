import React, {useState} from "react";
import './HighlightText.css'

function HighlightText (text, textToMatch, colorToMatch, highlight, clickhighlight) {
    const matchRegex = RegExp(textToMatch.join("|"), "ig");
    const matches = [...text.matchAll(matchRegex)];

    const [hover, setHover] = useState(false);


    return (
        textToMatch.length > 0 
        ? (
            <>
                {text.split(matchRegex).map((nonBoldText, index, arr) => (
                <span 
                    key={index}
                    className={ hover && highlight.includes(text.trim()) ? 'underline-highlight' : ''}
                    onClick={(e)=>clickhighlight(e, text)}
                    onMouseEnter={()=>setHover(true)}
                    onMouseLeave={()=>setHover(false)}
                    >
                        {nonBoldText}
                        {index + 1 !== arr.length && (
                            <mark class={hover ? colorToMatch[matches[index]] : null}>{matches[index]}</mark>
                        )}
                </span>
                ))}
                &nbsp;
            </>
            )
        : (
            <span
                className={ hover && highlight.includes(text.trim()) ? 'underline-highlight' : ''}
                onMouseEnter={()=>setHover(true)}
                onMouseLeave={()=>setHover(false)}
            >
                {text}&nbsp;
            </span>
        )
    )   
};
  
export default HighlightText;