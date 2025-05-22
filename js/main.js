document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const projectsContainer = document.getElementById('projects-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // 初始化显示所有项目
    displayProjects(projects);

    // 搜索功能
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

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
            projectsContainer.innerHTML = '<div class="no-results">没有找到匹配的项目</div>';
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

        card.innerHTML = `
            <div class="project-content">
                <h3 class="project-title">
                    <a href="${project.url}" target="_blank">${project.name}</a>
                </h3>
                <p class="project-description">${project.description}</p>
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