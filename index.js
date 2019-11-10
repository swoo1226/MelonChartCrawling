const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
const XLSX = require('xlsx');
const getHtml = async () => {
    try {
        return await axios.get("https://www.melon.com/chart/index.htm");
    } catch (error) {
        console.error(error);
    }
};
const _export = function (records, opts) {
    let fileName = opts + '.xlsx';
    let workSheet = XLSX.utils.json_to_sheet(records);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, workSheet, '멜론Top100');

    let bin = XLSX.writeFile(wb, fileName);
    return bin;
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
            ulList[key] = {순위 : key, title, singer};
        })
        return ulList;
    })
    .then(res => res)
    .then(list => _export(list, '멜론Top100'));


    