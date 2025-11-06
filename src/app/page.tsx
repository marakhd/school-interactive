"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const regions = [
  {
    id: 1,
    name: "Якутия",
    position: "1А",
    is_active: true,
    poem: "На северо-востоке России лежит\nземля вечной мерзлоты и алмазов.\nСуровый край, где сияет северное небо.",
  },
  {
    id: 2,
    name: "Крым",
    position: "2А",
    is_active: true,
    poem: "На юге России, у Чёрного моря,\nраскинулся солнечный край,\nгде история встречает море и ветер.",
  },
  {
    id: 3,
    name: "Кабардино-Балкария",
    position: "3А",
    is_active: true,
    poem: "",
  },
  {
    id: 4,
    name: "Республика Коми",
    position: "3Б",
    is_active: true,
    poem: "",
  },
  {
    id: 5,
    name: "Костромская область",
    position: "4А",
    is_active: true,
    poem: "",
  },
  {
    id: 6,
    name: "Карелия",
    position: "4Б",
    is_active: true,
    poem: "",
  },
  {
    id: 7,
    name: "Астраханская область",
    position: "5А",
    is_active: true,
    poem: "",
  },
  {
    id: 8,
    name: "Республика Мордовия",
    position: "6А",
    is_active: true,
    poem: "",
  },
  {
    id: 9,
    name: "Дагестан",
    position: "7А",
    is_active: true,
    poem: "",
  },
  {
    id: 10,
    name: "Республика Татарстан",
    position: "8А",
    is_active: true,
    poem: "",
  },
  {
    id: 11,
    name: "Республика Бурятия",
    position: "8Б",
    is_active: true,
    poem: "",
  },
  {
    id: 12,
    name: "Дальний Восток",
    position: "9А",
    is_active: true,
    poem: "",
  },
  {
    id: 13,
    name: "Башкирия",
    position: "10А",
    is_active: true,
    poem: "",
  },
  {
    id: 14,
    name: "Карачаево-Черкесская Республика",
    position: "11А",
    is_active: true,
    poem: "",
  },
];

const TEACHERS_PER_PAGE = 6;
const AUTO_SLIDE_INTERVAL = 10000;

export default function TeachersDayApp() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const audioRef = useRef(null);
  const autoSlideTimerRef = useRef(null);

  const activeTeachers = regions.filter((t) => t.is_active);
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
    {/* Заголовок */}
    <header className="text-center mb-12">
      <h1
        className="text-7xl font-bold text-white mb-4"
        style={{
          fontFamily: "Georgia, serif",
          textShadow:
            "4px 4px 8px rgba(0,0,50,0.7), 0 0 30px rgba(50,100,255,0.4)", // синий мягкий ореол
          letterSpacing: "0.1em",
        }}
      >
        Регионы
      </h1>
      <div className="w-64 h-1 bg-gradient-to-r from-blue-500 via-white to-red-500 mx-auto rounded-full"></div>
    </header>

    {/* Сетка карточек */}
    <div className="flex-1 grid grid-cols-3 gap-8 mb-8">
      {getCurrentPageTeachers().map((teacher) => (
        <div
          key={teacher.id}
          onClick={() => handleTeacherClick(teacher)}
          className="bg-blue-900/40 backdrop-blur-sm border-4 border-blue-700 rounded-2xl p-6 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-red-500 flex flex-col items-center"
        >
          <div className="w-48 h-48 mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg bg-blue-800/40">
            <img
              src={`/photos/${teacher.id}.jpg`}
              alt={teacher.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const currentSrc = e.target.src;
                if (currentSrc.endsWith(".jpg")) {
                  e.target.src = `/photos/${teacher.id}.png`;
                } else {
                  e.target.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%230b3c87" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="60" fill="%23fff"%3E⭐%3C/text%3E%3C/svg%3E';
                }
              }}
            />
          </div>
          <h3
            className="text-2xl font-bold text-white text-center mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {teacher.name}
          </h3>
          <p
            className="text-xl text-blue-200 text-center italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {teacher.position}
          </p>
        </div>
      ))}
    </div>

    {/* Навигация */}
    <div className="flex items-center justify-center gap-6 pb-4">
      <button
        onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        className="bg-blue-700 hover:bg-blue-600 disabled:bg-blue-900/30 disabled:cursor-not-allowed text-white p-4 rounded-full transition-all shadow-lg"
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
                ? "bg-red-500 w-12 shadow-lg"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() =>
          handlePageChange(Math.min(totalPages - 1, currentPage + 1))
        }
        disabled={currentPage === totalPages - 1}
        className="bg-blue-700 hover:bg-blue-600 disabled:bg-blue-900/30 disabled:cursor-not-allowed text-white p-4 rounded-full transition-all shadow-lg"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  </div>
</div>

  );
}
