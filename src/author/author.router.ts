import express, { response } from "express";
import type { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

import * as AuthorService from "../author/author.service";
import { Author } from "@prisma/client";

export const authorRouter = express.Router();

// GET: List of all authors

authorRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authors = await AuthorService.listAuthors();
        return response.status(200).json(authors);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
})

authorRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const author = await AuthorService.getAuthor(id);
        if (author) {
            return response.status(200).json(author);
        }
        return res.status(404).json({ message: "Author could not be found" });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
})


authorRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const author = await AuthorService.getAuthor(id);
        if (author) {
            return response.status(200).json(author);
        }
        return res.status(404).json({ message: "Author could not be found" });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

// POST: Create an author
// Params: firstname, lastname
authorRouter.post('/create', body("firstname").isString(), body("lastname").isString(), async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const author = req.body;
        const newAuthor = await AuthorService.createAuthor(author)
        return res.status(201).json(newAuthor);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
})

// PUT: Updating an Author
// Params: firstName, lastName

authorRouter.put('/update/:id', body("firstname").isString(), body("lastname").isString(), async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const id: number = parseInt(req.params.id, 10);
    try {
        const author = req.body;
        const updateAuthor = await AuthorService.updateAuthor(author, id);
        return res.status(201).json(updateAuthor);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
})


// DELETE: delete an author base on id

authorRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        await AuthorService.deleteAuthor(id);
        return res.status(200).json({ message: "Author has been successfully deleted" });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
})