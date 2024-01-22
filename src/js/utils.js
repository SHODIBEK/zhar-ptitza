export function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

export function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function num_word(value, words) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
}

export const IS_MOBILE = window.matchMedia('(max-width: 640px)').matches;
export const IS_TABLET = window.matchMedia('(max-width: 1024px)').matches;
