document.addEventListener('DOMContentLoaded', function() {
    const startBuildBtn = document.getElementById('startBuild');
    const buildContainer = document.getElementById('buildContainer');
    const projectDescription = document.getElementById('projectDescription');
    const chatMessages = document.getElementById('chatMessages');
    const viewerContent = document.getElementById('viewerContent');
    const runProjectBtn = document.getElementById('runProject');
    const githubLinkBtn = document.getElementById('githubLink');
    
    let projectFiles = {};
    let projectName = '';
    let githubRepoUrl = '';
    
    startBuildBtn.addEventListener('click', startBuilding);
    
    function startBuilding() {
        const description = projectDescription.value.trim();
        if (!description) {
            alert('يرجى إدخال وصف المشروع');
            return;
        }
        
        projectName = generateProjectName(description);
        document.querySelector('.container').style.display = 'none';
        buildContainer.style.display = 'flex';
        
        addChatMessage('تم استلام وصف المشروع بنجاح.');
        addChatMessage('جارٍ تحليل المتطلبات...');
        
        // محاكاة عملية البناء
        setTimeout(() => {
            addChatMessage('تم فهم المتطلبات، بدء عملية البناء...');
            simulateBuildingProcess(description);
        }, 2000);
    }
    
    function generateProjectName(description) {
        return 'trend-' + description.split(' ')[0].toLowerCase() + '-' + Math.floor(Math.random() * 1000);
    }
    
    function simulateBuildingProcess(description) {
        const statusMessages = [
            'جارٍ تجهيز هيكل المشروع...',
            'إنشاء ملفات التكوين الأساسية...',
            'تحليل المتطلبات الفنية...',
            'بدء توليد الكود...',
            'جارٍ إنشاء ملفات HTML...',
            'جارٍ إنشاء ملفات CSS...',
            'جارٍ إنشاء ملفات JavaScript...',
            'إضافة المكتبات الضرورية...',
            'تحسين الأداء...',
            'إجراء اختبارات أولية...'
        ];
        
        let messageIndex = 0;
        const interval = setInterval(() => {
            if (messageIndex < statusMessages.length) {
                addChatMessage(statusMessages[messageIndex]);
                updateViewerContent(statusMessages[messageIndex]);
                messageIndex++;
            } else {
                clearInterval(interval);
                generateProjectFiles(description);
            }
        }, 2000);
    }
    
    function generateProjectFiles(description) {
        addChatMessage('جارٍ إنشاء الملفات النهائية...');
        
        // محاكاة إنشاء ملفات المشروع
        setTimeout(() => {
            projectFiles = {
                'index.html': '<!DOCTYPE html>\n<html>\n<head>\n    <title>' + description + '</title>\n</head>\n<body>\n    <h1>مرحبًا بك في مشروع ' + description + '</h1>\n</body>\n</html>',
                'css/style.css': 'body { font-family: Arial; text-align: center; }',
                'js/app.js': 'console.log("مشروع ' + description + ' قيد التشغيل");',
                'README.md': '# ' + description + '\n\nمشروع تم إنشاؤه بواسطة Trend AI Builder'
            };
            
            addChatMessage('تم إنشاء جميع الملفات بنجاح.');
            displayFileTree();
            
            setTimeout(() => {
                simulateGithubUpload();
            }, 2000);
        }, 3000);
    }
    
    function displayFileTree() {
        viewerContent.innerHTML = '';
        const fileTree = document.createElement('ul');
        fileTree.className = 'file-tree';
        
        // إنشاء المجلدات والملفات
        const folders = {};
        Object.keys(projectFiles).forEach(filePath => {
            const parts = filePath.split('/');
            if (parts.length > 1) {
                const folderName = parts[0];
                if (!folders[folderName]) {
                    folders[folderName] = [];
                }
                folders[folderName].push(parts.slice(1).join('/'));
            } else {
                const fileItem = document.createElement('li');
                fileItem.className = 'file';
                fileItem.textContent = filePath;
                fileItem.addEventListener('click', () => displayFileContent(filePath));
                fileTree.appendChild(fileItem);
            }
        });
        
        // إضافة المجلدات
        Object.keys(folders).forEach(folder => {
            const folderItem = document.createElement('li');
            folderItem.className = 'folder';
            folderItem.textContent = folder;
            
            const folderFiles = document.createElement('ul');
            folderFiles.className = 'file-tree';
            folders[folder].forEach(file => {
                const fileItem = document.createElement('li');
                fileItem.className = 'file';
                fileItem.textContent = file;
                fileItem.addEventListener('click', () => displayFileContent(folder + '/' + file));
                folderFiles.appendChild(fileItem);
            });
            
            folderItem.appendChild(folderFiles);
            fileTree.appendChild(folderItem);
        });
        
        viewerContent.appendChild(fileTree);
    }
    
    function displayFileContent(filePath) {
        viewerContent.innerHTML = '';
        
        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = filePath;
        viewerContent.appendChild(fileName);
        
        const codeDisplay = document.createElement('div');
        codeDisplay.className = 'code-display';
        codeDisplay.textContent = projectFiles[filePath];
        viewerContent.appendChild(codeDisplay);
    }
    
    function simulateGithubUpload() {
        addChatMessage('جارٍ رفع المشروع إلى GitHub...');
        updateViewerContent('جارٍ رفع المشروع إلى GitHub...');
        
        setTimeout(() => {
            githubRepoUrl = 'https://trend-project.' + projectName + '.Trend-AI-Builder';
            addChatMessage('تم رفع المشروع بنجاح إلى GitHub.');
            addChatMessage('رابط المشروع: ' + githubRepoUrl);
            
            githubLinkBtn.disabled = false;
            githubLinkBtn.onclick = () => window.open(githubRepoUrl, '_blank');
            
            runProjectBtn.disabled = false;
            runProjectBtn.onclick = runProject;
            
            addChatMessage('خارج تجهيز المعينة.');
        }, 3000);
    }
    
    function runProject() {
        addChatMessage('جارٍ تشغيل المشروع...');
        
        setTimeout(() => {
            const projectWindow = window.open('', '_blank');
            projectWindow.document.write(projectFiles['index.html']);
            addChatMessage('تم تشغيل المشروع بنجاح.');
        }, 2000);
    }
    
    function addChatMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function updateViewerContent(message) {
        viewerContent.innerHTML = '<div class="status-message">' + message + '</div>';
    }
});