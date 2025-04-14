'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "@/app/styles/top.css";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [limitValue, setLimitValue] = useState("20");

  // URLからパラメーターを取得（クライアントサイドレンダリング後）
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const booksParam = searchParams.get("books") || "";
    const limitParam = searchParams.get("limit") || "20";
    setSearchQuery(booksParam);
    setLimitValue(limitParam);
  }, []);

  // 検索機能
  function handleSearch() {
    const url = `/search?books=${searchQuery}&limit=${limitValue}`;
    router.push(url);
  }

  // エンターキーで検索を実行
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>非公式青空文庫</h2>
          </Link>
        </div>
        <div className="menu">
          <span>ホーム</span>
          <span>作品検索</span>
          <span>著者一覧</span>
        </div>
      </div>
      <div className="main">
        <div className="hero">
          <h1>青空文庫非公式改訂版</h1>
          <p>青空文庫をより良いデザインにし、より読みやすくしました。</p>
        </div>
        <div className="search">
          <input 
            type="text" 
            placeholder="作品名・著者名で検索" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>検索</button>
        </div>
        <div className="about">
          <div className="card">
            <h2>青空文庫とは</h2>
            <p>青空文庫は、著作権の切れた文学作品を無料で公開している電子図書館です。</p>
            <p>著作権の切れた文学作品を無料で公開している電子図書館です。</p>
            <p>とても慈善的で良いサイトなのですが、本が読みにくかったです。</p>
            <p>そこで、青空文庫のデザインを改訂しました。</p>
            <p>よかったら使ってください〜</p>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-content">
          <p>© 2023 青空文庫非公式改訂版</p>
          <p>このサイトは青空文庫とは関係ありません。</p>
          <p>このサイトは青空文庫のデザインを改訂したものです。</p>
        </div>
      </div>
    </div>
  );
}