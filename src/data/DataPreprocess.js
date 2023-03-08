import toydata2 from './article_extract_text_results.json'

export const getHighlight = (data) => {
    const highlight = []
    data.sentences.forEach((item) => highlight.push(item.sentence))

    return highlight
}

/* for highlighting exact text ref in article
{
    "sentence" : ["dataref1", "dataref2", "dataref3"]
}
*/
export const getHighlightRef = (data) => {
    const highlightRef = {}
    data.sentences.forEach((item) => {
        const reflist = []
        // console.log("toy", item)
        item.data_references.forEach((ref) => reflist.push(ref.sentence_part))
        highlightRef[item.sentence] = reflist
    })

    return highlightRef

}

/* for listing dropdown in interactive chart
{
    "sentence" : ["gpt-dataref1", "gpt-dataref2", "gpt-dataref3"]
}
*/
export const getHighlightGPTRef = (data) => {
    const highlightGPTRef = {}
    data.sentences.forEach((item) => {
        const reflist = []
        // console.log("toy", item)
        item.data_references.forEach((ref) => reflist.push(ref.gpt_sentence_part))
        highlightGPTRef[item.sentence] = reflist
    })

    return highlightGPTRef
}

/* for highlighting exact text in article - distinguish color
{ 
    "sentence": {
        "dataref1": dataref,
        "dataref2": dataref,
        ...
        "timeref1": timeref
    }
}
*/
export const getHighlightColor = (data) => {
    const highlightColor = {}
    const highlightRef = getHighlightRef(data)
    data.sentences.forEach((item) => {
        const coldict = {}
        highlightRef[item.sentence].forEach((ref) => coldict[ref] = "dataref")
        highlightColor[item.sentence] = coldict
    })

    return highlightColor
}

/* for listing dropdown & draw chart
{ 
    "sentence": {
        "gptdataref1": [
            {name: "datasetname1", id: "id1"}, 
            {name: "datasetname2", id: "id2"}, 
            {name: "datasetname3", id: "id3"}
        ],
        "gptdataref2": [
            {name: "datasetname1", id: "id1"}, 
            {name: "datasetname2", id: "id2"}, 
            {name: "datasetname3", id: "id3"}
        ],
    }
}
*/
export const getHighlightData = (data) => {
    const highlightData = {}
    data.sentences.forEach((item) => {
        const datadict = {}
        item.data_references.forEach((ref) => {
            const datasetlist= []
            ref.data_names.forEach((data) => {datasetlist.push({"name": `${data.title} (${data.frequency}) (${data.units})`, "id": `${data.id}`, "frequency": `${data.frequency}`, "units": `${data.units}`})})
            datadict[ref.gpt_sentence_part] = datasetlist
        })
        highlightData[item.sentence] = datadict
    })

    return highlightData
}

// const highlight = []
// toydata2.sentences.forEach((item) => highlight.push(item.sentence))


// const highlightRef = {}
// toydata2.sentences.forEach((item) => {
//     const reflist = []
//     // console.log("toy", item)
//     item.data_references.forEach((ref) => reflist.push(ref.sentence_part))
//     highlightRef[item.sentence] = reflist
// })


// const highlightGPTRef = {}
// toydata2.sentences.forEach((item) => {
//     const reflist = []
//     // console.log("toy", item)
//     item.data_references.forEach((ref) => reflist.push(ref.gpt_sentence_part))
//     highlightGPTRef[item.sentence] = reflist
// })


// const highlightColor = {}
// toydata2.sentences.forEach((item) => {
//     const coldict = {}
//     highlightRef[item.sentence].forEach((ref) => coldict[ref] = "dataref")
//     highlightColor[item.sentence] = coldict
// })

// const highlightData = {}
// toydata2.sentences.forEach((item) => {
//     const datadict = {}
//     item.data_references.forEach((ref) => {
//         const datasetlist= []
//         ref.data_names.forEach((data) => {datasetlist.push({"name": `${data.title} (${data.frequency}) (${data.units})`, "id": `${data.id}`, "frequency": `${data.frequency}`, "units": `${data.units}`})})
//         datadict[ref.gpt_sentence_part] = datasetlist
//     })
//     highlightData[item.sentence] = datadict
// })


// export { highlight, highlightRef, highlightGPTRef, highlightColor, highlightData };

