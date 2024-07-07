import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

type User = {
    email: string;
    name: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export async function verifyToken (req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const verifyUser = verify(token, process.env.JWT_SECRET!)

        if (!verifyUser) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        req.user = verifyUser as User

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}