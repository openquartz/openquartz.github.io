document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const projectsContainer = document.getElementById('projects-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const languageToggle = document.querySelector('.language-toggle');
    const languageSelector = document.querySelector('.language-selector');
    const languageOptions = document.querySelectorAll('.language-dropdown a');
    const tagFilterContainer = document.getElementById('tag-filter');
    const paginationContainer = document.getElementById('pagination');
    
    // 分页设置
    let currentPage = 1;
    const projectsPerPage = 6;
    let filteredProjects = [];
    
    // 当前选中的标签
    let selectedTags = [];

    // 语言翻译
    const translations = {
        'zh': {
            'subtitle': '高质量Java开源项目集合',
            'explore': '探索优秀的Java开源项目',
            'description': 'OpenQuartz提供简洁、高效、可靠的Java开源解决方案',
            'searchPlaceholder': '搜索项目...',
            'projectList': '项目列表',
            'copyright': '© 2023 OpenQuartz. 所有项目基于各自的开源协议。',
            'noResults': '没有找到匹配的项目',
            'allTags': '全部',
            'prev': '上一页',
            'next': '下一页'
        },
        'en': {
            'subtitle': 'High-quality Java Open Source Projects',
            'explore': 'Explore Excellent Java Open Source Projects',
            'description': 'OpenQuartz provides simple, efficient, and reliable Java open source solutions',
            'searchPlaceholder': 'Search projects...',
            'projectList': 'Project List',
            'copyright': '© 2023 OpenQuartz. All projects are based on their respective open source licenses.',
            'noResults': 'No matching projects found',
            'allTags': 'All',
            'prev': 'Previous',
            'next': 'Next'
        }
    };

    // 初始化显示所有项目
    fetchGitHubStats(projects).then(() => {
        filteredProjects = [...projects];
        initTagFilter();
        displayProjects(filteredProjects);
    });
    
    // 初始化标签过滤器
    function initTagFilter() {
        // 收集所有唯一标签
        const allTags = new Set();
        projects.forEach(project => {
            if (project.tags && Array.isArray(project.tags)) {
                project.tags.forEach(tag => allTags.add(tag));
            }
        });
        
        // 清空标签容器
        tagFilterContainer.innerHTML = '';
        
        // 获取当前语言
        const lang = document.documentElement.getAttribute('data-lang') || 'zh';
        
        // 添加"全部"标签
        const allTagElement = document.createElement('span');
        allTagElement.className = 'tag active';
        allTagElement.textContent = translations[lang]['allTags'];
        allTagElement.setAttribute('data-tag', 'all');
        allTagElement.addEventListener('click', () => filterByTag('all'));
        tagFilterContainer.appendChild(allTagElement);
        
        // 添加其他标签
        Array.from(allTags).sort().forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagElement.setAttribute('data-tag', tag);
            tagElement.addEventListener('click', () => filterByTag(tag));
            tagFilterContainer.appendChild(tagElement);
        });
    }
    
    // 根据标签过滤项目
    function filterByTag(tag) {
        // 更新标签选中状态
        document.querySelectorAll('.tag').forEach(tagElement => {
            if (tag === 'all') {
                tagElement.classList.toggle('active', tagElement.getAttribute('data-tag') === 'all');
                selectedTags = [];
            } else {
                if (tagElement.getAttribute('data-tag') === 'all') {
                    tagElement.classList.remove('active');
                }
                
                if (tagElement.getAttribute('data-tag') === tag) {
                    tagElement.classList.toggle('active');
                    
                    // 更新选中的标签列表
                    if (tagElement.classList.contains('active')) {
                        selectedTags.push(tag);
                    } else {
                        selectedTags = selectedTags.filter(t => t !== tag);
                    }
                }
            }
        });
        
        // 如果没有选中的标签，自动选中"全部"
        if (selectedTags.length === 0) {
            document.querySelector('.tag[data-tag="all"]').classList.add('active');
        }
        
        // 过滤项目
        filterProjects();
    }

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
        
        // 重置到第一页
        currentPage = 1;
        
        // 更新标签过滤器
        initTagFilter();

        // 重新显示项目，使用正确的语言描述
        displayProjects(filteredProjects);
    }

    // 执行搜索
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        filterProjects(searchTerm);
    }
    
    // 过滤项目（结合搜索词和标签）
    function filterProjects(searchTerm = null) {
        // 如果没有提供搜索词，使用当前输入框的值
        if (searchTerm === null) {
            searchTerm = searchInput.value.toLowerCase().trim();
        }
        
        // 重置到第一页
        currentPage = 1;
        
        // 根据搜索词和标签过滤项目
        filteredProjects = projects.filter(project => {
            // 搜索词过滤
            const matchesSearch = searchTerm === '' || (
                project.name.toLowerCase().includes(searchTerm) ||
                project.description.toLowerCase().includes(searchTerm) ||
                project.descriptionEn.toLowerCase().includes(searchTerm) ||
                project.language.toLowerCase().includes(searchTerm) ||
                (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
            );
            
            // 标签过滤
            const matchesTags = selectedTags.length === 0 || 
                (project.tags && selectedTags.every(tag => project.tags.includes(tag)));
            
            return matchesSearch && matchesTags;
        });
        
        // 显示过滤后的项目
        displayProjects(filteredProjects);
    }

    // 获取GitHub项目统计信息
    async function fetchGitHubStats(projectsList) {
        const CACHE_KEY = 'github_stats_cache';
        const CACHE_EXPIRY = 10 * 60 * 1000; // 10分钟，单位毫秒
        
        // 尝试从缓存获取数据
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            try {
                const cache = JSON.parse(cachedData);
                const now = new Date().getTime();
                
                // 检查缓存是否过期
                if (cache.timestamp && (now - cache.timestamp) < CACHE_EXPIRY) {
                    console.log('使用缓存的GitHub统计数据');
                    
                    // 将缓存的stars和forks数据应用到项目
                    projectsList.forEach(project => {
                        const cachedProject = cache.projects.find(p => p.name === project.name);
                        if (cachedProject) {
                            project.stars = cachedProject.stars;
                            project.forks = cachedProject.forks;
                        }
                    });
                    
                    return projectsList;
                }
            } catch (error) {
                console.error('解析缓存数据出错:', error);
                // 缓存解析错误，继续获取新数据
            }
        }
        
        // 缓存不存在、已过期或解析错误，从GitHub API获取新数据
        const promises = projectsList.map(async (project) => {
            // 跳过没有GitHub URL的项目
            if (!project.url || !project.url.includes('github.com')) {
                return project;
            }
            
            try {
                // 从URL中提取owner和repo
                const urlParts = project.url.split('github.com/');
                if (urlParts.length < 2) return project;
                
                const repoPath = urlParts[1];
                if (!repoPath) return project;
                
                // 调用GitHub API
                const response = await fetch(`https://api.github.com/repos/${repoPath}`);
                if (response.ok) {
                    const data = await response.json();
                    // 更新stars和forks数据
                    project.stars = data.stargazers_count;
                    project.forks = data.forks_count;
                }
            } catch (error) {
                console.error(`获取${project.name}统计信息出错:`, error);
            }
            return project;
        });
        
        await Promise.all(promises);
        
        // 更新缓存
        try {
            const cacheData = {
                timestamp: new Date().getTime(),
                projects: projectsList.map(project => ({
                    name: project.name,
                    stars: project.stars,
                    forks: project.forks
                }))
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
            console.log('GitHub统计数据已缓存');
        } catch (error) {
            console.error('缓存GitHub统计数据出错:', error);
        }
        
        return projectsList;
    }

    // 显示项目列表（带分页）
    function displayProjects(projectsToDisplay) {
        // 清空容器
        projectsContainer.innerHTML = '';

        if (projectsToDisplay.length === 0) {
            const lang = document.documentElement.getAttribute('data-lang') || 'zh';
            projectsContainer.innerHTML = `<div class="no-results">${translations[lang]['noResults']}</div>`;
            paginationContainer.innerHTML = '';
            return;
        }
        
        // 计算分页
        const totalPages = Math.ceil(projectsToDisplay.length / projectsPerPage);
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = Math.min(startIndex + projectsPerPage, projectsToDisplay.length);
        
        // 显示当前页的项目
        for (let i = startIndex; i < endIndex; i++) {
            const projectCard = createProjectCard(projectsToDisplay[i]);
            projectsContainer.appendChild(projectCard);
        }
        
        // 更新分页控制
        updatePagination(totalPages);
    }
    
    // 更新分页控制
    function updatePagination(totalPages) {
        paginationContainer.innerHTML = '';
        
        if (totalPages <= 1) {
            return;
        }
        
        // 获取当前语言
        const lang = document.documentElement.getAttribute('data-lang') || 'zh';
        
        // 添加上一页按钮
        const prevButton = document.createElement('button');
        prevButton.className = `pagination-button ${currentPage === 1 ? 'disabled' : ''}`;
        prevButton.innerHTML = '&laquo;';
        prevButton.title = translations[lang]['prev'];
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayProjects(filteredProjects);
            }
        });
        paginationContainer.appendChild(prevButton);
        
        // 添加页码按钮
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        // 调整起始页，确保显示足够的页码
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = `pagination-button ${i === currentPage ? 'active' : ''}`;
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayProjects(filteredProjects);
            });
            paginationContainer.appendChild(pageButton);
        }
        
        // 添加下一页按钮
        const nextButton = document.createElement('button');
        nextButton.className = `pagination-button ${currentPage === totalPages ? 'disabled' : ''}`;
        nextButton.innerHTML = '&raquo;';
        nextButton.title = translations[lang]['next'];
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayProjects(filteredProjects);
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    // 创建项目卡片
    function createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';

        const lang = document.documentElement.getAttribute('data-lang') || 'zh';
        const description = lang === 'zh' ? project.description : project.descriptionEn;
        
        // 生成标签HTML
        let tagsHtml = '';
        if (project.tags && project.tags.length > 0) {
            tagsHtml = '<div class="project-tags">';
            project.tags.forEach(tag => {
                tagsHtml += `<span class="project-tag">${tag}</span>`;
            });
            tagsHtml += '</div>';
        }

        card.innerHTML = `
            <div class="project-content">
                <h3 class="project-title">
                    <a href="${project.url}" target="_blank">${project.name}</a>
                </h3>
                <p class="project-description">${description}</p>
                ${tagsHtml}
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