export default function intercept(value, len) {
    if (value && value.length > len) {
        return value.substr(0, len).concat('...');
    }
    return value;
}
