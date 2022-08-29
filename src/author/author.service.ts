import { db } from "../utils/db.server";

export type Author = {
    id: number;
    firstname: string;
    lastname: string;
};

export const listAuthors = async (): Promise<Author[]> => {
    return db.author.findMany({
        select: {
            id: true,
            firstname: true,
            lastname: true,
        },
    });
};


export const getAuthor = async (id: number): Promise<Author | null> => {
    return db.author.findUnique({
        where: {
            id,
        }
    })
}

export const createAuthor = async (
    author: Omit<Author, "id">
): Promise<Author> => {
    const { firstname, lastname } = author;

    return db.author.create({
        data: {
            firstname,
            lastname,
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
        }
    })

}

export const updateAuthor = async (author: Omit<Author, "id">, id: number): Promise<Author> => {
    const { firstname, lastname } = author;

    return db.author.update({
        where: {
            id,
        },
        data: {
            firstname,
            lastname,
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
        }
    })
}

export const deleteAuthor = async (id: number) => {
    await db.author.delete({
        where: {
            id,
        }
    })
};

