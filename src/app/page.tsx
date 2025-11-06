"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teachers = [
  {
    id: 0,
    name: "Шаповалова Ольга Андреевна",
    position: "Директор",
    is_active: true,
    poem: "Вы — канцлер всех учебных дисциплин и правил,\nВаш титул на век наш двор возглавил.\nДля нас Вы вдохновитель и основа,\nЧто создаёт из нас и будущее, и слово",
  },
  {
    id: 1,
    name: "Катасонова Ирина Васильевна",
    position: "Русский язык",
    is_active: true,
    poem: "Вы — виртуоз пунктуации, знаток ударений,\nВы раскрываете в речи поэзию поколений.\nВы учите нас слышать в словах откровенье,\nЧувствовать в каждой букве души воплощенье.\n\nВы — царица страниц золотых,\nГде герои Островского, Толстого, других\nОживают под Вашим волшебным перстом,\nИ становятся нам путеводной звездой.",
  },
  {
    id: 2,
    name: "Куйбида Алевтина Ивановна",
    position: "Русский язык",
    is_active: true,
    poem: "Вы — виртуоз пунктуации, грамматики гений, \nХранитель великих и вечных учений.\nВы учите нас, как слова обретают свой смысл,\nКак каждая фраза становится чистой.\nВы — виртуоз сюжетов, анализа гений,\nХранительница книг, идей, вдохновений.\nВы — искусница стиля, ритма, подтекста,\nЧто оживляют героев из школьного текста.",
  },
  {
    id: 3,
    name: "Кузнецова Лилия Мироновна",
    position: "Русский язык",
    is_active: true,
    poem: "Вы — герцогиня синтаксиса и падежей,\nВеличайший знаток речей и идей.\nВам подвластны все правила, все исключенья,\nВы дарите грамоту, как благословенье.\n\nВы — судья сочинений, критик и друг,\nВ чьих руках оживает любой мир вокруг.\nВаш титул — муза, мыслитель, творец,\nКто дарит нам силу и пламя сердец!",
  },
  {
    id: 4,
    name: "Мещерякова Елена Викторовна",
    position: "Математика",
    is_active: true,
    poem: "Вы — владычица графиков, царица углов,\nЧей ум светлее самых ярких миров.\nВаш титул — гений, строгий и ясный,\nДля Вас математика — язык прекрасный!",
  },
  {
    id: 5,
    name: "Задина Ксения Сергеевна",
    position: "Математика",
    is_active: true,
    poem: "Вы — царица формул, чисел и теорем,\nДля вас математика — ясна, как день.\nВы учите нас искать икс в уравненьях,\nИ побеждать в самых сложных сраженьях!",
  },
  {
    id: 6,
    name: "Беркулов Данияр Жомартович",
    position: "Обществознание, История",
    is_active: true,
    poem: "Вы — хранитель эпох, битв и правлений,\nДля нас Вы — живой учебник преданий и мнений.\nВы оживляете даты великих свершений,\nВы - пример для всех поколений.\n\nВы — верховный судья всех цивилизаций идей,\nВладеете тайной общественных ступенéй.\nВы учите нас, как управлять государством,\nЧтоб могли избежать мы любого коварства.",
  },
  {
    id: 7,
    name: "Меньшикова Светлана Викторовна",
    position: "Физика",
    is_active: true,
    poem: "Вы — императрица формул, что правят миром,\nДля Вас законы Ньютона — священная лира.\nВы учите нас разгадывать тайны природы,\nИ понимать гармонию свободного полёта.",
  },
  {
    id: 8,
    name: "Миронова Наталия Сергеевна",
    position: "Химия",
    is_active: true,
    poem: "Вы — королева менделеевской таблицы,\nВам покорны все химические цепочки и частицы.\nВы валентности сплетаете искусно и умело,\nЛюбой капризный реактив подвластен вам всецело",
  },
  {
    id: 9,
    name: "Архарова Ксения Владимировна",
    position: "Английский язык",
    is_active: true,
    poem: "Вы учите нас фразам всех веков,\n\
Вы раскрываете секреты правильных глаголов,\n\
На случай идиомой с вами каждый вооружён\n\
Вы - нашего акцента эталон.",
  },
  {
    id: 10,
    name: "Абдурахманова Наталья Анатольевна",
    position: "Английский язык",
    is_active: true,
    poem: "Вы — герцогиня времен, артиклей, спряжений,\n\
Для вас Шекспира язык — предмет восхищений.\n\
Вы — владычица лексики, акцента, идей,\n\
Что дарят нам сотни открытых дверей.",
  },
  {
    id: 11,
    name: "Козлукова Вера Ивановна",
    position: "Биология, География",
    is_active: true,
    poem: "Вы — императрица царства живого,\n\
Герцогиня флоры и фауны самой.\n\
Вам подвластны тайны клетки, ДНК кода,\n\
От простейшей амёбы до сложного рода.\n\n\
Вы — земных широт владычица,\n\
Морей, вершин и недр повелительница.\n\
Пред Вами карта мира раскрывается,\n\
И каждый меридиан Вам покоряется.",
  },
  {
    id: 12,
    name: "Ферулев Руслан Павлович",
    position: "Физкультура",
    is_active: true,
    poem: "Вы — владыка мячей, турников и дорожек,\n\
Благодаря вам марафон покорить каждый сможет.\n\
Вы учите нас быть быстрее, сильнее,\n\
    Чтоб в жизни мы стали гораздо смелее.",
  },
  {
    id: 13,
    name: "Ромашин Даниил Дмитриевич",
    position: "Информатика",
    is_active: true,
    poem: "Вы — мастер программ, алгоритмов, кодов,\n\
Вы учите пониманию всех компьютерных слов.\n\
Вы — виртуоз интерфейса, логических схем, \n\
Вы знаете правила всех систем.",
  },
  {
    id: 14,
    name: "Никольская Анастасия Владимировна",
    position: "Информатика",
    is_active: true,
    poem: "Вы — госпожа алгоритмов в мире строгих кодов,\n\
Вам известны все типы компьютерных проводов\n\
Вам подвластны все тайны логических схем,\n\
Вы — истинная королева компьютерных тем.",
  },
  {
    id: 15,
    name: "Москвитин Александр Леонидович",
    position: "ОБЗР",
    is_active: true,
    poem: "Вы — хранитель правил, что жизни спасают\n\
И в чрезвычайных ситуациях верно направляют.\n\
Вы учите, как действовать при пожаре, беде,\n\
Чтоб опасность преодолеть всегда и везде.",
  },
  {
    id: 16,
    name: "Цынайкина Светлана Анатольевна",
    position: "Музыка",
    is_active: true,
    poem: "Вы — владычица нот и волшебных мелодий,\n\
Вы каждый аккорд на слух узнаете.\n\
Вы открываете тайны сольфеджио строгого,\n\
Вы - хранитель симфоний века далёкого.",
  },
  {
    id: 17,
    name: "Загораева Анна Леонидовна",
    position: "ИЗО, Труд",
    is_active: true,
    poem: "Вы — волшебница красок, узоров и нитей,\n\
Чьи руки способны весь мир изменить.\n\
Вы учите нас кистью сказку творить,\n\
Иглою на ткань волшебство воплотить.",
  },
  {
    id: 18,
    name: "Зинченко Алевтина Максимовна",
    position: "ИЗО, Труд",
    is_active: true,
    poem: "Вы — волшебница кисти, палитры, холстов,\n\
Нас учите творить вы без лишних слов.\n\
Вы открываете мир ярких цветов и идей,\n\
Где каждый рисунок — восторг у детей.",
  },
  {
    id: 19,
    name: "Демичева Марина Владимировна",
    position: "Психолог",
    is_active: true,
    poem: "Ваш титул - целитель души и сердец,\n\
Вы наших мыслей глубоких верный кузнец.\n\
Вы учите нас быть собою довольным,\n\
И радоваться жизни светлой душою.",
  },
  {
    id: 20,
    name: "Водовозова Мария Алексеевна",
    position: "Начальные классы",
    is_active: true,
    poem: "Вы — волшебница букв и весёлых заданий,\n\
Для вас первоклашка — целая вселенная знаний.\n\
Вы учите нас буквы выводить старательно,\n\
И считать до десяти — обязательно!",
  },
  {
    id: 21,
    name: "Замотаева Вера Константиновна",
    position: "Начальные классы",
    is_active: true,
    poem: "Вам открыты все тайны умноженья, склонений,\n\
Вы — мастерица проектов и увлечений.\n\
Вы — королева словарных диктантов и чтения,\n\
Что превращает уроки в яркие приключения.",
  },
  {
    id: 22,
    name: "Влащенко Марина Борисовна",
    position: "Начальные классы",
    is_active: true,
    poem: "Вы — государыня в мире мелков и тетрадок,\n\
Чей класс прилежностью своей весьма сладок.\n\
Вы учите числа делить и рассказы читать,\n\
Чтоб могли мы всё-всё понимать.",
  },
  {
    id: 23,
    name: "Нестерова Алина Владимировна",
    position: "Начальные классы",
    is_active: true,
    poem: "Вы — королева указки, мела и доски,\n\
Для вас вопрос ребёнка — словно песни строки.\n\
Ваш титул — наставница с мудростью веков,\n\
Что ведёт корабль знаний меж извилистых берегов.",
  },
  {
    id: 24,
    name: "Гулько Светлана Владимировна",
    position: "Начальные классы",
    is_active: true,
    poem: "Вам известны все тайны простых уравнений,\n\
Вы — полководец диктантов и сочинений.\n\
Вы — архивариус всех пройденных формул и правил,\n\
Что знания в памяти навечно оставил.",
  },
  {
    id: 25,
    name: "Попова Елена Александровна",
    position: "Начальные классы",
    is_active: true,
    poem: "Вы — императрица задач, диктантов и правил,\n\
Чей класс прилежностью своей дивно забавил.\n\
Вы учите дроби постигать и склонения,\n\
Даруя познаниям ясность и восхищения.",
  },
];

const TEACHERS_PER_PAGE = 6;
const AUTO_SLIDE_INTERVAL = 10000;

export default function TeachersDayApp() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const audioRef = useRef(null);
  const autoSlideTimerRef = useRef(null);

  const activeTeachers = teachers.filter((t) => t.is_active);
  const totalPages = Math.ceil(activeTeachers.length / TEACHERS_PER_PAGE);

  const startAutoSlide = () => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }
    autoSlideTimerRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, AUTO_SLIDE_INTERVAL);
  };

  useEffect(() => {
    if (!selectedTeacher) {
      startAutoSlide();
    }
    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [selectedTeacher, totalPages]);

  useEffect(() => {
    if (selectedTeacher && audioRef.current) {
      audioRef.current.play();

      const handleAudioEnd = () => {
        setSelectedTeacher(null);
      };

      audioRef.current.addEventListener("ended", handleAudioEnd);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", handleAudioEnd);
        }
      };
    }
  }, [selectedTeacher]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    startAutoSlide();
  };

  const handleTeacherClick = (teacher) => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }
    setSelectedTeacher(teacher);
  };

  const getCurrentPageTeachers = () => {
    const start = currentPage * TEACHERS_PER_PAGE;
    return activeTeachers.slice(start, start + TEACHERS_PER_PAGE);
  };

  if (selectedTeacher) {
    return (
      <div
        className="fixed inset-0 w-screen h-screen overflow-hidden"
        style={{
          backgroundImage: "url(/background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <button
            onClick={() => setSelectedTeacher(null)}
            className="absolute top-8 left-8 bg-amber-100 hover:bg-amber-200 text-amber-900 px-8 py-4 rounded-lg text-2xl font-bold shadow-2xl transition-all border-4 border-amber-700 z-20"
          >
            ← Назад
          </button>

          <div className="w-full h-full flex items-center justify-center gap-12">
            <div className="w-1/2 h-full flex items-center justify-center">
              <video
                className="max-w-full max-h-full rounded-2xl shadow-2xl border-8 border-amber-700"
                autoPlay
                muted
                loop
              >
                <source
                  src={`/teachers/${selectedTeacher.id}.mp4`}
                  type="video/mp4"
                />
              </video>
            </div>

            <div className="w-1/2 h-full flex flex-col items-center justify-center">
              <div className="relative max-w-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 rounded-3xl transform rotate-1 shadow-2xl"></div>
                <div
                  className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 p-12 rounded-3xl shadow-2xl border-8 border-amber-800"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.05"/%3E%3C/svg%3E")',
                    boxShadow: "inset 0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="text-center mb-8">
                    <h2
                      className="text-4xl font-bold text-amber-900 mb-3"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {selectedTeacher.name}
                    </h2>
                    <p
                      className="text-2xl text-amber-800 italic"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {selectedTeacher.position}
                    </p>
                  </div>

                  <div
                    className="text-amber-900 text-2xl leading-relaxed"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    <p className="text-center italic whitespace-pre-line">
                      {selectedTeacher.poem}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <audio ref={audioRef} style={{ display: "none" }}>
            <source src={`/audio/${selectedTeacher.id}.m4a`} type="audio/mp4" />
          </audio>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden"
      style={{
        backgroundImage: "url(/background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full flex flex-col p-8">
        <header className="text-center mb-12">
          <h1
            className="text-7xl font-bold text-amber-100 mb-4"
            style={{
              fontFamily: "Georgia, serif",
              textShadow:
                "4px 4px 8px rgba(0,0,0,0.7), 0 0 30px rgba(255,215,0,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            Заветинская Губерния
          </h1>
          <div className="w-64 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </header>

        <div className="flex-1 grid grid-cols-3 gap-8 mb-8">
          {getCurrentPageTeachers().map((teacher) => (
            <div
              key={teacher.id}
              onClick={() => handleTeacherClick(teacher)}
              className="bg-amber-900/40 backdrop-blur-sm border-4 border-amber-700 rounded-2xl p-6 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-amber-500 flex flex-col items-center"
            >
              <div className="w-48 h-48 mb-4 rounded-full overflow-hidden border-4 border-amber-600 shadow-lg bg-amber-800/50">
                <img
                  src={`/photos/${teacher.id}.jpg`}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const currentSrc = e.target.src;
                    if (currentSrc.endsWith(".jpg")) {
                      e.target.src = `/photos/${teacher.id}.png`; // пробуем jpg
                    } else {
                      // если и jpg нет — fallback SVG
                      e.target.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23d4af37" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="60" fill="%23fff"%3E👑%3C/text%3E%3C/svg%3E';
                    }
                  }}
                />
              </div>
              <h3
                className="text-2xl font-bold text-amber-100 text-center mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {teacher.name}
              </h3>
              <p
                className="text-xl text-amber-300 text-center italic"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {teacher.position}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 pb-4">
          <button
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="bg-amber-700 hover:bg-amber-600 disabled:bg-amber-900/30 disabled:cursor-not-allowed text-amber-100 p-4 rounded-full transition-all shadow-lg"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="flex gap-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`w-4 h-4 rounded-full transition-all ${
                  i === currentPage
                    ? "bg-amber-400 w-12 shadow-lg"
                    : "bg-amber-700 hover:bg-amber-600"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              handlePageChange(Math.min(totalPages - 1, currentPage + 1))
            }
            disabled={currentPage === totalPages - 1}
            className="bg-amber-700 hover:bg-amber-600 disabled:bg-amber-900/30 disabled:cursor-not-allowed text-amber-100 p-4 rounded-full transition-all shadow-lg"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
