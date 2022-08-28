import { type } from "os";
import { db } from "../src/utils/db.server";

type Author = {
    firstname: string;
    lastname: string;
};

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
};

async function seed() {
    async function seed() {
        await Promise.all(
            getAuthors().map((author) => {
                return db.author.create({
                    data: {
                        firstname: author.firstname,
                        lastname: author.lastname,
                    },
                });
            })
        );
        const author = await db.author.findFirst({
            where: {
                firstname: "john",
            },
        });

        await Promise.all(
            getBooks().map((book) => {
                const { title, isFiction, datePublished } = book;
                return db.book.create({
                    data: {
                        title,
                        isFiction,
                        datePublished,
                        authorId: author?.id,
                    },
                });
            })
        );
    }
};

seed();

function getAuthors(): Array<Author> {
    return [
        {
            firstname: "john",
            lastname: "Doe",
        },
        {
            firstname: "william",
            lastname: "shakespear",
        }
    ]
}

function getBooks(): Array<Book> {
    return [
        {
            title: "sapies",
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: "Homo Deus",
            isFiction: false,
            datePublished: new Date(),
        },
    ]
}





