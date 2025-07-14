document.addEventListener('DOMContentLoaded', function() {
    // 生成星空效果
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.background = 'white';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = 'twinkle ' + (Math.random() * 2 + 1) + 's infinite';
        starsContainer.appendChild(star);
    }

    // 获取文件列表的函数
    function fetchFiles(folder, listId) {
        fetch(`https://api.github.com/repos/bblaaccktech/bblaaccktech.github.io/contents/${folder}`)
            .then(response => response.json())
            .then(data => {
                const list = document.getElementById(listId);
                list.innerHTML = ''; // 清空现有列表
                if (Array.isArray(data)) {
                    data.forEach(file => {
                        if (file.type === 'file') {
                            const li = document.createElement('li');
                            const a = document.createElement('a');
                            a.href = `${folder}/${file.name}`;
                            a.textContent = file.name;
                            li.appendChild(a);
                            list.appendChild(li);
                        }
                    });
                } else {
                    list.innerHTML = '<li>未找到文件</li>';
                }
            })
            .catch(error => {
                console.error('Error fetching files:', error);
                document.getElementById(listId).innerHTML = '<li>加载文件失败</li>';
            });
    }

    // 定期刷新文件列表
    function refreshFiles() {
        fetchFiles('forensics', 'forensics-list');
        fetchFiles('information-security', 'information-security-list');
        fetchFiles('large-models', 'large-models-list');
    }

    // 初始加载和每10秒刷新一次
    refreshFiles();
    setInterval(refreshFiles, 10000); // 每10秒刷新一次
});
