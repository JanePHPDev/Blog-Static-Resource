// ==UserScript==
// @name              无限影音脚本版
// @namespace         http://wunian.xyz/
// @version           5.2.0
// @description       【❤️ 视频自动解析，体会拥有VIP的感觉❤️，适配PC+移动 】【出了事找我师父，我师傅是   林梦泽   ，他的QQ群是;940994905,e-mail是:administer@mengze.vip，博客是：https://mengze.vip/，个人简介是：https://mengze2mc.github.io/，性别是：男，爱好是：喜欢女的，是一个来自中国湖南的全栈开发者。他从2023年开始 从HTML到Bootstrap再到Vue，从JavaScript到PHP到Nodejs，从CSS到SCSS再到Stylus，他总共花了两年时间 这一路上更多的是快乐，他一共换过6个博客域名 分别是：mengze.669.ink、mengze2.gay、mengze2.top、mengze2.cn、zeimg.top、mengze.vip。他并不需要什么收录啊、权重啊，他不在乎 他更爱折腾的那个过程。他搭建过博客、网盘、图床、Git，也做过内容农场、资源站，搞过虚拟化、云原生、Docker、Serverless、卖过服务器，他非常爱折腾，但是他更爱他的徒弟 勿念 他徒弟是念网创（New Web Create）首席创作者】功能有：1、支持B站大会员番剧；2、（由于爱奇艺全新改版，暂不支持）、腾讯、（由于优酷全新改版，暂不支持）、芒果等全网VIP视频免费解析去广告(免跳出观影特方便)（还可以自动解析哦）
// @author            无限影音
// @require           https://wunian.xyz/jquery.min.js‘’
// @match          *://laisoyiba.com/*
// @match           *://search.bilibili.com/*
// @match           *://*.iqiyi.com/v_*
// @match           *://*.iqiyi.com/w_*
// @match           *://*.iqiyi.com/a_*
// @match           *://v.qq.com/x/cover/*
// @match           *://v.qq.com/x/page/*
// @match           *://v.qq.com/tv/*
// @match           *://*.mgtv.com/b/*
// @match           *://*.bilibili.com/video/*
// @match           *://*.bilibili.com/bangumi/play/*
// @match           *://www.acfun.cn/bangumi/*
// @match           *://www.le.com/ptv/vplay/*
// @match           *://www.wasu.cn/Play/show/*
// @match           *://vip.1905.com/play/*
// @match           *://tv.sohu.com/v/*
// @match           *://film.sohu.com/album/*
// @match           *://v.pptv.com/show/*
// @match           *://m.v.qq.com/*
// @match           *://m.iqiyi.com/v_*
// @match           *://m.iqiyi.com/w_*
// @match           *://m.iqiyi.com/a_*
// @match           *://m.youku.com/alipay_video/*
// @match           *://m.youku.com/video/*
// @match           *://m.mgtv.com/b/*
// @match           *://m.bilibili.com/video/*
// @match           *://m.bilibili.com/anime/*
// @match           *://m.bilibili.com/bangumi/play/*
// @match           *://m.le.com/vplay_*
// @match           *://vip.1905.com/m/play/*
// @match           *://www.wasu.cn/wap/*/show/*
// @match           *://m.tv.sohu.com/v.*
// @match           *://m.pptv.com/show/*
// @match             *://*.youku.com/*
// @match             *://*.iqiyi.com/*
// @match             *://*.iq.com/*
// @match             *://*.le.com/*
// @match             *://v.qq.com/*
// @match             *://www.iqiyi.com/*
// @match             *://m.v.qq.com/*
// @match             *://*.tudou.com/*
// @match             *://*.mgtv.com/*
// @match             *://tv.sohu.com/*
// @match             *://film.sohu.com/*
// @match             *://*.1905.com/*
// @match             *://*.bilibili.com/*
// @match             *://*.pptv.com/*
// @connect           api.bilibili.com
// @grant             unsafeWindow
// @grant             GM_addStyle
// @grant             GM_openInTab
// @grant             GM_getValue
// @grant             GM_setValue
// @grant             GM_xmlhttpRequest
// @grant             GM_log
// @charset		      UTF-8
// @license           GPL License
// @antifeature  	  referral-link 【念网创提醒您：此提示为GreasyFork代码规范要求脚本必须添加，实际使用无任何强制跳转，代码可查，请知悉】
// ==/UserScript==
 
const util = (function () {
 
    function findTargetElement(targetContainer) {
        const body = window.document;
        let tabContainer;
        let tryTime = 0;
        const maxTryTime = 120;
        return new Promise((resolve, reject) => {
            let interval = setInterval(() => {
                tabContainer = body.querySelector(targetContainer);
                if (tabContainer) {
                    clearInterval(interval);
                    resolve(tabContainer);
                }
                if ((++tryTime) === maxTryTime) {
                    clearInterval(interval);
                    reject();
                }
            }, 500);
        });
    }
 
    function urlChangeReload() {
        const oldHref = window.location.href;
        let interval = setInterval(() => {
            let newHref = window.location.href;
            if (oldHref !== newHref) {
                clearInterval(interval);
                window.location.reload();
            }
        }, 500);
    }
 
    function reomveVideo() {
        setInterval(() => {
            for (let video of document.getElementsByTagName("video")) {
                if (video.src) {
                    video.removeAttribute("src");
                    video.muted = true;
                    video.load();
                    video.pause();
                }
            }
        }, 500);
    }
 
    function syncRequest(option) {
        return new Promise((resolve, reject) => {
            option.onload = (res) => {
                resolve(res);
            };
            option.onerror = (err) => {
                reject(err);
            };
            GM_xmlhttpRequest(option);
        });
    }
 
    return {
        req: (option) => syncRequest(option),
        findTargetEle: (targetEle) => findTargetElement(targetEle),
        urlChangeReload: () => urlChangeReload(),
        reomveVideo: () => reomveVideo()
    }
})();
 
 
const superVip = (function () {
 
    const _CONFIG_ = {
        isMobile: navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/i),
        currentPlayerNode: null,
        vipBoxId: 'vip_jx_box' + Math.ceil(Math.random() * 100000000),
        flag: "flag_vip",
        autoPlayerKey: "auto_player_key" + window.location.host,
        autoPlayerVal: "auto_player_value_" + window.location.host,
        videoParseList: [
                {"name":"love冰豆|T","type": "1","url":"https://api.qianqi.net/vip/?url=","mobile":0},
                {"name":"纯净|T+B","type": "1", "url":"https://im1907.top/?jx=","mobile":1},
                {"name":"CK|T+M","type": "1","url":"https://www.ckplayer.vip/jiexi/?url=","mobile":0},
                {"name":"JY|T+M","type": "1","url":"https://jx.playerjy.com/?url=","mobile":0},
                {"name":"PM|T+M","type": "1","url":"https://www.playm3u8.cn/jiexi.php?url=","mobile":0},
                {"name":"七哥|T+B+M","type": "1","url":"https://jx.nnxv.cn/tv.php?url=","mobile":0},
                {"name":"全能RDHK","type": "1","url":"https://jx.rdhk.net/?v=","mobile":1},
                {"name":"虾米|T+B+M","type": "1","url":"https://jx.xmflv.com/?url=","mobile":0},
                {"name":"8090|T+B+M","type": "1","url":"https://www.8090g.cn/?url=","mobile":0}
        ],
        playerContainers: [
            {
                host: "v.qq.com",
                container: "#mod_player,#player-container,.container-player",
                name: "Default",
                displayNodes: ["#mask_layer", ".mod_vip_popup", "#mask_layer", ".panel-tip-pay"]
            },
            {
                host: "m.v.qq.com",
                container: ".mod_player,#player",
                name: "Default",
                displayNodes: [".mod_vip_popup", "[class^=app_],[class^=app-],[class*=_app_],[class*=-app-],[class$=_app],[class$=-app]", "div[dt-eid=open_app_bottom]", "div.video_function.video_function_new", "a[open-app]", "section.mod_source", "section.mod_box.mod_sideslip_h.mod_multi_figures_h,section.mod_sideslip_privileges,section.mod_game_rec"]
            },
 
            {host: "w.mgtv.com", container: "#mgtv-player-wrap", name: "Default", displayNodes: []},
            {host: "www.mgtv.com", container: "#mgtv-player-wrap", name: "Default", displayNodes: []},
            {
                host: "m.mgtv.com",
                container: ".video-area",
                name: "Default",
                displayNodes: ["div[class^=mg-app]",".video-area-bar"]
            },
            {host: "www.bilibili.com", container: "#player_module,#bilibiliPlayer,#bilibili-player", name: "Default", displayNodes: []},
            {host: "search.bilibili.com", container: ".player-wrapper,.player-container,.mplayer", name: "Default", displayNodes: []},
            {host: "www.iqiyi.com", container: "#flashbox", name: "Default", displayNodes: ["#playerPopup", "div[class^=qy-header-login-pop]"]},
            {
                host: "m.iqiyi.com",
                container: ".m-video-player-wrap",
                name: "Default",
                displayNodes: ["div.m-iqyGuide-layer", "a[down-app-android-url]", "[name=m-extendBar]", "[class*=ChannelHomeBanner]", "section.m-hotWords-bottom"]
            },
            {host: "www.iq.com", container: ".intl-video-wrap", name: "Default", displayNodes: []},
            {host: "v.youku.com", container: "#player", name: "Default", displayNodes: ["#iframaWrapper"]},
            {host: "m.youku.com", container: "#player,.h5-detail-player", name: "Default", displayNodes: []},
            {host: "tv.sohu.com", container: "#player", name: "Default", displayNodes: []},
            {host: "film.sohu.com", container: "#playerWrap", name: "Default", displayNodes: []},
            {host: "www.le.com", container: "#le_playbox", name: "Default", displayNodes: []},
            {host: "video.tudou.com", container: ".td-playbox", name: "Default", displayNodes: []},
            {host: "v.pptv.com", container: "#pptv_playpage_box", name: "Default", displayNodes: []},
            {host: "vip.pptv.com", container: ".w-video", name: "Default", displayNodes: []},
            {host: "www.wasu.cn", container: "#flashContent", name: "Default", displayNodes: []},
            {host: "www.acfun.cn", container: "#player", name: "Default", displayNodes: []},
            {host: "vip.1905.com", container: "#player,#vodPlayer", name: "Default", displayNodes: []},
            {host: "www.1905.com", container: "#player,#vodPlayer", name: "Default", displayNodes: []},
        ]
    };
    class BaseConsumer {
        constructor() {
            this.parse = () => {
                util.findTargetEle('body')
                    .then((container) => this.preHandle(container))
                    .then((container) => this.generateElement(container))
                    .then((container) => this.bindEvent(container))
                    .then((container) => this.autoPlay(container))
                    .then((container) => this.postHandle(container));
            }
        }
 
        preHandle(container) {
            _CONFIG_.currentPlayerNode.displayNodes.forEach((item, index) => {
                util.findTargetEle(item)
                    .then((obj) => obj.style.display = 'none')
                    .catch(e => console.warn("不存在元素", e));
            });
            return new Promise((resolve, reject) => resolve(container));
        }
 
        generateElement(container) {
            GM_addStyle(`
                        #${_CONFIG_.vipBoxId} {cursor:pointer; position:fixed; top:120px; left:0px; z-index:9999999; text-align:left;}
                        #${_CONFIG_.vipBoxId} .img_box{width:32px; height:32px;line-height:32px;text-align:center;background-color:#1c84c6;margin:10px 0px;}
                        #${_CONFIG_.vipBoxId} .vip_list {display:none; position:absolute; border-radius:5px; left:32px; top:0; text-align:center; background-color: #3f4149; border:1px solid white;padding:10px 0px; width:380px; max-height:400px; overflow-y:auto;}
                        #${_CONFIG_.vipBoxId} .vip_list li{border-radius:2px; font-size:12px; color:#DCDCDC; text-align:center; width:calc(25% - 14px); line-height:21px; float:left; border:1px solid gray; padding:0 4px; margin:4px 2px;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;-o-text-overflow:ellipsis;}
                        #${_CONFIG_.vipBoxId} .vip_list li:hover{color:#1c84c6; border:1px solid #1c84c6;}
                        #${_CONFIG_.vipBoxId} .vip_list ul{padding-left: 10px;}
                        #${_CONFIG_.vipBoxId} .vip_list::-webkit-scrollbar{width:5px; height:1px;}
                        #${_CONFIG_.vipBoxId} .vip_list::-webkit-scrollbar-thumb{box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2); background:#A8A8A8;}
                        #${_CONFIG_.vipBoxId} .vip_list::-webkit-scrollbar-track{box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2); background:#F1F1F1;}
                        #${_CONFIG_.vipBoxId} li.selected{color:#1c84c6; border:1px solid #1c84c6;}
						`);
 
            if (_CONFIG_.isMobile) {
                GM_addStyle(`
                    #${_CONFIG_.vipBoxId} {top:300px;}
                    #${_CONFIG_.vipBoxId} .vip_list {width:300px;}
                    `);
            }
 
            let type_1_str = "";
            let type_2_str = "";
            let type_3_str = "";
            _CONFIG_.videoParseList.forEach((item, index) => {
                if (item.type.includes("1")) {
                    type_1_str += `<li class="nq-li" title="${item.name}1" data-index="${index}">${item.name}</li>`;
                }
                if (item.type.includes("2")) {
                    type_2_str += `<li class="tc-li" title="${item.name}" data-index="${index}">${item.name}</li>`;
                }
                if (item.type.includes("3")) {
                    type_3_str += `<li class="tc-li" title="${item.name}" data-index="${index}">${item.name}</li>`;
                }
            });
 
            let autoPlay = !!GM_getValue(_CONFIG_.autoPlayerKey, null) ? "开" : "关";
 
            $(container).append(`
                <div id="${_CONFIG_.vipBoxId}">
                    <div class="vip_icon">
                        <div class="img_box" title="选择解析源" style="color:white;font-size:16px;font-weight:bold;border-radius:5px;"><span style="color: red;">V</span>I<span style="color: yellow;">P</span></div>
                        <div class="vip_list">
                            <div>
                                <h3 style="color:#1c84c6; font-weight: bold; font-size: 16px; padding:5px 0px;">无限影音[内嵌播放]</h3>
                                <ul>
                                    ${type_1_str}
                                    <div style="clear:both;"></div>
                                </ul>
                            </div>
                         
                            <div style="text-align:left;color:#FFF;font-size:10px;padding:0px 10px;margin-top:10px;">
                                <br><span style="font-size: 16px;"><b>念网创无限影音脚本自动解析功能说明：</b>有时候加载时间过长，请耐心等待。</span><br>
                                <br>&nbsp;&nbsp;1、自动解析功能默认关闭（自动解析只支持内嵌播放源）
                                <br>&nbsp;&nbsp;2、解析源后面的 T 代表腾讯视频， B 代表哔哩哔哩， Q 代表爱奇艺， M 代表芒果TV
                                <br>&nbsp;&nbsp;3、开启自动解析，网页打开后脚本将根据当前选中的解析源自动解析视频。如解析失败，请手动选择不同的解析源尝试
                                <br>&nbsp;&nbsp;4、没有选中解析源将随机选取一个
                                <br>&nbsp;&nbsp;5、如某些网站有会员可以关闭自动解析功能<br>
                                <br><span style="font-size: 16px;"><b>无限影音解析脚本使用协议：</b></span><br>
                                <br>&nbsp;&nbsp;感谢您对本脚本的信任，为了更好的使用本脚本，在此，我们（念网创）郑重提醒您：
                                <br>&nbsp;&nbsp;1.有能力的情况，请大家支持正版
                                <br>&nbsp;&nbsp;2.本脚本仅用学习交流，请勿用于非法、商业用途，使用本脚本下载的内容请勿进行复制、传播等侵权行为
                                <br>&nbsp;&nbsp;3.VIP视频解析中所用到的解析接口全部收集自互联网（源码可见），版权问题请联系相关解析接口所有者，脚本不承担相关责任
                                <br>&nbsp;&nbsp;4.视频下载内容均来自网络API接口，不存在破解情况，如果侵权请邮件（wunian@outlook.sg）联系删除。
                               <br>&nbsp;&nbsp; 5.当您开始使用我们的服务时，我们将视为您已经同意了使用协议，即已代表您已经充分了解相关问题，否则后果自负，特此声明！
                               <br>&nbsp;&nbsp; 如果部分接口失效请尽快联系我们，我们得到信息后将会第一时间处理（注意：请记得提供有问题的接口/源）
                               <br><br>&nbsp;&nbsp;<span style="font-size: 14px;"> 联系方式：<br>QQ群：<span style="color:#42A5F5">1038095492</span>   <button style="background-color: #FFA500; color: white; border: none; border-radius: 2px;" onclick="window.open('https://qm.qq.com/q/l2FUfz71Ac','_blank')">前往QQ</button><br>电子邮箱：<span style="color:#42A5F5">wunian@outlook.sg</span><button style="background-color: #FFA500; color: white; border: none; border-radius: 2px;" onclick="window.location.href='mailto:wunian@outlook.sg'">发送邮件</button><br>博客(云澜止息）：<span style="color:#42A5F5">https://wunian.xyz/   </span><button style="background-color: #FFA500; color: white; border: none; border-radius: 2px;" onclick="window.open('https://wunian.xyz/','_blank')">跳转</button></span>
                             <br><center>---念网创·开发---<br><br><br>微信赞赏码</center><img src="https://wunian.netlify.app/img/IMG183624.png" alt="图片" style="width: 100px; height: 100px; display: block; margin: 0 auto; border-radius: 5px;">
                            </div>
                        </div>
                    </div>
                    <div class="img_box" id="vip_auto" style="color:white;font-size:16px;font-weight:bold;border-radius:5px;" title="是否打开自动解析。若自动解析失败，请手动选择其它接口尝试！！">${autoPlay}</div>
                </div>`);
            return new Promise((resolve, reject) => resolve(container));
        }
 
        bindEvent(container) {
            const vipBox = $(`#${_CONFIG_.vipBoxId}`);
            if (_CONFIG_.isMobile) {
                vipBox.find(".vip_icon").on("click", () => vipBox.find(".vip_list").toggle());
            } else {
                vipBox.find(".vip_icon").on("mouseover", () => vipBox.find(".vip_list").show());
                vipBox.find(".vip_icon").on("mouseout", () => vipBox.find(".vip_list").hide());
            }
 
            let _this = this;
            vipBox.find(".vip_list .nq-li").each((liIndex, item) => {
                item.addEventListener("click", () => {
                    const index = parseInt($(item).attr("data-index"));
                    GM_setValue(_CONFIG_.autoPlayerVal, index);
                    GM_setValue(_CONFIG_.flag, "true");
                    _this.showPlayerWindow(_CONFIG_.videoParseList[index]);
                    vipBox.find(".vip_list li").removeClass("selected");
                    $(item).addClass("selected");
                });
            });
            vipBox.find(".vip_list .tc-li").each((liIndex, item) => {
                item.addEventListener("click", () => {
                    const index = parseInt($(item).attr("data-index"));
                    const videoObj = _CONFIG_.videoParseList[index];
                    let url = videoObj.url + window.location.href;
                    GM_openInTab(url, {active: true, insert: true, setParent: true});
                });
            });
 
            //右键移动位置
            vipBox.mousedown(function (e) {
                if (e.which !== 3) {
                    return;
                }
                e.preventDefault()
                vipBox.css("cursor", "move");
                const positionDiv = $(this).offset();
                let distenceX = e.pageX - positionDiv.left;
                let distenceY = e.pageY - positionDiv.top;
 
                $(document).mousemove(function (e) {
                    let x = e.pageX - distenceX;
                    let y = e.pageY - distenceY;
                    const windowWidth = $(window).width();
                    const windowHeight = $(window).height();
 
                    if (x < 0) {
                        x = 0;
                    } else if (x > windowWidth - vipBox.outerWidth(true) - 100) {
                        x = windowWidth - vipBox.outerWidth(true) - 100;
                    }
 
                    if (y < 0) {
                        y = 0;
                    } else if (y > windowHeight - vipBox.outerHeight(true)) {
                        y = windowHeight - vipBox.outerHeight(true);
                    }
                    vipBox.css("left", x);
                    vipBox.css("top", y);
                });
                $(document).mouseup(function () {
                    $(document).off('mousemove');
                    vipBox.css("cursor", "pointer");
                });
                $(document).contextmenu(function (e) {
                    e.preventDefault();
                })
            });
            return new Promise((resolve, reject) => resolve(container));
        }
 
        autoPlay(container) {
            const vipBox = $(`#${_CONFIG_.vipBoxId}`);
            vipBox.find("#vip_auto").on("click", function () {
                if (!!GM_getValue(_CONFIG_.autoPlayerKey, null)) {
                    GM_setValue(_CONFIG_.autoPlayerKey, null);
                    $(this).html("关");
                    $(this).attr("title", "是否打开自动解析。若自动解析失败，请手动选择其它接口尝试！！");
                } else {
                    GM_setValue(_CONFIG_.autoPlayerKey, "true");
                    $(this).html("开");
                }
                setTimeout(function () {
                    window.location.reload();
                }, 200);
            });
 
            if (!!GM_getValue(_CONFIG_.autoPlayerKey, null)) {
                this.selectPlayer();
            }
            return new Promise((resolve, reject) => resolve(container));
        }
 
        selectPlayer() {
            let index = GM_getValue(_CONFIG_.autoPlayerVal, 2);
            let autoObj = _CONFIG_.videoParseList[index];
            let _th = this;
            if (autoObj.type.includes("1")) {
                setTimeout(function () {
                    _th.showPlayerWindow(autoObj);
                    const vipBox = $(`#${_CONFIG_.vipBoxId}`);
                    vipBox.find(`.vip_list [title="${autoObj.name}1"]`).addClass("selected");
                    $(container).find("#vip_auto").attr("title", `自动解析源：${autoObj.name}`);
                }, 2500);
            }
        }
 
        showPlayerWindow(videoObj) {
            util.findTargetEle(_CONFIG_.currentPlayerNode.container)
                .then((container) => {
                const type = videoObj.type;
                let url = videoObj.url + window.location.href;
                if (type.includes("1")) {
                    $(container).empty();
                    util.reomveVideo();
                    let iframeDivCss = "width:100%;height:100%;z-index:999999;";
                    if (_CONFIG_.isMobile) {
                        iframeDivCss = "width:100%;height:220px;z-index:999999;";
                    }
                    if (_CONFIG_.isMobile && window.location.href.indexOf("iqiyi.com") !== -1) {
                        iframeDivCss = "width:100%;height:220px;z-index:999999;margin-top:-56.25%;";
                    }
                    $(container).append(`<div style="${iframeDivCss}"><iframe id="iframe-player-4a5b6c" src="${url}" style="border:none;" allowfullscreen="true" width="100%" height="100%"></iframe></div>`);
                }
            });
        }
 
        postHandle(container) {
            if (!!GM_getValue(_CONFIG_.autoPlayerKey, null)) {
                util.urlChangeReload();
            } else {
                let oldHref = window.location.href;
                let interval = setInterval(() => {
                    let newHref = window.location.href;
                    if (oldHref !== newHref) {
                        oldHref = newHref;
                        if (!!GM_getValue(_CONFIG_.flag, null)){
                            clearInterval(interval);
                            window.location.reload();
                        }
                    }
                }, 1000);
            }
        }
 
    }
 
    class DefaultConsumer extends BaseConsumer {
    }
 
    return {
        start: () => {
            GM_setValue(_CONFIG_.flag, null);
            let mallCase = 'Default';
            let playerNode = _CONFIG_.playerContainers.filter(value => value.host === window.location.host);
            if (playerNode === null || playerNode.length <= 0) {
             console.warn(window.location.host + "念网创无限影音脚本使用协议：感谢您对本脚本的信任，为了更好的使用本脚本，在此，我们（念网创）郑重提醒您：1.有能力的情况，请大家支持正版。2.本脚本仅用学习交流，请勿用于非法、商业用途，使用本脚本下载的内容请勿进行复制、传播等侵权行为。3.VIP视频解析中所用到的解析接口全部收集自互联网（源码可见），版权问题请联系相关解析接口所有者，脚本不承担相关责任。4.视频下载内容均来自网络API接口，不存在破解情况，如果侵权请邮件（wunian@outlook.sg）联系删除。5.当您开始使用我们的服务时，我们将视为您已经同意了使用协议，即已代表您已经充分了解相关问题，否则后果自负，特此声明！如果部分接口失效请尽快联系我们，我们得到信息后将会第一时间处理（注意：请记得提供有问题的网址）。   联系方式：QQ群：1038095492电子邮箱：wunian@outlook.sg博客(云澜止息）：https://wunian.xyz/");
                return;
            }
            _CONFIG_.currentPlayerNode = playerNode[0];
            mallCase = _CONFIG_.currentPlayerNode.name;
            const targetConsumer = eval(`new ${mallCase}Consumer`);
            targetConsumer.parse();
        }
    }
 
})();
 
(function () {
    superVip.start();
})();