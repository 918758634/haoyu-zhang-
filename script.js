function createPetals() {
    const petalsContainer = document.getElementById('petals');
    const petalCount = 13;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = '🌸';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 8) + 's';
        petal.style.animationDelay = (Math.random() * 10) + 's';
        petal.style.fontSize = (Math.random() * 10 + 15) + 'px';
        petalsContainer.appendChild(petal);
    }
}

function updateCountdown() {
    const weddingDate = new Date('2026-06-06T11:30:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

let isPlaying = false;
document.getElementById('musicBtn').addEventListener('click', function() {
    this.classList.toggle('playing');
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        this.title = '暂停音乐';
    } else {
        this.title = '播放音乐';
    }
});

document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    
    if (attendance === 'yes') {
        alert(`感谢 ${name} 的回执！我们期待在婚礼上见到您！💕`);
    } else {
        alert(`感谢 ${name} 的回执！虽然无法到场，但您的祝福我们已收到！💕`);
    }
    
    this.reset();
});

createPetals();
updateCountdown();
setInterval(updateCountdown, 1000);
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ======================================
// 分享功能
// ======================================
function shareWedding() {
    const shareData = {
        title: '张浩宇 & 王萌 的婚礼邀请函',
        text: '诚挚邀请您见证我们的幸福时刻，2026年6月6日 · 张家口市国际大酒店',
        url: window.location.href
    };

    // 尝试使用原生分享API
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('分享成功'))
            .catch(err => console.log('分享失败:', err));
    } else {
        // 复制链接到剪贴板
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('链接已复制到剪贴板！\n请粘贴到微信发送给朋友~');
        }).catch(() => {
            prompt('请复制以下链接分享：', url);
        });
    }
}

// 页面加载完成后
document.addEventListener('DOMContentLoaded', function() {
    // 在页面底部添加分享按钮
    const shareBtn = document.createElement('button');
    shareBtn.innerHTML = '📤 分享邀请函';
    shareBtn.className = 'share-btn';
    shareBtn.onclick = shareWedding;
    shareBtn.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;padding:12px 20px;background:#d4a574;color:white;border:none;border-radius:25px;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;';
    document.body.appendChild(shareBtn);
});