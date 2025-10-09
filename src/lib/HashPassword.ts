import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

const HashPassword = async (password: string) => {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    } catch (error: any) {
        throw new Error("Error hashing password");
    }
}

export default HashPassword;