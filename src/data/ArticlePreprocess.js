import axios from 'axios'
import cpiarticle from './cpi_article.json'
import text_req from './article_extract_test_req.json'

/**
 * fetch article data 
 */
const cpi_article = 
    cpiarticle.paragraphs.map((item) => {
        var paragraph = ""
        item.forEach((sentence) => paragraph += sentence)
        return paragraph
    })

console.log("article list", cpi_article)

const process_article = axios.post(`http://internal.kixlab.org:7887/process_article`, 
        // {
        //     "image_base64": "", //Base64_encoded main visualization
        //     "paragraphs": cpi_article, // List of paragraphs in text
        //     "article_title": "1234567", // Title of the article
        //     "url": "http://1234567", // URL of the article (used as an identifier)
        //     "publish_date": "2021-07-28T00:00:00.000Z" // Publish date of the article
        // },
        text_req,
        {
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            }
        }
        ).then( (res) => {
            console.log(res.data)
            return res.data
        })  



console.log("article", process_article)

export { cpi_article, process_article };