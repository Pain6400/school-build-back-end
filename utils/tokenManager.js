import jwt from "jsonwebtoken";
export const generateToken = (uid) => {
    const expiresIn = 60 * 60 * 24 * 1;
    try {
        const token = jwt.sign({uid}, process.env.JWT_SECRET, { expiresIn});
        return { token, expiresIn };
    } catch (error) {
        console.log(error)
    }
}

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
            expiresIn
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: (process.env.MODO === "developer"),
            secure: !(process.env.MODO === "developer"),
            sameSite: 'none',
            expires: new Date(Date.now() + expiresIn * 1000)
        });
        
    } catch (error) {
        console.log(error)
    }
}