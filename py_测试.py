#coding=utf-8
#!/usr/bin/python
import sys
from base.spider import Spider

sys.path.append('..')

class Spider(Spider):
	config = {
		"player": {},
		"filter": {}
	}
	header = {
		"Referer": "https://hsex.icu/",
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36"
	}
	def searchContent(self, key, quick):
		url = 'https://hsex.icu/search.htm?search={0}'.format(key)
		rsp = self.fetch(url)
		root = self.html(rsp.text)
		aList = root.xpath("//div[@class='col-xs-6 col-md-3']/div")
		videos = []
		for a in aList:
			name = a.xpath('.//div[@class="image"]/@title')[0]
			style_attr = a.xpath('.//div[@class="image"]/@style')[0]
			pic = style_attr.split("url('")[-1].rstrip("')")
			mark = a.xpath(".//div[@class='info']//p/text()")[1].strip()
			sid_temp = a.xpath(".//a/@href")[0]
			sid = sid_temp.split('-')[1].split('.')[0]
			videos.append({
				"vod_id": sid,
				"vod_name": name,
				"vod_pic": pic,
				"vod_remarks": mark
			})
		result = {
			'list': videos
		}
		return result
	def detailContent(self, array):
		tid = array[0]
		url = f'https://hsex.icu/video-{tid}.htm'
		rsp = self.fetch(url)
		root = self.html(rsp.text)
		node = root.xpath("//div[@class='panel panel-default']/div[1]")
		if not node:
			return {'error': 'Content not found'}

		title_list = node[0].xpath(".//h3[@class='panel-title']/text()")
		title = title_list[0] if title_list else 'Unknown Title'
		pic = ''  # Placeholder for pic URL
		vod = {
			"vod_id": tid,
			"vod_name": title,
			"vod_pic": pic,
			"type_name": "",
			"vod_year": "",
			"vod_area": "",
			"vod_remarks": "",
			"vod_actor": "",
			"vod_director": "",
			"vod_content": ""
		}
		vod_play_from = '$$$'
		vod_play_url = '$$$'
		playFrom = ['好色TV']
		vod_play_from = vod_play_from.join(playFrom)
		playList = []
		vodItems = [title + "$" + tid]
		joinStr = '#'
		joinStr = joinStr.join(vodItems)
		playList.append(joinStr)
		vod_play_url = vod_play_url.join(playList)
		vod['vod_play_from'] = vod_play_from
		vod['vod_play_url'] = vod_play_url
		result = {
			'list': [vod]
		}
		return result
	def playerContent(self, flag, id, vipFlags):
		global video_url
		url = 'https://hsex.icu/video-{0}.htm'.format(id)
		rsp = self.fetch(url)
		root = self.html(rsp.text)
		vodList = root.xpath("//video/source[@type='application/x-mpegURL']")
		for vl in vodList:
			video_url = vl.get('src')
		result = {}
		result["parse"] = 0
		result["playUrl"] = ''
		result["url"] = video_url
		result["header"] = ''
		return result
	def localProxy(self, param):
		pass
	def getName(self):
		pass
	def init(self, extend=''):
		pass
	def homeContent(self, filter):
		pass
	def homeVideoContent(self):
		pass
	def categoryContent(self, tid, pg, filter, extend):
		pass
	def isVideoFormat(self, url):
		pass
	def manualVideoCheck(self):
		pass