document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .custom-menu {
            position: fixed;
            background: white;
            border: 1px solid #ccc;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
            padding: 5px 0;
            display: none;
            z-index: 9999;
            list-style-type: none;
            margin: 0;
            padding: 5px;
            min-width: 150px;
        }
        
        .custom-menu li {
            padding: 8px 15px;
            cursor: pointer;
        }
        
        .custom-menu li:hover {
            background-color: #f0f0f0;
        }
    `;
    document.head.appendChild(style);
    const menu = document.createElement('ul');
    menu.className = 'custom-menu';
    menu.innerHTML = `
        <li>刷新页面</li>
        <li>分享网站</li>
        <li>去往博客</li>
        <li>影视学习</li>
        <li>QQ群:1038095492</li>
    `;
    document.body.appendChild(menu);

    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        
        menu.style.display = 'block';
        const menuRect = menu.getBoundingClientRect();
        let menuLeft = e.pageX;
        let menuTop = e.pageY;

        if (menuLeft + menuRect.width > window.innerWidth) {
            menuLeft = window.innerWidth - menuRect.width;
        }
        if (menuTop + menuRect.height > window.innerHeight) {
            menuTop = e.pageY - menuRect.height;
        }
        menuLeft = Math.max(0, menuLeft);
        menuTop = Math.max(0, menuTop);

        menu.style.left = menuLeft + 'px';
        menu.style.top = menuTop + 'px';

        const hideMenu = () => {
            menu.style.display = 'none';
            document.removeEventListener('click', hideMenu);
        };
        document.addEventListener('click', hideMenu);
    });

    menu.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent;
            if (text === '刷新页面') location.reload();
            else if (text === '分享网站') copyURL();
            else if (text === '去往博客') window.open('https://wunian.xyz/', '_blank');
            else if (text === '影视学习') window.open('https://wunian.netlify.app/', '_blank');
            else if (text === 'QQ群:1038095492') window.open('https://qm.qq.com/q/9iwS7ReiGY', '_blank');
        });
    });

    function copyURL() {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('已复制链接到剪贴板'))
            .catch(err => console.error('复制失败:', err));
    }
});