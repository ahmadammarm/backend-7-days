import bcrypt from 'bcrypt';


const ComparePassword = (password: string, hashedPassword: string): any => {
    try {
        const isMatchPassword = bcrypt.compare(password, hashedPassword);
        return isMatchPassword;
    } catch (error: any) {
        throw new Error("Error comparing passwords");
    }
}

export default ComparePassword;