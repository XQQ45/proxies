// ==UserScript==
// @name         XOJAV
// @namespace    gmspider	Mengxin
// @version      2025.4.6
// @description  XOJAV GMSpider
// @author       Luomo
// @match        https://xojav.tv/*
// @require      https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.slim.min.js
// @grant        unsafeWindow
// ==/UserScript==
console.log(JSON.stringify(GM_info));
(function () {
    const GMSpiderArgs = {};
    if (typeof GmSpiderInject !== 'undefined') {
        let args = JSON.parse(GmSpiderInject.GetSpiderArgs());
        GMSpiderArgs.fName = args.shift();
        GMSpiderArgs.fArgs = args;
    } else {
        GMSpiderArgs.fName = "searchContent";
        GMSpiderArgs.fArgs = [["ssni-748"]];
    }
    Object.freeze(GMSpiderArgs);
    const GmSpider = (function () {
        function listVideos(select) {
            let vods = [];
            $(select).each(function () {
                const remarks = [
                    "👁️" + $(this).find(".card-video__stats .num:first").text().trim(),
                    "❤️" + $(this).find(".card-video__fav-button .num").text().trim()
                ];
                const url = new URL($(this).find(".card-video__title a").attr("href"));
                vods.push({
                    vod_id: url.pathname.split('/').at(2).toUpperCase(),
                    vod_name: $(this).find(".card-video__img img").attr("alt"),
                    vod_pic: $(this).find(".card-video__img img").data("src"),
                    vod_remarks: remarks.join(" "),
                    vod_year: $(this).find(".card-video__duration").text().trim()
                })
            })
            return vods;
        }

        return {
            homeContent: function (filter) {
                let result = {
                    class: [
                        {type_id: "latest-updates?sort_by=release_at", type_name: "最近更新"},
						{type_id: "stars?sort_by=stars", type_name: "近期最佳"},
						{type_id: "hot?sort_by=views", type_name: "热门"},
						{type_id: "categories/chinese-subtitle?sort_by=release_at", type_name: "中文字幕"},
						{type_id: "categories/jav?sort_by=release_at", type_name: "日本AV"},
						{type_id: "categories/uncensored?sort_by=release_at", type_name: "无码破解"},
                        {type_id: "categories/taiwan-av?sort_by=release_at", type_name: "台湾AV"},
						{type_id: "categories/roleplay?sort_by=release_at", type_name: "角色剧情"},
						{type_id: "categories/uniform?sort_by=release_at", type_name: "制服诱惑"},
						{type_id: "categories/pantyhose?sort_by=release_at", type_name: "丝袜"},
						{type_id: "categories/sex-only?sort_by=release_at", type_name: "直接开啪"},
						{type_id: "categories/groupsex?sort_by=release_at", type_name: "多人群交"},
						{type_id: "categories/bdsm?sort_by=release_at", type_name: "主奴调教"},
						{type_id: "categories/r__e?sort_by=release_at", type_name: "强奸"},
						{type_id: "categories/pov?sort_by=release_at", type_name: "第一视角"},
						{type_id: "categories/hixxen-cam?sort_by=release_at", type_name: "流出"}],
                    filters: {
                        "categories/taiwan-av?sort_by=release_at": [{
                            key: "sort_by",
                            name: "排序",
                            value: [
                                {n: "近期最佳", v: "&sort_by=stars"},
                                {n: "观看数", v: "&sort_by=views"},
                                {n: "最近更新", v: "&sort_by=release_at"}
                            ]
                        }],
                        "categories?": [{
                            key: "sort_by",
                            name: "排序",
                            value: [
                                {n: "近期最佳", v: "&sort_by=stars"},
                                {n: "观看数", v: "&sort_by=views"},
                                {n: "最近更新", v: "&sort_by=release_at"},
                            ]
                        }]
                    },
                    list: []
                };
                let itemList = listVideos(".card-video");
                result.list = itemList.filter((item, index) => {
                    return itemList.findIndex(i => i.vod_id === item.vod_id) === index
                });
                return result;
            },
            categoryContent: function (tid, pg, filter, extend) {
                let result = {
                    list: [],
                    pagecount: 1
                };
                if (tid === "categories?") {
                    $(".padding-bottom-xl").each(function () {
                        let remarks = $(this).find(".title--listing").text().trim();
                        $(this).find(".card-cat-v2").each(function () {
                            const url = new URL($(this).find(".card-cat-v2__link").attr("href")).pathname.split('/');
                            result.list.push({
                                vod_id: url[1] + "/" + url[2] + "?sort_by=release_at",
                                vod_name: $(this).find(".card-cat-v2__title h4").text(),
                                vod_pic: $(this).find("img").attr("src"),
                                vod_remarks: remarks,
                                vod_tag: "folder",
                                style: {
                                    "type": "rect",
                                    "ratio": 0.7
                                }
                            })
                        });
                    })
                    result.pagecount = 1;
                } else {
                    result.list = listVideos(".card-video");
                    result.pagecount = $('.pagination__list li[class] .pagination__item:last').text().trim();
                }
                return result;
            },
            detailContent: function (ids) {
                let categories = [], tags = [];
                $(".content-details__meta a").each(function () {
                    const url = new URL($(this).attr("href")).pathname.split('/');
                    const id = url[1] + "/" + url[2] + "?sort_by=release_at";
                    const name = $(this).text().trim();
                    if (name.length > 0) {
                        if (url[1] === "categories") {
                            categories.push(`[a=cr:{"id":"${id}","name":"${name}"}/]${name}[/a]`);
                        } else {
                            tags.push(`[a=cr:{"id":"${id}","name":"${name}"}/]${name}[/a]`);
                        }
                    }
                })
                const vod = {
                    vod_id: ids[0],
                    vod_name: ids[0].toUpperCase(),
                    vod_year: $(".content-details__meta time").text(),
                    vod_remarks: categories.join(" "),
                    vod_actor: tags.join(" "),
                    vod_content: $(".content-details__title").text(),
                    vod_play_from: "XOJAV",
                    vod_play_url: "720P$" + unsafeWindow.stream,
                };
                return {list: [vod]};
            },
            searchContent: function (key, quick, pg) {
                const result = {
                    list: [],
                    pagecount: 1
                };
                result.list = listVideos(".card-video");
                result.pagecount = Math.ceil($('.title--sub-title').text().replace(/[^0-9]/ig, "") / 24)
                return result;
            }
        };
    })();
    $(document).ready(function () {
        let result = "";
        if ($("#cf-wrapper").length > 0) {
            console.log("源站不可用:" + $('title').text());
            GM_toastLong("源站不可用:" + $('title').text());
        } else {
            result = GmSpider[GMSpiderArgs.fName](...GMSpiderArgs.fArgs);
        }
        console.log(result);
        if (typeof GmSpiderInject !== 'undefined') {
            GmSpiderInject.SetSpiderResult(JSON.stringify(result));
        }
    });
})();

