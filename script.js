// 固定问候语，不根据访问者时区变化
function getGreeting() {
    return 'Greetings!';
}


// 页面加载时设置问候语
window.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');

    if (greetingElement) {
        greetingElement.textContent = getGreeting();
    }
});


// ======================================================
// 移动端菜单
// ======================================================

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

    // 点击汉堡按钮
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('active');
        setMobileMenuOpen(!isOpen);
    });


    // 点击导航链接后关闭菜单
    document.querySelectorAll('.nav-link').forEach(link => {

        link.addEventListener('click', () => {
            setMobileMenuOpen(false);
        });

    });


    // 窗口恢复到桌面尺寸时关闭移动端菜单
    window.addEventListener('resize', () => {

        if (window.innerWidth > 768) {
            setMobileMenuOpen(false);
        }

    });

}


// ======================================================
// 平滑滚动
// ======================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    });

});


// ======================================================
// 导航栏滚动效果
// ======================================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    if (!navbar) {
        return;
    }

    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {

        navbar.style.boxShadow =
            '0 4px 6px -1px rgba(0, 0, 0, 0.1)';

    } else {

        navbar.style.boxShadow =
            '0 4px 6px -1px rgba(0, 0, 0, 0.1)';

    }

});


// ======================================================
// 当前页面区域导航高亮
// ======================================================

const sections = Array.from(
    document.querySelectorAll('section[id]')
);

const navLinks = Array.from(
    document.querySelectorAll('.nav-link')
);


if (
    sections.length &&
    navLinks.length &&
    'IntersectionObserver' in window
) {

    const sectionObserver = new IntersectionObserver(

        (entries) => {

            // 找到当前最明显的 section
            const visibleSections = entries
                .filter(entry => entry.isIntersecting)
                .sort(
                    (a, b) =>
                        b.intersectionRatio -
                        a.intersectionRatio
                );

            const visible = visibleSections[0];

            if (!visible) {
                return;
            }


            // 更新导航栏 active 状态
            navLinks.forEach(link => {

                const targetId = link.getAttribute('href');

                link.classList.toggle(
                    'active',
                    targetId === `#${visible.target.id}`
                );

            });


            // 手机端：
            // 自动把当前 active 的导航项目移动到中间
            if (window.innerWidth <= 768) {

                const activeLink = navLinks.find(
                    link =>
                        link.getAttribute('href') ===
                        `#${visible.target.id}`
                );

                if (activeLink) {

                    activeLink.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });

                }

            }

        },

        {
            // 让 section 在屏幕中部附近被认为是当前 section
            rootMargin: '-20% 0px -65% 0px',

            threshold: [
                0.05,
                0.2,
                0.5
            ]
        }

    );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


// ======================================================
// 技能条动画
// ======================================================

const observerOptions = {

    threshold: 0.5,

    rootMargin: '0px'

};


const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const skillBars =
                    entry.target.querySelectorAll('.skill-bar');


                skillBars.forEach(bar => {

                    const width = bar.style.width;

                    // 先归零
                    bar.style.width = '0';


                    // 再恢复到原来的宽度
                    setTimeout(() => {

                        bar.style.width = width;

                    }, 100);

                });


                observer.unobserve(entry.target);

            }

        });

    },

    observerOptions

);


const skillsSection =
    document.querySelector('.skills-section') ||
    document.querySelector('.skills');


if (skillsSection) {

    observer.observe(skillsSection);

}


// ======================================================
// 表单提交处理
// ======================================================

const contactForm =
    document.querySelector('.contact-form');


if (contactForm) {

    contactForm.addEventListener('submit', (e) => {

        e.preventDefault();


        // 获取表单数据
        const formData = new FormData(contactForm);

        const name =
            contactForm.querySelector(
                'input[type="text"]'
            )?.value || '';

        const email =
            contactForm.querySelector(
                'input[type="email"]'
            )?.value || '';

        const message =
            contactForm.querySelector(
                'textarea'
            )?.value || '';


        // 当前仅在控制台输出
        console.log('表单数据:', {
            name,
            email,
            message
        });


        // 显示成功消息
        alert(
            'Thank you for your message! I will get back to you soon.'
        );


        // 重置表单
        contactForm.reset();

    });

}


// ======================================================
// 页面加载动画
// ======================================================

window.addEventListener('load', () => {

    document.body.style.opacity = '0';


    setTimeout(() => {

        document.body.style.transition =
            'opacity 0.5s ease';

        document.body.style.opacity = '1';

    }, 100);

});


// ======================================================
// 滚动时显示元素
// ======================================================

const fadeElements = document.querySelectorAll(
    '.skill-card, .project-card, .stat-item'
);


if (
    fadeElements.length &&
    'IntersectionObserver' in window
) {

    const fadeObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry, index) => {

                if (entry.isIntersecting) {

                    setTimeout(() => {

                        entry.target.style.opacity = '1';

                        entry.target.style.transform =
                            'translateY(0)';

                    }, index * 100);


                    fadeObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.1
        }

    );


    fadeElements.forEach(element => {

        element.style.opacity = '0';

        element.style.transform =
            'translateY(20px)';

        element.style.transition =
            'opacity 0.6s ease, transform 0.6s ease';


        fadeObserver.observe(element);

    });

}