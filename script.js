// 问候语直接写在 HTML 中，避免受访问者时区和缓存影响

// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function setMobileMenuOpen(isOpen) {
    if (!navMenu || !hamburger) {
        return;
    }
    navMenu.classList.toggle('active', isOpen);
    hamburger.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        setMobileMenuOpen(!navMenu.classList.contains('active'));
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            setMobileMenuOpen(false);
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            setMobileMenuOpen(false);
        }
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});



// 当前页面区域导航高亮：桌面和手机端均可用
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        const visible = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${visible.target.id}`
            );
        });

        // 手机端自动把当前导航项滚动到可视区域
        if (window.innerWidth <= 768) {
            const activeLink = navLinks.find(
                link => link.getAttribute('href') === `#${visible.target.id}`
            );
            activeLink?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }, {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0.05, 0.2, 0.5]
    });

    sections.forEach(section => sectionObserver.observe(section));
}

// 技能条动画
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section') || document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// 表单提交处理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // 这里可以添加实际的表单提交逻辑
        // 例如发送到服务器或使用邮件服务
        console.log('表单数据:', { name, email, message });
        
        // 显示成功消息
        alert('Thank you for your message! I will get back to you soon.');
        
        // 重置表单
        contactForm.reset();
    });
}

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 滚动时显示/隐藏元素
const fadeElements = document.querySelectorAll('.skill-card, .project-card, .stat-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// 电脑端：点击 logo 展开/收起竖向菜单
const navBrand = document.querySelector('.nav-brand');

if (navBrand && navMenu && window.matchMedia('(min-width: 769px)').matches) {
    const closeMenu = () => {
        navMenu.classList.remove('active');
        navBrand.classList.remove('open');
    };

    // 点击 logo：切换展开状态 + 箭头旋转 + 标记"已提示过"
    navBrand.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle('active');
        navBrand.classList.toggle('open', isOpen);
        navBrand.classList.add('hinted');
    });

    // 点击任一菜单链接后自动收起
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 点击页面任意其他位置，收起菜单
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navBrand.contains(e.target)) {
            closeMenu();
        }
    });
}

// 深色模式开关（默认夜间模式，由 index.html 内联脚本先行写入 class）
const themeToggle = document.getElementById('theme-toggle');
const themeHint = document.getElementById('theme-hint');

// 同步按钮图标与提示文字
function syncThemeUI() {
    const isDark = document.body.classList.contains('dark-mode');
    if (themeToggle) {
        themeToggle.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
    if (themeHint) {
        themeHint.textContent = isDark ? 'turn on the light' : 'turn off the light';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        // 记住选择；用户切回过浅色后，下次打开即保持浅色
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        syncThemeUI();
    });
}

syncThemeUI();
