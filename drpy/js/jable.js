// ==UserScript==
// @name         Jable
// @namespace    gmspider
// @version      2025.08.01
// @description  Jable MengXin
// @author       Luomo
// @match        https://jable.tv/*
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
        GMSpiderArgs.fName = "homeContent";
        GMSpiderArgs.fArgs = [true];
    }
    Object.freeze(GMSpiderArgs);
    const GmSpider = (function () {
        function listVideos(result, tid, extend) {
            result.pagecount = parseInt($(".pagination .page-item:last").text()) || 1;
            $("[id^='list_videos_'] .row:first .video-img-box").each(function () {
                const subTitle = $(this).find(".sub-title").text().split('\n');
                const remarks = [
                    "👁️" + (subTitle[1]?.trim() || ""),
                    "❤️" + (subTitle[2]?.trim() || "")
                ];
                const url = new URL($(this).find(".img-box a").attr("href"));
                result.list.push({
                    vod_id: url.pathname.split('/').at(2).toUpperCase(),
                    vod_name: $(this).find(".title").text(),
                    vod_pic: $(this).find(".img-box img").data("src"),
                    vod_remarks: remarks.join(" "),
                    vod_year: $(this).find(".absolute-bottom-right").text().trim()
                });
            });
            return result;
        }

        return {
            homeContent: function (filter) {
                let result = {
                    class: [
                        { type_id: "latest-updates", type_name: "最近更新" },
                        { type_id: "new-release", type_name: "全新上市" },
                        { type_id: "hot", type_name: "热门影片" },
                        { type_id: "categories/bdsm", type_name: "主奴调教" },
                        { type_id: "categories/sex-only", type_name: "直接开啪" },
                        { type_id: "categories/chinese-subtitle", type_name: "中文字幕" },
                        { type_id: "categories/insult", type_name: "凌辱快感" },
                        { type_id: "categories/uniform", type_name: "制服诱惑" },
                        { type_id: "categories/roleplay", type_name: "角色剧情" },
                        { type_id: "categories/private-cam", type_name: "盗摄偷拍" },
                        { type_id: "categories/uncensored", type_name: "无码解放" },
                        { type_id: "categories/pov", type_name: "男友视角" },
                        { type_id: "categories/groupsex", type_name: "多P群交" },
                        { type_id: "categories/pantyhose", type_name: "丝袜美腿" },
                        { type_id: "categories", type_name: "标签" }
                    ],
                    filters: {
                        hot: [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "所有时间", v: "&sort_by=video_viewed" },
                                { n: "今日排行", v: "&sort_by=video_viewed_today" },
                                { n: "本周排行", v: "&sort_by=video_viewed_week" },
                                { n: "本月排行", v: "&sort_by=video_viewed_month" }
                            ]
                        }],
                        "categories/bdsm": [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "近期最佳", v: "&sort_by=post_date_and_popularity" },
                                { n: "最近更新", v: "&sort_by=post_date" },
                                { n: "最多观看", v: "&sort_by=video_viewed" },
                                { n: "最高收藏", v: "&sort_by=most_favourited" }
                            ]
                        }],
                        "categories/sex-only": [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "近期最佳", v: "&sort_by=post_date_and_popularity" },
                                { n: "最近更新", v: "&sort_by=post_date" },
                                { n: "最多观看", v: "&sort_by=video_viewed" },
                                { n: "最高收藏", v: "&sort_by=most_favourited" }
                            ]
                        }],
                        "categories/chinese-subtitle": [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "近期最佳", v: "&sort_by=post_date_and_popularity" },
                                { n: "最近更新", v: "&sort_by=post_date" },
                                { n: "最多观看", v: "&sort_by=video_viewed" },
                                { n: "最高收藏", v: "&sort_by=most_favourited" }
                            ]
                        }],
                        "categories/insult": [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "近期最佳", v: "&sort_by=post_date_and_popularity" },
                                { n: "最近更新", v: "&sort_by=post_date" },
                                { n: "最多观看", v: "&sort_by=video_viewed" },
                                { n: "最高收藏", v: "&sort_by=most_favourited" }
                            ]
                        }],
                        "categories/uniform": [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "近期最佳", v: "&sort_by=post_date_and_popularity" },
                                { n: "最近更新", v: "&sort_by=post_date" },
                                { n: "最多观看", v: "&sort_by=video_viewed" },
                                { n: "最高收藏", v: "&sort_by=most_favourited" }
                            ]
                        }],
                        "categories/roleplay": [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "近期最佳", v: "&sort_by=post_date_and_popularity" },
                                { n: "最近更新", v: "&sort_by=post_date" },
                                { n: "最多观看", v: "&sort_by=video_viewed" },
                                { n: "最高收藏", v: "&sort_by=most_favourited" }
                            ]
                        }],
                        "categories/private-cam": [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "近期最佳", v: "&sort_by=post_date_and_popularity" },
                                { n: "最近更新", v: "&sort_by=post_date" },
                                { n: "最多观看", v: "&sort_by=video_viewed" },
                                { n: "最高收藏", v: "&sort_by=most_favourited" }
                            ]
                        }],
                        "categories/uncensored": [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "近期最佳", v: "&sort_by=post_date_and_popularity" },
                                { n: "最近更新", v: "&sort_by=post_date" },
                                { n: "最多观看", v: "&sort_by=video_viewed" },
                                { n: "最高收藏", v: "&sort_by=most_favourited" }
                            ]
                        }],
                        "categories/pov": [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "近期最佳", v: "&sort_by=post_date_and_popularity" },
                                { n: "最近更新", v: "&sort_by=post_date" },
                                { n: "最多观看", v: "&sort_by=video_viewed" },
                                { n: "最高收藏", v: "&sort_by=most_favourited" }
                            ]
                        }],
                        "categories/groupsex": [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "近期最佳", v: "&sort_by=post_date_and_popularity" },
                                { n: "最近更新", v: "&sort_by=post_date" },
                                { n: "最多观看", v: "&sort_by=video_viewed" },
                                { n: "最高收藏", v: "&sort_by=most_favourited" }
                            ]
                        }],
                        "categories/pantyhose": [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "近期最佳", v: "&sort_by=post_date_and_popularity" },
                                { n: "最近更新", v: "&sort_by=post_date" },
                                { n: "最多观看", v: "&sort_by=video_viewed" },
                                { n: "最高收藏", v: "&sort_by=most_favourited" }
                            ]
                        }],
                        categories: [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                { n: "近期最佳", v: "&sort_by=post_date_and_popularity" },
                                { n: "最近更新", v: "&sort_by=post_date" },
                                { n: "最多观看", v: "&sort_by=video_viewed" },
                                { n: "最高收藏", v: "&sort_by=most_favourited" }
                            ]
                        }]
                    },
                    list: []
                };
                let itemList = [];
                $(".video-img-box").has(".detail").has("img").each(function () {
                    const url = new URL($(this).find(".img-box a").attr("href"));
                    if (url.hostname === "jable.tv") {
                        itemList.push({
                            vod_id: url.pathname.split('/').at(2).toUpperCase(),
                            vod_name: $(this).find(".title").text(),
                            vod_pic: $(this).find("img").data("src"),
                            vod_year: $(this).find(".absolute-bottom-right").text().trim()
                        });
                    }
                });
                result.list = itemList.filter((item, index) => {
                    return itemList.findIndex(i => i.vod_id === item.vod_id) === index;
                });
                return result;
            },
            categoryContent: function (tid, pg, filter, extend) {
                let result = {
                    list: [],
                    pagecount: 1
                };
                if (tid === "categories") {
                    $(".app-nav .title-box:gt(0)").each(function () {
                        const remark = $(this).text();
                        $(this).next(".row").find(".tag").each(function () {
                            const url = new URL($(this).attr("href")).pathname.split('/');
                            result.list.push({
                                vod_id: url[1] + "/" + url[2],
                                vod_name: $(this).text(),
                                vod_remarks: remark,
                                vod_tag: "folder"
                            });
                        });
                    });
                    result.pagecount = 1;
                } else {
                    listVideos(result, tid, extend);
                }
                return result;
            },
            detailContent: function (ids) {
                let vodActor = [], categories = [], tags = [];
                $(".video-info .info-header .models .model").each(function () {
                    const url = new URL($(this).attr("href")).pathname.split('/');
                    const id = url[1] + "/" + url[2];
                    const name = $(this).find(".rounded-circle").data("original-title");
                    vodActor.push(`[a=cr:{"id":"${id}","name":"${name}"}/]${name}[/a]`);
                });
                $(".video-info .tags .cat").each(function () {
                    const url = new URL($(this).attr("href")).pathname.split('/');
                    const id = url[1] + "/" + url[2];
                    const name = $(this).text();
                    categories.push(`[a=cr:{"id":"${id}","name":"${name}"}/]#${name}[/a]`);
                });
                $(".video-info .tags a:not(.cat)").each(function () {
                    const url = new URL($(this).attr("href")).pathname.split('/');
                    const id = url[1] + "/" + url[2];
                    const name = $(this).text();
                    tags.push(`[a=cr:{"id":"${id}","name":"${name}"}/]#${name}[/a]`);
                });
                const vod = {
                    vod_id: ids[0],
                    vod_name: ids[0].toUpperCase(),
                    vod_pic: $("#player").attr("poster"),
                    vod_year: "更新於 " + $(".video-info .info-header .mr-3:first").text() + " " + $(".video-info .info-header .inactive-color").text(),
                    vod_remarks: tags.join(" "),
                    vod_actor: vodActor.join(" ") + " " + categories.join(" "),
                    vod_content: $(".video-info h4").text(),
                    vod_play_from: $(".video-info .info-header .header-right h6").children().remove().end().text().trim(),
                    vod_play_url: "1080P$" + unsafeWindow.hlsUrl
                };
                return { list: [vod] };
            },
            searchContent: function (key, quick, pg) {
                const result = {
                    list: [],
                    pagecount: 1
                };
                listVideos(result);
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