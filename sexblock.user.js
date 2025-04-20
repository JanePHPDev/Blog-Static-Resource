// ==UserScript==
// @name         网站访问限制
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  拦截特定网站并显示警告页面
// @author       你
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // 从配置文件加载阻止的网站列表
    function loadBlocklist() {
        return GM_xmlhttpRequest({
            method: "GET",
            url: "https://cdn.mengze.vip/gh/YShenZe/Blog-Static-Resource@main/sexlist.txt", // 替换为你的文件URL
            onload: function(response) {
                processBlocklist(response.responseText);
            },
            onerror: function() {
                console.error("无法加载阻止列表文件");
            }
        });
    }

    // 处理阻止列表
    function processBlocklist(blocklistText) {
        const blocklist = blocklistText.split(/\r?\n/).map(site => site.trim()).filter(site => site);
        
        // 获取当前页面的域名
        const currentDomain = window.location.hostname;
        
        // 检查当前域名是否在阻止列表中
        if (blocklist.some(site => currentDomain.includes(site))) {
            showWarningPage();
        }
    }

    // 显示警告页面
    function showWarningPage() {
        // 创建警告页面元素
        const warningDiv = document.createElement('div');
        warningDiv.style.position = 'fixed';
        warningDiv.style.top = '0';
        warningDiv.style.left = '0';
        warningDiv.style.width = '100%';
        warningDiv.style.height = '100%';
        warningDiv.style.backgroundColor = 'white';
        warningDiv.style.zIndex = '999999';
        warningDiv.style.display = 'flex';
        warningDiv.style.flexDirection = 'column';
        warningDiv.style.justifyContent = 'center';
        warningDiv.style.alignItems = 'center';
        warningDiv.style.textAlign = 'center';
        
        // 添加警告信息
        const warningText = document.createElement('h1');
        warningText.style.color = 'red';
        warningText.style.fontSize = '36px';
        warningText.style.margin = '0';
        warningText.textContent = '禁止访问';
        
        const reasonText = document.createElement('p');
        reasonText.style.color = 'red';
        reasonText.style.fontSize = '24px';
        reasonText.style.margin = '20px 0';
        reasonText.textContent = '少看这些网站对身体有益！';
        
        const backText = document.createElement('p');
        backText.style.color = 'blue';
        backText.style.margin = '20px 0';
        backText.textContent = '5秒后自动返回...';
        
        // 添加到警告页面
        warningDiv.appendChild(warningText);
        warningDiv.appendChild(reasonText);
        warningDiv.appendChild(backText);
        
        // 添加到页面
        document.body.appendChild(warningDiv);
        
        // 自动返回
        let seconds = 5;
        const interval = setInterval(() => {
            seconds--;
            backText.textContent = `${seconds}秒后自动返回...`;
            if (seconds <= 0) {
                clearInterval(interval);
                window.history.back();
            }
        }, 1000);
    }

    // 加载阻止列表
    loadBlocklist();
})();