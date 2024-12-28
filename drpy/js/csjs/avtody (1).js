var rule = {
    title: 'avtoday',
    host: 'https://avtoday.io/',
    url: 'https://avtoday.io/catalog/fyclass?fypage=*',
    searchUrl: 'https://avtoday.io/search?s=**',
    class_name: '无码&制服&丝袜&萝莉&多人&长腿',
    class_url: '无码&制服&丝袜&萝莉&多人&长腿',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'MOBILE_UA'
    },
    play_parse: true,
    lazy: `js:
        let kcode = jsp.pdfh(request(input).match(/<iframe(.*?)<\/iframe>/)[1]);
        let kurl = kcode.match(/url=(.*?)"/)[1];
        
        if (/m3u8|mp4/.test(kurl)) {
            input = { jx: 0, parse: 0, url: kurl };
        } else {
            input = { jx: 0, parse: 1, url: rule.parse_url + kurl };
        }
    `,
    limit: 6,
    推荐: '.swiper;a;h2&&Text;img&&src;;a:eq(0)&&href',
    double: true,
    一级: '.album&&.thumbnail;.video-title&&a&&Text;.video-cover&&src;;a:eq(0)&&href',
    二级: '*',
    搜索: '*'
};