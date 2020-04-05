exports.removeEffects = function (char) {
    for (const key in char.activeEffects) {
        for (const effect in char.activeEffects[key]) {
            if (char.activeEffects[key][effect].length === 0) {
                delete char.activeEffects[key][effect]
                break
            }
        }
        if (Object.keys(char.activeEffects[key]).length === 1) {
            delete char.activeEffects[key]
            break
        }
    }
}