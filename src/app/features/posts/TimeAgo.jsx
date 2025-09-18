import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }) => {
    let timeAgo = "";
    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }
    return (
        <span
            className="font-light italic text-sm text-white/50 absolute bottom-1 left-2"
            title={timestamp}
        >
            createdAt: {timeAgo}
        </span>
    );
};

export default TimeAgo;
