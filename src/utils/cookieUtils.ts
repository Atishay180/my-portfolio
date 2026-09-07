import Cookies from "js-cookie";

const DAILY_LIMIT = 10;
const COOKIE_NAME = "chat-usage";

interface ChatUsage {
    date: string;
    count: number;
}


const getToday = () => {
    return new Date().toLocaleDateString("en-CA");
};

export const getMessageCount = (): ChatUsage => {
    const stored = Cookies.get(COOKIE_NAME);

    if (!stored) {
        return { date: "", count: 0 };
    }

    try {
        const parsed = JSON.parse(stored);

        if (typeof parsed.date !== "string" || typeof parsed.count !== "number") {
            return { date: "", count: 0 };
        }

        return parsed;
    } catch {
        return { date: "", count: 0 };
    }
};

export const updateMessageCount = () => {
    const today = getToday();
    const { date, count } = getMessageCount();

    const newCount = date === today ? count + 1 : 1;

    Cookies.set(
        COOKIE_NAME,
        JSON.stringify({
            date: today,
            count: newCount,
        }),
        {
            expires: 1,
        }
    );
};

export const isLimitReached = () => {
    const today = getToday();
    const { date, count } = getMessageCount();

    return date === today && count >= DAILY_LIMIT;
};