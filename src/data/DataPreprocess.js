import toydata2 from './article_extract_text_results.json'


const highlight = []
toydata2.sentences.forEach((item) => highlight.push(item.sentence))

/*
{
    "sentence" : ["dataref1", "dataref2", "dataref3"]
}
*/
const highlightRef = {}
toydata2.sentences.forEach((item) => {
    const reflist = []
    // console.log("toy", item)
    item.data_references.forEach((ref) => reflist.push(ref.sentence_part))
    highlightRef[item.sentence] = reflist
})


/*
{ 
    "sentence": {
        "dataref1": dataref,
        "dataref2": dataref,
        ...
        "timeref1": timeref
    }
}
*/
const highlightColor = {}
toydata2.sentences.forEach((item) => {
    const coldict = {}
    highlightRef[item.sentence].forEach((ref) => coldict[ref] = "dataref")
    highlightColor[item.sentence] = coldict
})


/*
{ 
    "sentence": {
        "dataref1": [
            {name: "datasetname1", id: "id1"}, 
            {name: "datasetname2", id: "id2"}, 
            {name: "datasetname3", id: "id3"}
        ],
        "dataref2": [
            {name: "datasetname1", id: "id1"}, 
            {name: "datasetname2", id: "id2"}, 
            {name: "datasetname3", id: "id3"}
        ],
    }
}
*/
const highlightData = {}
toydata2.sentences.forEach((item) => {
    const datadict = {}
    item.data_references.forEach((ref) => {
        const datasetlist= []
        ref.data_names.forEach((data) => {datasetlist.push({"name": `${data.title} (${data.frequency}) (${data.units})`, "id": `${data.id}`})})
        datadict[ref.sentence_part] = datasetlist
    })
    highlightData[item.sentence] = datadict
})


export { highlight, highlightRef, highlightColor, highlightData };

