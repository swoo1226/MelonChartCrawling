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
        console.log($)
        $('tr').each(function(key, val) {
            let title = $(this).find('td div.wrap div.wrap_song_info div.ellipsis.rank01 span a').text()
            let singer = $(this).find('td div.wrap div.wrap_song_info div.ellipsis.rank02 span a').text()
            console.log(key, title + ': ' + singer)
        })
        return ulList;
    })
    .then(res => log(res));