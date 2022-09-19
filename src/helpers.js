export function dateToMyStr(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

export function toggleDisableAndFocusIfPossible(ref) {
    ref.current.disabled = !ref.current.disabled;
    ref.current.focus();
};

export function dateToDateFormatStr(date) {
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
}
