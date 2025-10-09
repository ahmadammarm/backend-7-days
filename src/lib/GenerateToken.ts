import jwt from "jsonwebtoken";

const GenerateToken = (user: { id: number; name: string; email: string }) => {
    try {
        const token = jwt.sign({ user }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
        return token;
    } catch(error: any) {
        throw new Error("Error generating token");
    }
}
export default GenerateToken;