"use client";

import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiSearch, FiBell } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [realName, setRealName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedRealName = localStorage.getItem("realName");

    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || "");
      setRealName(storedRealName || "");
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUsername("");
    setRealName("");
    alert("로그아웃되었습니다.");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-0 flex items-center justify-between relative">
          {/* 왼쪽: 햄버거 메뉴 */}
          <div className="flex items-center">
            <button onClick={toggleSidebar}>
              <FiMenu className="text-gray-600 text-xl" />
            </button>
          </div>

          {/* 가운데: 로고 (절대 위치로 중앙 고정) */}
          <div className="flex items-center gap-4">
            <Link href="/" className="mt-2">
              <Image src="/logo.png" alt="로고" width={70} height={24} className="object-contain" />
            </Link>
          </div>

          {/* 오른쪽: 검색창, 로그인/로그아웃, 알림 */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <FiSearch className="text-gray-500 mr-2 text-lg" />
              <input
                type="text"
                placeholder="어떤 공간을 찾으세요?"
                className="bg-transparent border-none outline-none text-base w-48"
              />
            </div>

            {isLoggedIn ? (
              <>
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  {realName || username}님
                </span>
                <button className="text-sm text-gray-600 hover:text-gray-900" onClick={handleLogout}>
                  로그아웃
                </button>
              </>
            ) : (
              <Link href="/login" className="text-sm text-blue-600 hover:underline">
                로그인
              </Link>
            )}

            <FiBell className="text-gray-600 text-xl" />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-md transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-40 bg-yellow-400 flex items-center px-4 gap-4">
          <div className="w-14 h-14 rounded-full bg-white text-yellow-500 font-bold flex items-center justify-center text-xl">
            {realName ? realName.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-base">{realName || username}</span>
            <Link href="/mypage" className="text-white text-sm hover:underline mt-2">
              프로필 관리 &gt;
            </Link>
          </div>
        </div>

        <div className="p-4 flex flex-col h-[calc(100%-160px)]">
          <p className="text-xs text-gray-600 mb-4">누적 예약: 0회</p>
          <button className="text-sm py-2 text-left">나의 예약 리스트</button>
          <button className="text-sm py-2 text-left">전체 공간 보기</button>
          <button className="text-sm py-2 text-left">관심 공간</button>

          <Link
            href="/host"
            className="mt-auto text-center bg-indigo-600 text-white rounded-full py-2 px-4 text-sm font-medium hover:bg-indigo-700"
          >
            호스트 센터로 이동 →
          </Link>
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
