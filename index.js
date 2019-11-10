const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
    try {
        return await axios.get("https://www.melon.com/chart/index.htm");
    } catch (error) {
        console.error(error);
    }
};

getHtml()
    .then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("tr.lst50").children("div.wrap_song_info");
        console.log($bodyList);
        $bodyList.each(function(i, elem) {
            ulList[i] = {
                title: $(this).find('div.ellipsis rank01').text(),
                singer: $(this).find('div.ellipsis rank02').text()
            };
        });

        const data = ulList.filter(n => n.title);
        return data;
    })
    .then(res => log(res));