  // ===== ДАННЫЕ ДЛЯ КОЛЛЕКЦИЙ =====
const exhibitsData = [
    {
        id: 1,
        name: "Греческая ваза",
        period: "Древняя Греция, XIV век до н.э.",
        category: "greece",
        image: "img/греческая ваза.jpg",
        description: "Терракотовая ваза в форме граната, украшенная геометрическим орнаментом."
    },
    {
        id: 2,
        name: "Египетское творение",
        period: "Египет, XIV век до н.э.",
        category: "egypt",
        image: "img/экспонат недели.jpg",
        description: "Коллекция египетских ваз с необычными рисунками."
    },
    {
        id: 3,
        name: "Топор викингов",
        period: "Скандинавия, IX век",
        category: "viking",
        image: "img/topor1.jpg",
        description: "Боевой топор с руническими надписями, призывающими победу."
    },
    {
        id: 4,
        name: "Японская ваза",
        period: "Япония, период Эдо",
        category: "japan",
        image: "img/японская ваза1.jpg",
        description: "Керамическая ваза с изображением сакуры и журавлей, символ долголетия."
    },
    {
        id: 5,
        name: "Китайская игрушка",
        period: "Китай, династия Тан",
        category: "china",
        image: "img/китайская игрушка1.jpg",
        description: "Kimmidoll — декоративная кукла, продолжающая традиции японских кокэси; украшена цветочным орнаментом и узором кимоно, символизирует гармонию и красоту."
    },
    {
        id: 6,
        name: "Рыцарский меч",
        period: "Европа, XII век",
        category: "medieval",
        image: "img/рыцарский меч.jpg",
        description: "Двуручный меч тамплиеров с инкрустацией из серебра."
    },
    {
        id: 7,
        name: "Китайская фигурка кота",
        period: "Китай, XIII век",
        category: "china",
        image: "img/китайский котик.jpg",
        description: "Белая керамическая фигурка котика, которая приносит богатство и удачу."
    },
    {
        id: 8,
        name: "Шлем викинга",
        period: "Скандинавия, VIII век",
        category: "viking",
        image: "img/шлем викинга.jpg",
        description: "Железный шлем с рогами, металл которого несёт следы времени и битв."
    },
    {
        id: 9,
        name: "Катана самурая",
        period: "Япония, XV век",
        category: "japan",
        image: "img/катана самурая.jpg",
        description: "Легендарный меч самурая с узором хамон на лезвии."
    }
];

// ===== ФУНКЦИИ ДЛЯ СТРАНИЦЫ КОЛЛЕКЦИЙ =====
function displayExhibits(filter = "all") {
    const grid = document.getElementById("collectionsGrid");
    if (!grid) return;  
    
    let filteredExhibits = exhibitsData;
    if (filter !== "all") {
        filteredExhibits = exhibitsData.filter(ex => ex.category === filter);
    }
    
    grid.innerHTML = "";
    
    if (filteredExhibits.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column:1/-1;">Экспонатов не найдено</p>';
        return;
    }
    
    filteredExhibits.forEach(exhibit => {
        const card = document.createElement("div");
        card.className = "collection-card";
        card.innerHTML = `
            <img src="${exhibit.image}" alt="${exhibit.name}">
            <div class="card-info">
                <h3>${exhibit.name}</h3>
                <div class="card-period">📅 ${exhibit.period}</div>
                <div class="card-desc">${exhibit.description}</div>
                <button class="btn-3d" data-id="${exhibit.id}">🔍 Смотреть в 3D</button>
            </div>
        `;
        grid.appendChild(card);
    });
    
    document.querySelectorAll('.btn-3d').forEach(btn => {
        if (!btn.hasAttribute('data-processed')) {
            btn.setAttribute('data-processed', 'true');
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.getAttribute('data-id');
                const exhibit = exhibitsData.find(ex => ex.id == id);
                showModal(`3D-модель: ${exhibit.name}`, `
                    <div style="text-align:center;">
                        <img src="${exhibit.image}" style="max-width:100%; border-radius:10px; margin:10px 0;">
                        <p><strong>${exhibit.name}</strong></p>
                        <p>${exhibit.description}</p>
                        <button onclick="closeModal()" style="background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Закрыть</button>
                    </div>
                `);
            });
        }
    });
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        if (!btn.hasAttribute('data-processed')) {
            btn.setAttribute('data-processed', 'true');
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                displayExhibits(filter);
            });
        }
    });
}

// ===== ФУНКЦИИ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ =====
function setupMainPage() {
    document.querySelectorAll('.watch-btn').forEach(btn => {
        if (!btn.hasAttribute('data-processed')) {
            btn.setAttribute('data-processed', 'true');
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.widget');
                const title = card ? card.querySelector('h3').textContent : 'экспонат';
                showModal(`3D-модель: ${title}`, `
                    <div style="text-align:center;">
                        <p>🎥 3D-модель "${title}" будет доступна в ближайшее время</p>
                        <button onclick="closeModal()" style="background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Закрыть</button>
                    </div>
                `);
            });
        }
    });
    
    document.querySelectorAll('.quick-btn').forEach(btn => {
        if (!btn.hasAttribute('data-processed')) {
            btn.setAttribute('data-processed', 'true');
            btn.addEventListener('click', () => {
                showModal(`Раздел: ${btn.textContent}`, `
                    <div style="text-align:center;">
                        <p>📖 Раздел "${btn.textContent}" скоро будет доступен</p>
                        <button onclick="closeModal()" style="background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Закрыть</button>
                    </div>
                `);
            });
        }
    });
    
    const tourBtn = document.querySelector('.tour');
    if (tourBtn && !tourBtn.hasAttribute('data-processed')) {
        tourBtn.setAttribute('data-processed', 'true');
        tourBtn.addEventListener('click', () => {
            startVirtualTour();
        });
    }
    
    const excursionBtn = document.querySelector('.excursion');
    if (excursionBtn && !excursionBtn.hasAttribute('data-processed')) {
        excursionBtn.setAttribute('data-processed', 'true');
        excursionBtn.addEventListener('click', () => {
            showExcursionsList();
        });
    }
    
    const searchBtn = document.querySelector('.search');
    if (searchBtn && !searchBtn.hasAttribute('data-processed')) {
        searchBtn.setAttribute('data-processed', 'true');
        searchBtn.addEventListener('click', () => {
            const query = prompt('Введите название экспоната или эпоху:');
            if (query) {
                showModal(`Результаты поиска: "${query}"`, `
                    <div>
                        <p>🔍 Найдено 3 результата:</p>
                        <ul>
                            <li>Египетское творение</li>
                            <li>Греческая ваза</li>
                            <li>Японская ваза</li>
                        </ul>
                        <button onclick="closeModal()" style="background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Закрыть</button>
                    </div>
                `);
            }
        });
    }
}

// ===== МОДАЛЬНОЕ ОКНО =====
function showModal(title, content) {
    const existingModal = document.querySelector('.custom-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: #F5F0E6;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            padding: 20px;
            position: relative;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease;
        ">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #D2B48C; padding-bottom: 10px; margin-bottom: 15px;">
                <h3 style="color: #5C4033; margin: 0;">${title}</h3>
                <button onclick="closeModal()" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #5C4033;">&times;</button>
            </div>
            <div>${content}</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
}

function closeModal() {
    const modal = document.querySelector('.custom-modal');
    if (modal) modal.remove();
}

// ===== ВИРТУАЛЬНЫЙ ТУР =====
function startVirtualTour() {
    let step = 0;
    const tourSteps = [
        { title: "🏛️ Добро пожаловать в виртуальный тур!", content: "Сегодня мы посетим главные залы нашего музея. Нажмите 'Далее', чтобы продолжить." },
        { title: "🏺 Зал Древнего Египта", content: "Здесь вы можете увидеть уникальные египетские вазы с необычными рисунками, датированные XIV веком до н.э." },
        { title: "⚔️ Зал Средневековья", content: "В этом зале представлены рыцарские доспехи, мечи и топоры викингов. Особый интерес вызывает двуручный меч тамплиеров с серебряной инкрустацией." },
        { title: "🏮 Азиатский зал", content: "Коллекция японских и китайских ваз, а также традиционные игрушки и керамические фигурки. Катана самурая XV века - жемчужина коллекции!" },
        { title: "🎓 Завершение тура", content: "Спасибо за виртуальную экскурсию! Ждём вас в нашем музее очно. До встречи!" }
    ];
    
    function showTourStep() {
        if (step < tourSteps.length) {
            showModal(tourSteps[step].title, `
                <div style="text-align:center;">
                    <p style="font-size:16px; line-height:1.6;">${tourSteps[step].content}</p>
                    <div style="margin-top:20px;">
                        ${step > 0 ? '<button onclick="tourPrev()" style="background:#D2B48C; border:none; padding:8px 20px; border-radius:5px; cursor:pointer; margin-right:10px;">◀ Назад</button>' : ''}
                        <button onclick="tourNext()" style="background:#89ABE3; border:none; padding:8px 20px; border-radius:5px; cursor:pointer;">${step === tourSteps.length - 1 ? 'Завершить' : 'Далее ▶'}</button>
                    </div>
                </div>
            `);
        } else {
            closeModal();
            step = 0;
        }
    }
    
    window.tourNext = function() {
        if (step < tourSteps.length - 1) {
            step++;
            showTourStep();
        } else {
            closeModal();
            step = 0;
            showModal("Спасибо за тур!", "<p>Вы успешно завершили виртуальную экскурсию по музею!</p><button onclick='closeModal()' style='background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;'>Закрыть</button>");
        }
    };
    
    window.tourPrev = function() {
        if (step > 0) {
            step--;
            showTourStep();
        }
    };
    
    showTourStep();
}

// ===== СПИСОК ЭКСКУРСИЙ =====
function showExcursionsList() {
    showModal("📋 Доступные экскурсии", `
        <div>
            <div style="margin-bottom:15px; padding:10px; background:#e8e0d4; border-radius:10px;">
                <strong>🕐 11:00 - Обзорная экскурсия</strong>
                <p>Знакомство с музеем, 1.5 часа, 600 ₽</p>
                <button onclick="bookExcursion('Обзорная экскурсия', '11:00', 600)" style="background:#89ABE3; border:none; padding:5px 15px; border-radius:5px; cursor:pointer;">Записаться</button>
            </div>
            <div style="margin-bottom:15px; padding:10px; background:#e8e0d4; border-radius:10px;">
                <strong>🕐 13:00 - Тайны древнего Египта</strong>
                <p>Специализированная экскурсия, 1 час, 500 ₽</p>
                <button onclick="bookExcursion('Тайны древнего Египта', '13:00', 500)" style="background:#89ABE3; border:none; padding:5px 15px; border-radius:5px; cursor:pointer;">Записаться</button>
            </div>
            <div style="margin-bottom:15px; padding:10px; background:#e8e0d4; border-radius:10px;">
                <strong>🕐 15:00 - Рыцари и замки</strong>
                <p>Специализированная экскурсия, 1 час, 500 ₽</p>
                <button onclick="bookExcursion('Рыцари и замки', '15:00', 500)" style="background:#89ABE3; border:none; padding:5px 15px; border-radius:5px; cursor:pointer;">Записаться</button>
            </div>
            <div style="margin-bottom:15px; padding:10px; background:#e8e0d4; border-radius:10px;">
                <strong>🕐 17:00 - Сокровища Азии</strong>
                <p>Специализированная экскурсия, 1 час, 500 ₽</p>
                <button onclick="bookExcursion('Сокровища Азии', '17:00', 500)" style="background:#89ABE3; border:none; padding:5px 15px; border-radius:5px; cursor:pointer;">Записаться</button>
            </div>
            <button onclick="closeModal()" style="width:100%; margin-top:15px; background:#5C4033; color:white; border:none; padding:10px; border-radius:5px; cursor:pointer;">Закрыть</button>
        </div>
    `);
}

function bookExcursion(name, time, price) {
    const visitorName = prompt("Введите ваше имя для записи:");
    if (visitorName) {
        closeModal();
        showModal("✅ Запись оформлена!", `
            <div style="text-align:center;">
                <p>${visitorName}, вы записаны на экскурсию:</p>
                <p><strong>${name}</strong></p>
                <p>⏰ Время: ${time}</p>
                <p>💰 Стоимость: ${price} ₽</p>
                <button onclick="closeModal()" style="background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Закрыть</button>
            </div>
        `);
    }
}

// ===== МИНИ-ЛЕКЦИЯ =====
function showMiniLecture(lectureTitle) {
    const lectures = {
        "Тайны древнего Египта": {
            content: `
                <div style="line-height:1.6;">
                    <p>🏺 <strong>Интересные факты о Древнем Египте:</strong></p>
                    <p>Египетские фараоны носили накладные бороды из золота, даже женщины-фараоны. Древние египтяне играли в настольную игру "Сенет" уже 5000 лет назад - это одна из древнейших игр в истории. В Древнем Египте существовала должность "хранитель царских бинтов" - человек, отвечавший за сохранность тканей для мумификации. Египтяне первыми начали использовать плуги, запряжённые быками, для обработки земли. Женщины в Древнем Египте имели равные права с мужчинами - могли владеть землёй, разводиться и вести дела в суде.</p>
                    <div style="background:#e8e0d4; padding:15px; border-radius:10px; margin-top:15px;">
                        <strong>🎓 Совет:</strong> Посетите нашу выставку "Сокровища древних цивилизаций" до 30 июня 2026 года!
                    </div>
                </div>
            `
        },
        "Древняя Греция": {
            content: `
                <div style="line-height:1.6;">
                    <p>🏛️ <strong>Интересные факты о Древней Греции:</strong></p>
                    <p>Древние греки не носили штаны, считая их варварской одеждой. Первые Олимпийские игры прошли в 776 году до н.э., а победители получали не медали, а оливковый венок. Спартанцы носили длинные волосы, потому что короткие стрижки были признаком трусости. Акрополь в Афинах был построен всего за 9 лет, и на стройке работали все жители города. Греческий алфавит стал основой для латиницы и кириллицы, которыми мы пользуемся до сих пор.</p>
                </div>
            `
        },
        "Культура древнего Китая": {
            content: `
                <div style="line-height:1.6;">
                    <p>🏮 <strong>Интересные факты о Древнем Китае:</strong></p>
                    <p>Великая Китайская стена - единственное сооружение, которое, по легенде, видно из космоса невооружённым глазом. Бумагу, книгопечатание, порох и компас - четыре великих изобретения - были созданы именно в Китае. Фарфоровые вазы династии Тан сегодня ценятся на вес золота и стоят миллионы долларов. Чай в Китае изначально использовали не как напиток, а как лекарство от многих болезней. Императоры Китая носили одежду только жёлтого цвета, и этот цвет был строжайше запрещён для простых людей.</p>
                </div>
            `
        }
    };
    
    const lecture = lectures[lectureTitle] || lectures["Тайны древнего Египта"];
    
    showModal(`📚 Мини-лекция: ${lectureTitle}`, `
        <div>
            ${lecture.content}
            <button onclick="closeModal()" style="width:100%; margin-top:20px; background:#89ABE3; border:none; padding:10px; border-radius:5px; cursor:pointer;">Закрыть</button>
        </div>
    `);
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
function validateEmail(email) {
    const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return re.test(email);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== ФОРМА ПОДПИСКИ (JS-валидация) =====
function createNewsletterForm() {
    if (document.querySelector('.newsletter-form')) return;
    
    const widgetsSection = document.querySelector('.widgets');
    if (!widgetsSection) return;
    
    const newsletterSection = document.createElement('section');
    newsletterSection.className = 'newsletter-section';
    newsletterSection.style.cssText = `
        padding: 40px 60px;
        background: linear-gradient(135deg, #89ABE3, #5C4033);
        margin: 20px 0;
        text-align: center;
        border-radius: 15px;
    `;
    
    newsletterSection.innerHTML = `
        <h2 style="color: #F5F0E6; font-family: 'Playfair Display', serif;">📧 Подпишитесь на новости музея</h2>
        <p style="color: #F5F0E6;">Будьте в курсе новых выставок и событий</p>
        <form id="newsletterForm" class="newsletter-form" style="margin-top: 20px;">
            <input type="text" id="newsletterEmail" placeholder="Ваш email" style="padding: 12px 20px; width: 300px; max-width: 80%; border: none; border-radius: 30px; font-family: 'Merriweather', serif;">
            <input type="text" id="newsletterName" placeholder="Ваше имя" style="padding: 12px 20px; width: 250px; max-width: 80%; border: none; border-radius: 30px; margin: 10px; font-family: 'Merriweather', serif;">
            <button type="submit" style="padding: 12px 30px; background: #D2B48C; border: none; border-radius: 30px; font-family: 'Playfair Display', serif; font-weight: bold; cursor: pointer;">Подписаться</button>
        </form>
        <div id="newsletterMessage" style="color: #F5F0E6; margin-top: 15px;"></div>
    `;
    
    widgetsSection.insertAdjacentElement('afterend', newsletterSection);
    
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value.trim();
            const name = document.getElementById('newsletterName').value.trim();
            const messageDiv = document.getElementById('newsletterMessage');
            
            if (name === "") {
                messageDiv.innerHTML = "❌ Введите ваше имя!";
                messageDiv.style.color = "#FF6B6B";
                return;
            }
            
            if (email === "") {
                messageDiv.innerHTML = "❌ Введите email адрес!";
                messageDiv.style.color = "#FF6B6B";
                return;
            }
            
            if (!validateEmail(email)) {
                messageDiv.innerHTML = "❌ Введите корректный email (пример: name@mail.ru)!";
                messageDiv.style.color = "#FF6B6B";
                return;
            }
            
            messageDiv.innerHTML = `✅ Спасибо, ${name}! Вы подписаны на новости музея.`;
            messageDiv.style.color = "#90EE90";
            document.getElementById('newsletterEmail').value = "";
            document.getElementById('newsletterName').value = "";
            
            setTimeout(() => { messageDiv.innerHTML = ""; }, 4000);
        });
    }
}

// ===== ФОРМА ЗАПИСИ НА ЭКСКУРСИЮ (JS-валидация) =====
function createExcursionBookingForm() {
    const visitorsContainer = document.querySelector('.visitors-container');
    if (!visitorsContainer) return;
    if (document.querySelector('.booking-form')) return;
    
    const bookingCard = document.createElement('div');
    bookingCard.className = 'visitors-card';
    bookingCard.style.gridColumn = "1 / -1";
    
    bookingCard.innerHTML = `
        <div class="visitors-icon">📝</div>
        <h2>Запись на экскурсию</h2>
        <form id="excursionBookingForm" class="booking-form">
            <div style="margin-bottom: 15px;"><input type="text" id="bookingName" placeholder="Ваше имя" style="width:100%; padding:10px; border:1px solid #D2B48C; border-radius:8px; box-sizing:border-box;"></div>
            <div style="margin-bottom: 15px;"><input type="text" id="bookingEmail" placeholder="Ваш email" style="width:100%; padding:10px; border:1px solid #D2B48C; border-radius:8px; box-sizing:border-box;"></div>
            <div style="margin-bottom: 15px;"><input type="text" id="bookingPhone" placeholder="Номер телефона" style="width:100%; padding:10px; border:1px solid #D2B48C; border-radius:8px; box-sizing:border-box;"></div>
            <div style="margin-bottom: 15px;">
                <select id="bookingExcursion" style="width:100%; padding:10px; border:1px solid #D2B48C; border-radius:8px;">
                    <option value="">-- Выберите экскурсию --</option>
                    <option value="11:00">11:00 - Обзорная экскурсия (600 ₽)</option>
                    <option value="13:00">13:00 - Тайны древнего Египта (500 ₽)</option>
                    <option value="15:00">15:00 - Рыцари и замки (500 ₽)</option>
                    <option value="17:00">17:00 - Сокровища Азии (500 ₽)</option>
                </select>
            </div>
            <div style="margin-bottom: 15px;"><input type="number" id="bookingPeople" placeholder="Количество человек" min="1" max="20" style="width:100%; padding:10px; border:1px solid #D2B48C; border-radius:8px; box-sizing:border-box;"></div>
            <div style="margin-bottom: 15px;"><textarea id="bookingComment" placeholder="Ваши пожелания" rows="3" style="width:100%; padding:10px; border:1px solid #D2B48C; border-radius:8px; box-sizing:border-box;"></textarea></div>
            <button type="submit" style="width:100%; padding:12px; background:#89ABE3; border:none; border-radius:8px; cursor:pointer;">📅 Забронировать экскурсию</button>
        </form>
        <div id="bookingMessage" style="margin-top: 15px; text-align: center;"></div>
    `;
    
    visitorsContainer.appendChild(bookingCard);
    
    const bookingForm = document.getElementById('excursionBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('bookingName').value.trim();
            const email = document.getElementById('bookingEmail').value.trim();
            const excursion = document.getElementById('bookingExcursion').value;
            const people = document.getElementById('bookingPeople').value.trim();
            const messageDiv = document.getElementById('bookingMessage');
            
            if (name === "") {
                messageDiv.innerHTML = "❌ Введите ваше имя!";
                messageDiv.style.cssText = "color:#FF6B6B; background:#ffebee; padding:10px; border-radius:8px;";
                return;
            }
            
            if (email === "") {
                messageDiv.innerHTML = "❌ Введите email адрес!";
                messageDiv.style.cssText = "color:#FF6B6B; background:#ffebee; padding:10px; border-radius:8px;";
                return;
            }
            
            if (!validateEmail(email)) {
                messageDiv.innerHTML = "❌ Введите корректный email (пример: name@mail.ru)!";
                messageDiv.style.cssText = "color:#FF6B6B; background:#ffebee; padding:10px; border-radius:8px;";
                return;
            }
            
            if (excursion === "") {
                messageDiv.innerHTML = "❌ Выберите экскурсию из списка!";
                messageDiv.style.cssText = "color:#FF6B6B; background:#ffebee; padding:10px; border-radius:8px;";
                return;
            }
            
            if (people === "" || people < 1) {
                messageDiv.innerHTML = "❌ Укажите количество человек (от 1 до 20)!";
                messageDiv.style.cssText = "color:#FF6B6B; background:#ffebee; padding:10px; border-radius:8px;";
                return;
            }
            
            messageDiv.innerHTML = `✅ ${name}, вы записаны на "${excursion}" на ${people} чел. Подтверждение отправлено на ${email}`;
            messageDiv.style.cssText = "color:#4CAF50; background:#e8f5e9; padding:10px; border-radius:8px;";
            
            document.getElementById('bookingName').value = "";
            document.getElementById('bookingEmail').value = "";
            document.getElementById('bookingPhone').value = "";
            document.getElementById('bookingExcursion').value = "";
            document.getElementById('bookingPeople').value = "";
            document.getElementById('bookingComment').value = "";
            
            setTimeout(() => { messageDiv.innerHTML = ""; messageDiv.style.cssText = ""; }, 4000);
        });
    }
}

// ===== ФОРМА ОБРАТНОЙ СВЯЗИ (JS-валидация) =====
function createFeedbackForm() {
    const visitorsContainer = document.querySelector('.visitors-container');
    if (!visitorsContainer) return;
    if (document.querySelector('.feedback-form')) return;
    
    const feedbackCard = document.createElement('div');
    feedbackCard.className = 'visitors-card';
    
    feedbackCard.innerHTML = `
        <div class="visitors-icon">💬</div>
        <h2>Обратная связь</h2>
        <form id="feedbackForm" class="feedback-form">
            <div style="margin-bottom: 12px;"><input type="text" id="feedbackName" placeholder="Ваше имя" style="width:100%; padding:10px; border:1px solid #D2B48C; border-radius:8px; box-sizing:border-box;"></div>
            <div style="margin-bottom: 12px;"><input type="text" id="feedbackEmail" placeholder="Ваш email" style="width:100%; padding:10px; border:1px solid #D2B48C; border-radius:8px; box-sizing:border-box;"></div>
            <div style="margin-bottom: 12px;">
                <select id="feedbackType" style="width:100%; padding:10px; border:1px solid #D2B48C; border-radius:8px;">
                    <option value="">-- Выберите тип обращения --</option>
                    <option value="question">❓ Вопрос</option>
                    <option value="suggestion">💡 Предложение</option>
                    <option value="complaint">⚠️ Жалоба</option>
                    <option value="thanks">🙏 Благодарность</option>
                </select>
            </div>
            <div style="margin-bottom: 12px;"><textarea id="feedbackMessage" placeholder="Ваше сообщение" rows="4" style="width:100%; padding:10px; border:1px solid #D2B48C; border-radius:8px; box-sizing:border-box;"></textarea></div>
            <div style="margin-bottom: 12px;">
                <label style="font-size: 12px; color: #5C4033;">
                    <input type="checkbox" id="feedbackCopy"> Отправить копию на email
                </label>
            </div>
            <button type="submit" style="width:100%; padding:12px; background:#D2B48C; border:none; border-radius:8px; cursor:pointer;">📨 Отправить сообщение</button>
        </form>
        <div id="feedbackMessageDiv" style="margin-top: 15px; text-align: center;"></div>
    `;
    
    visitorsContainer.appendChild(feedbackCard);
    
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('feedbackName').value.trim();
            const email = document.getElementById('feedbackEmail').value.trim();
            const type = document.getElementById('feedbackType').value;
            const message = document.getElementById('feedbackMessage').value.trim();
            const copy = document.getElementById('feedbackCopy').checked;
            const messageDiv = document.getElementById('feedbackMessageDiv');
            
            if (name === "") {
                messageDiv.innerHTML = "❌ Введите ваше имя!";
                messageDiv.style.cssText = "color:#FF6B6B; background:#ffebee; padding:10px; border-radius:8px;";
                return;
            }
            
            if (email === "") {
                messageDiv.innerHTML = "❌ Введите email адрес!";
                messageDiv.style.cssText = "color:#FF6B6B; background:#ffebee; padding:10px; border-radius:8px;";
                return;
            }
            
            if (!validateEmail(email)) {
                messageDiv.innerHTML = "❌ Введите корректный email (пример: name@mail.ru)!";
                messageDiv.style.cssText = "color:#FF6B6B; background:#ffebee; padding:10px; border-radius:8px";
                return;
            }
            
            if (type === "") {
                messageDiv.innerHTML = "❌ Выберите тип обращения!";
                messageDiv.style.cssText = "color:#FF6B6B; background:#ffebee; padding:10px; border-radius:8px;";
                return;
            }
            
            if (message === "") {
                messageDiv.innerHTML = "❌ Напишите ваше сообщение!";
                messageDiv.style.cssText = "color:#FF6B6B; background:#ffebee; padding:10px; border-radius:8px;";
                return;
            }
            
            const typeText = document.getElementById('feedbackType').options[document.getElementById('feedbackType').selectedIndex].text;
            let responseText = `✅ Спасибо, ${escapeHtml(name)}! Ваше ${typeText} отправлено.`;
            if (copy) {
                responseText += `<br>📧 Копия отправлена на ${escapeHtml(email)}`;
            }
            messageDiv.innerHTML = responseText;
            messageDiv.style.cssText = "color:#4CAF50; background:#e8f5e9; padding:10px; border-radius:8px;";
            
            document.getElementById('feedbackName').value = "";
            document.getElementById('feedbackEmail').value = "";
            document.getElementById('feedbackType').value = "";
            document.getElementById('feedbackMessage').value = "";
            document.getElementById('feedbackCopy').checked = false;
            
            setTimeout(() => { messageDiv.innerHTML = ""; messageDiv.style.cssText = ""; }, 4000);
        });
    }
}

// ===== ОБРАБОТКА КОММЕНТАРИЕВ НА СТРАНИЦЕ ЗАГАДОК =====
function setupMysteriesForms() {
    const mysteryCards = document.querySelectorAll('.mystery-card');
    if (mysteryCards.length === 0) return;
    
    mysteryCards.forEach((card) => {
        const nameInput = card.querySelector('.comment-input input:first-child');
        const commentInput = card.querySelector('.comment-input input:last-child');
        const submitBtn = card.querySelector('.comment-input button');
        
        if (submitBtn && !submitBtn.hasAttribute('data-processed')) {
            submitBtn.removeAttribute('onclick');
            submitBtn.setAttribute('data-processed', 'true');
            
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                let name = nameInput ? nameInput.value.trim() : "";
                let comment = commentInput ? commentInput.value.trim() : "";
                
                if (name === "") name = "Аноним";
                if (comment === "") {
                    showModal("Ошибка", "<p>❌ Напишите комментарий!</p><button onclick='closeModal()' style='background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;'>Закрыть</button>");
                    return;
                }
                
                const commentsDiv = card.querySelector('.comments-list');
                if (commentsDiv) {
                    const newComment = document.createElement("div");
                    newComment.className = "comment";
                    newComment.innerHTML = `
                        <div class="comment-user">💬 ${escapeHtml(name)}:</div>
                        <div>${escapeHtml(comment)}</div>
                        <div style="font-size: 10px; color: #89ABE3; margin-top: 5px;">${new Date().toLocaleString()}</div>
                    `;
                    commentsDiv.appendChild(newComment);
                    
                    if (nameInput) nameInput.value = "";
                    if (commentInput) commentInput.value = "";
                    
                    showModal("✅ Комментарий добавлен!", "<p>Спасибо за ваше мнение!</p><button onclick='closeModal()' style='background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;'>Закрыть</button>");
                }
            });
        }
    });
}

// ===== ОБРАБОТЧИКИ ДЛЯ ДРУГИХ СТРАНИЦ =====
function setupExhibitionsButtons() {
    const excursionBtns = document.querySelectorAll('.btn-excursion');
    const lectureBtns = document.querySelectorAll('.btn-lecture');
    
    excursionBtns.forEach(btn => {
        if (!btn.hasAttribute('data-processed')) {
            btn.setAttribute('data-processed', 'true');
            btn.removeAttribute('onclick');
            btn.addEventListener('click', function() {
                const card = this.closest('.exhibition-card');
                const title = card?.querySelector('h3')?.textContent || 'выставке';
                showModal(`🎧 Экскурсия: ${title}`, `
                    <div style="text-align:center;">
                        <p>Экскурсия по выставке "${title}" начнется через 5 минут в главном холле музея.</p>
                        <button onclick="closeModal()" style="background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Закрыть</button>
                    </div>
                `);
            });
        }
    });
    
    lectureBtns.forEach(btn => {
        if (!btn.hasAttribute('data-processed')) {
            btn.setAttribute('data-processed', 'true');
            btn.removeAttribute('onclick');
            btn.addEventListener('click', function() {
                const card = this.closest('.exhibition-card');
                let title = card?.querySelector('h3')?.textContent || '';
                if (title.includes("Сокровища древних цивилизаций")) {
                    showMiniLecture("Тайны древнего Египта");
                } else if (title.includes("Оружие эпох")) {
                    showMiniLecture("Древняя Греция");
                } else if (title.includes("Азиатские вазы")) {
                    showMiniLecture("Культура древнего Китая");
                } else {
                    showMiniLecture("Тайны древнего Египта");
                }
            });
        }
    });
}

function setupEducationMaterials() {
    const downloadBtns = document.querySelectorAll('.btn-download');
    downloadBtns.forEach(btn => {
        if (!btn.hasAttribute('data-processed')) {
            btn.setAttribute('data-processed', 'true');
            btn.removeAttribute('onclick');
            btn.addEventListener('click', function() {
                const card = this.closest('.material-card');
                const title = card?.querySelector('h3')?.textContent || 'Материал';
                showModal(`📥 Скачивание: ${title}`, `
                    <div style="text-align:center;">
                        <p>Файл "${title}" успешно скачан!</p>
                        <p>Файл сохранен в папке "Загрузки"</p>
                        <button onclick="closeModal()" style="background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Закрыть</button>
                    </div>
                `);
            });
        }
    });
    
    const watchBtns = document.querySelectorAll('.btn-watch');
    watchBtns.forEach(btn => {
        if (!btn.hasAttribute('data-processed')) {
            btn.setAttribute('data-processed', 'true');
            btn.removeAttribute('onclick');
            btn.addEventListener('click', function() {
                const card = this.closest('.video-card');
                const title = card?.querySelector('h3')?.textContent || 'Видео';
                showModal(`▶ Воспроизведение: ${title}`, `
                    <div style="text-align:center;">
                        <div style="background:#2C2C2C; padding:40px; border-radius:10px; margin:10px 0;">
                            🎬 Видео "${title}" загружается...
                        </div>
                        <p>После просмотра вы можете задать вопросы куратору музея.</p>
                        <button onclick="closeModal()" style="background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Закрыть</button>
                    </div>
                `);
            });
        }
    });
    
    const registerBtns = document.querySelectorAll('.btn-lecture-register');
    registerBtns.forEach(btn => {
        if (!btn.hasAttribute('data-processed')) {
            btn.setAttribute('data-processed', 'true');
            btn.removeAttribute('onclick');
            btn.addEventListener('click', function() {
                const card = this.closest('.lecture-card');
                const title = card?.querySelector('h3')?.textContent || 'Лекция';
                showModal(`📝 Запись на лекцию: ${title}`, `
                    <div style="text-align:center;">
                        <p>Вы успешно записаны на лекцию "${title}"!</p>
                        <p>📅 Дата: уточняется</p>
                        <p>📍 Место: Лекционный зал, 3 этаж</p>
                        <button onclick="showMiniLecture('${title}')" style="background:#D2B48C; border:none; padding:10px 20px; border-radius:5px; cursor:pointer; margin:5px;">📚 Смотреть мини-лекцию</button>
                        <button onclick="closeModal()" style="background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Закрыть</button>
                    </div>
                `);
            });
        }
    });
}

function setupEducationTests() {
    const testButtons = document.querySelectorAll('.btn-test');
    testButtons.forEach(btn => {
        if (!btn.hasAttribute('data-processed')) {
            btn.setAttribute('data-processed', 'true');
            btn.removeAttribute('onclick');
            btn.addEventListener('click', function() {
                const card = this.closest('.test-card');
                const testName = card?.querySelector('h3')?.textContent || 'Тест';
                showModal(`📝 Тест: ${testName}`, `
                    <div style="text-align:center;">
                        <p>🔍 Тест "${testName}" содержит 10 вопросов.</p>
                        <p>Время выполнения: 10 минут</p>
                        <button onclick="closeModal()" style="background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Начать тест</button>
                    </div>
                `);
            });
        }
    });
}

// ===== ГЛАВНАЯ ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('collectionsGrid')) {
        displayExhibits();
        setupFilters();
    } else {
        setupMainPage();
    }
    
    createNewsletterForm();
    createExcursionBookingForm();
    createFeedbackForm();
    setupMysteriesForms();
    setupExhibitionsButtons();
    setupEducationMaterials();
    setupEducationTests();
    
    const searchIcon = document.getElementById('search-icon');
    if (searchIcon && !searchIcon.hasAttribute('data-processed')) {
        searchIcon.setAttribute('data-processed', 'true');
        searchIcon.addEventListener('click', function() {
            const query = prompt('🔍 Введите название экспоната или эпоху для поиска:');
            if (query && query.trim()) {
                showModal(`Результаты поиска: "${query}"`, `
                    <div>
                        <p>🔍 Найдено 3 результата:</p>
                        <ul>
                            <li>Египетское творение - Зал Древнего Египта</li>
                            <li>Греческая ваза - Зал Античности</li>
                            <li>Японская ваза - Азиатский зал</li>
                        </ul>
                        <button onclick="closeModal()" style="background:#89ABE3; border:none; padding:10px 20px; border-radius:5px; cursor:pointer;">Закрыть</button>
                    </div>
                `);
            }
        });
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Все обработчики активны! Комментарии работают!');
});

// ===== ФУНКЦИИ ДЛЯ ЛИЧНОГО КАБИНЕТА =====
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userEmail');
    
    const iconsDiv = document.querySelector('.icons');
    if (iconsDiv && isLoggedIn === 'true' && userName) {
        const oldStatus = document.getElementById('userStatus');
        if (oldStatus) oldStatus.remove();
        
        const userStatus = document.createElement('span');
        userStatus.id = 'userStatus';
        userStatus.style.cssText = 'margin-left: 15px; font-size: 14px; color: #D2B48C;';
        userStatus.innerHTML = `👤 ${userName.split('@')[0]}`;
        iconsDiv.appendChild(userStatus);
    } else if (iconsDiv && !isLoggedIn) {
        const oldStatus = document.getElementById('userStatus');
        if (oldStatus) oldStatus.remove();
    }
}

function addToFavorites(exhibitName) {
    let favorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
    if (!favorites.includes(exhibitName)) {
        favorites.push(exhibitName);
        localStorage.setItem('userFavorites', JSON.stringify(favorites));
        showToast(`⭐ "${exhibitName}" добавлен в избранное`);
    } else {
        showToast(`⚠️ "${exhibitName}" уже в избранном`);
    }
}

function removeFromFavorites(exhibitName) {
    let favorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
    favorites = favorites.filter(f => f !== exhibitName);
    localStorage.setItem('userFavorites', JSON.stringify(favorites));
    showToast(`🗑️ "${exhibitName}" удалён из избранного`);
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('userFavorites')) || [];
}

function saveTour(tourName) {
    let tours = JSON.parse(localStorage.getItem('savedTours')) || [];
    if (!tours.includes(tourName)) {
        tours.push(tourName);
        localStorage.setItem('savedTours', JSON.stringify(tours));
        showToast(`🎧 "${tourName}" сохранён`);
    }
}

function showToast(message) {
    const oldToast = document.querySelector('.custom-toast');
    if (oldToast) oldToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-family: 'Merriweather', serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
`;
if (!document.querySelector('#toastStyles')) {
    toastStyles.id = 'toastStyles';
    document.head.appendChild(toastStyles);
}

// Дополнительная инициализация для личного кабинета
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    const exhibitCards = document.querySelectorAll('.collection-card');
    exhibitCards.forEach(card => {
        if (!card.querySelector('.favorite-btn')) {
            const title = card.querySelector('h3')?.textContent;
            const btn3d = card.querySelector('.btn-3d');
            if (title && btn3d) {
                const favBtn = document.createElement('button');
                favBtn.className = 'favorite-btn';
                favBtn.textContent = '⭐ В избранное';
                favBtn.style.cssText = `
                    margin-top: 10px;
                    padding: 6px 12px;
                    background: #D2B48C;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-family: 'Merriweather', serif;
                    font-size: 12px;
                    width: 100%;
                `;
                favBtn.onclick = (e) => {
                    e.stopPropagation();
                    addToFavorites(title);
                };
                btn3d.insertAdjacentElement('afterend', favBtn);
            }
        }
    });
});

window.addToFavorites = addToFavorites;
window.removeFromFavorites = removeFromFavorites;
window.saveTour = saveTour;
window.showToast = showToast;