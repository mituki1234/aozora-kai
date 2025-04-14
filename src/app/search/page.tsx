'use client';
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
}

export default function Search() {
    const [searchParams, setSearchParams] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const link = new URL(window.location.href).searchParams
    const booksName = link.get("books") || "";
    const limitValue = link.get("limit") || "20";
    const url = `https://api.aozora.gr.jp/v1/search?books=${booksName}&limit=${limitValue}`;
    axios.get(url)
        .then((responce) => {
            setBooks(responce.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    function handleSearch() {
        setBooks([]);
        const url = `https://api.aozora.gr.jp/v1/search?books=${searchParams}&limit=${limitValue}`;
        axios.get(url)
            .then((responce) => {
                setBooks(responce.data);
            }
            )
            .catch((error) => {
                console.error("Error fetching data:", error);
            }
            );
    }
    return (
        <div className="container">
            <div className="header">
                <div className="logo">
                    <Link href="/"><h1>非公式青空文庫</h1></Link>
                </div>
                <div className="menu">
                    <span>サーチ</span>
                    <span>test2</span>
                    <span>test3</span>
                </div>
            </div>
            <div className="main">
                <div className="search">
                    <input type="text" placeholder="検索" value={searchParams} onChange={(e) => setSearchParams(e.target.value)} />
                    <button>検索</button>
                </div>
                <div className="books">
                    {books.map((book) => (
                        <div className="book" key={book.id}>
                            <h2>{book.title}</h2>
                            <p>{book.author}</p>
                            <p>{book.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}