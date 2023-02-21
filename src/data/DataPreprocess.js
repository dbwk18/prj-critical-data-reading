import toydata2 from './toydata2.json'

const highlight = []
toydata2.sentences.forEach((item) => highlight.push(item.sentence))

const highlightRef = {}
toydata2.sentences.forEach((item) => {
    const reflist = []
    // console.log("toy", item)
    item.data_references.forEach((ref) => reflist.push(ref.sentence_part))
    highlightRef[item.sentence] = reflist
})

const highlightColor = {}
toydata2.sentences.forEach((item) => {
    const coldict = {}
    highlightRef[item.sentence].forEach((ref) => coldict[ref] = "dataref")
    highlightColor[item.sentence] = coldict
})

// console.log(highlightRef, highlightColor)
// console.log(highlightRef["The pressures that have kept inflation elevated for months remain strong, fresh data released Wednesday showed, a challenge for households that are trying to shoulder rising expenses and for the White House and Federal Reserve as they try to put the economy on a steadier path."], highlightColor["The pressures that have kept inflation elevated for months remain strong, fresh data released Wednesday showed, a challenge for households that are trying to shoulder rising expenses and for the White House and Federal Reserve as they try to put the economy on a steadier path."])

export { highlight, highlightRef, highlightColor };

