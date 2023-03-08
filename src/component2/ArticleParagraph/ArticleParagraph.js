import React from "react";
import HighlightText from "../HighlightText/HighlightText";

function ArticleParagraph ({ paragraph, highlight, highlightColor, highlightRef, clickhighlight, newrefSentence }) {


    return(
        <div className="g-body">
            {paragraph.map((sentence, idx) => {
                // console.log(idx, sentence, highlightRef[sentence], highlightColor[sentence])
                if (highlight.includes(sentence)) {
                    return (
                        HighlightText(sentence, highlightRef[sentence], highlightColor[sentence], highlight, clickhighlight, newrefSentence)
                    )
                }
                else {
                    return (
                        `${sentence}&nbsp;`
                    )
                }
                
            })}
        </div>
    )
}

export default ArticleParagraph;