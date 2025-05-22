document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const projectsContainer = document.getElementById('projects-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const languageToggle = document.querySelector('.language-toggle');
    const languageSelector = document.querySelector('.language-selector');
    const languageOptions = document.querySelectorAll('.language-dropdown a');

    // 语言翻译
    const translations = {
        'zh': {
            'subtitle': '高质量Java开源项目集合',
            'explore': '探索优秀的Java开源项目',
            'description': 'OpenQuartz提供简洁、高效、可靠的Java开源解决方案',
            'searchPlaceholder': '搜索项目...',
            'projectList': '项目列表',
            'copyright': '© 2023 OpenQuartz. 所有项目基于各自的开源协议。',
            'noResults': '没有找到匹配的项目'
        },
        'en': {
            'subtitle': 'High-quality Java Open Source Projects',
            'explore': 'Explore Excellent Java Open Source Projects',
            'description': 'OpenQuartz provides simple, efficient, and reliable Java open source solutions',
            'searchPlaceholder': 'Search projects...',
            'projectList': 'Project List',
            'copyright': '© 2023 OpenQuartz. All projects are based on their respective open source licenses.',
            'noResults': 'No matching projects found'
        }
    };

    // 初始化显示所有项目
    displayProjects(projects);

    // 搜索功能
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // 语言切换功能
    languageToggle.addEventListener('click', function() {
        languageSelector.classList.toggle('active');
    });

    // 点击其他地方关闭语言下拉菜单
    document.addEventListener('click', function(event) {
        if (!languageSelector.contains(event.target)) {
            languageSelector.classList.remove('active');
        }
    });

    // 语言选择
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            languageSelector.classList.remove('active');
        });
    });

    // 切换语言
    function changeLanguage(lang) {
        document.documentElement.setAttribute('data-lang', lang);
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        
        // 更新所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // 更新所有带有 data-i18n-placeholder 属性的元素
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // 重新显示项目，使用正确的语言描述
        displayProjects(projects);
    }

    // 执行搜索
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            displayProjects(projects);
            return;
        }

        const filteredProjects = projects.filter(project => {
            return (
                project.name.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.descriptionEn.toLowerCase().includes(searchTerm) ||
                project.language.toLowerCase().includes(searchTerm)
            );
        });

        displayProjects(filteredProjects);
    }

    // 显示项目列表
    function displayProjects(projectsToDisplay) {
        // 清空容器
        projectsContainer.innerHTML = '';

        if (projectsToDisplay.length === 0) {
            const lang = document.documentElement.getAttribute('data-lang') || 'zh';
            projectsContainer.innerHTML = `<div class="no-results">${translations[lang]['noResults']}</div>`;
            return;
        }

        // 为每个项目创建卡片
        projectsToDisplay.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsContainer.appendChild(projectCard);
        });
    }

    // 创建项目卡片
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';

        const lang = document.documentElement.getAttribute('data-lang') || 'zh';
        const description = lang === 'zh' ? project.description : project.descriptionEn;

        card.innerHTML = `
            <div class="project-content">
                <h3 class="project-title">
                    <a href="${project.url}" target="_blank">${project.name}</a>
                </h3>
                <p class="project-description">${description}</p>
                <div class="project-meta">
                    <div class="project-stats">
                        <div class="project-stat">
                            <i class="fas fa-star"></i> ${project.stars}
                        </div>
                        <div class="project-stat">
                            <i class="fas fa-code-branch"></i> ${project.forks}
                        </div>
                    </div>
                    <div class="project-language">
                        <span class="language-color java-color"></span>
                        ${project.language}
                    </div>
                </div>
            </div>
        `;

        return card;
    }
});