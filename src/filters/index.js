
import store from '@/store'
import ru from '@/locales/ru.json'

const locales = {
    'ru-Ru': ru
}

export default {
    locale(value) {
        const locale = store.getters.currentUser.locale || 'en-En'
        if (locale == 'en-En') return value

        return locales[locale][value] || `[Localation error] ${value}`;
    }
}
