import { DateTime } from 'luxon';

// https://moment.github.io/luxon/docs/manual/formatting.html#formatting-with-tokens--strings-for-cthulhu-
export default function dft(value, format = 'F') {
    const timestamp = Number(value);
    // timestamp !== timestamp
    if (!Number.isNaN(timestamp)) {
        return DateTime.fromMillis(timestamp).toFormat(format);
    }

    return '';
}
